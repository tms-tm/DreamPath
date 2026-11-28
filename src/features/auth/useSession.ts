'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { hydrateFromSupabase } from '@/features/progression/sync';

export interface SessionState {
  userId: string | null;
  email: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
}

export function useSession(): SessionState {
  const configured = isSupabaseConfigured();
  const [state, setState] = useState<SessionState>({
    userId: null,
    email: null,
    isAuthenticated: false,
    isLoading: configured,
    isConfigured: configured,
  });

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const user = data.session?.user ?? null;
      setState({
        userId: user?.id ?? null,
        email: user?.email ?? null,
        isAuthenticated: Boolean(user),
        isLoading: false,
        isConfigured: true,
      });
      if (user?.id) {
        void hydrateFromSupabase(user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const user = session?.user ?? null;
      setState({
        userId: user?.id ?? null,
        email: user?.email ?? null,
        isAuthenticated: Boolean(user),
        isLoading: false,
        isConfigured: true,
      });
      if (user?.id) {
        void hydrateFromSupabase(user.id);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return state;
}
