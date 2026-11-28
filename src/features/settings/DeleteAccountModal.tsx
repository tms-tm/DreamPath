'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Button, Modal } from '@/components/ui';
import { signOutStudent } from '@/features/auth/authActions';

export interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
  isSupabaseSession: boolean;
}

export function DeleteAccountModal({
  open,
  onClose,
  isSupabaseSession,
}: DeleteAccountModalProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearLocalAndRedirect = async () => {
    await signOutStudent();
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('dreampath-user-state');
      window.localStorage.removeItem('dreampath-profile');
      window.localStorage.removeItem('dreampath-settings');
    }
    onClose();
    router.push('/onboarding');
  };

  const handleConfirmDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError('Please enter your password to confirm account deletion.');
      return;
    }

    if (!isSupabaseSession) {
      await clearLocalAndRedirect();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/account/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? 'Could not verify password.');
        setSubmitting(false);
        return;
      }

      await clearLocalAndRedirect();
    } catch {
      setError('Network error while deleting account.');
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Delete My Account">
      <form onSubmit={handleConfirmDelete} className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-error-container text-on-surface border border-hairline">
          <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs leading-relaxed">
            This permanently deletes your DreamPath account, XP, skills, and saved progress. This
            action cannot be undone.
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="delete-account-password" className="text-xs font-bold text-on-surface">
            Re-enter your password to confirm
          </label>
          <input
            id="delete-account-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your current password"
            className="w-full rounded-xl border border-hairline bg-surface-container-lowest px-4 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
          />
        </div>

        {error && (
          <p role="alert" className="text-xs font-semibold text-error">
            {error}
          </p>
        )}

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-error text-surface-container-lowest hover:opacity-90"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            <span>{submitting ? 'Deleting...' : 'Delete Permanently'}</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
