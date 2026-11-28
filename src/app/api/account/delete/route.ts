import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  let body: { password?: string } = {};
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const password = typeof body.password === 'string' ? body.password : '';
  if (!password) {
    return NextResponse.json({ error: 'Password is required.' }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const admin = createSupabaseAdminClient();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabase || !admin || !url || !anonKey) {
    return NextResponse.json(
      { error: 'Supabase account service is not configured.' },
      { status: 503 }
    );
  }

  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user || !user.email) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  // Re-verify password with an isolated auth check
  const verifyClient = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { error: verifyError } = await verifyClient.auth.signInWithPassword({
    email: user.email,
    password,
  });

  if (verifyError) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);
  if (deleteError) {
    return NextResponse.json(
      { error: 'Failed to delete account.' },
      { status: 500 }
    );
  }

  await supabase.auth.signOut();

  return NextResponse.json({ deleted: true });
}
