'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useProgressionStore, UserProfile } from '@/stores/useProgressionStore';
import { playSound } from '@/utils/sound';
import { getDemoPersona } from '@/data/demoPersonas';

type AuthUser = UserProfile & {
  id: number;
  email: string;
  totalXp: number;
  simulatedSalary: number;
  completedQuests: string[];
  skills: Record<string, { xp: number; competency: number }>;
  achievements: Array<{ id: string; title: string; desc: string; unlocked: boolean; icon: string; tier: string; unlockedAt?: string }>;
  careerProgress: Record<string, number>;
  dreamJobId: string | null;
  isDemoPersona?: boolean;
};

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInAsPersona: (personaId: string) => boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function applyUserToStore(
  user: AuthUser,
  updateProfile: (profile: Partial<UserProfile>) => void,
  setColorMode: (mode: 'dark' | 'light') => void,
  setEducationTier: (tier: UserProfile['educationTier']) => void,
) {
  const { colorMode, educationTier, ...profile } = user;
  updateProfile(profile);
  setColorMode(colorMode);
  setEducationTier(educationTier);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const updateProfile = useProgressionStore((state) => state.updateProfile);
  const setColorMode = useProgressionStore((state) => state.setColorMode);
  const setEducationTier = useProgressionStore((state) => state.setEducationTier);
  const applyDemoPersona = useProgressionStore((state) => state.applyDemoPersona);

  // Restore a selected frontend demo persona before checking for a server session.
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const selectedPersona = localStorage.getItem('dreampath-demo-persona');
        if (selectedPersona) {
          const persona = getDemoPersona(selectedPersona);
          if (persona) {
            applyDemoPersona(persona);
            const current = useProgressionStore.getState();
            const { colorMode, ...profile } = current.profile;
            const demoUser: AuthUser = {
              ...profile,
              id: -1,
              email: '',
              totalXp: current.totalXp,
              simulatedSalary: current.simulatedSalary,
              completedQuests: current.completedQuests,
              skills: current.skills,
              achievements: current.achievements,
              careerProgress: current.careerProgress,
              dreamJobId: persona.primaryCareerId,
              isDemoPersona: true,
              colorMode,
            };
            setUser(demoUser);
            document.cookie = 'dreampath-demo-persona=1; Path=/; SameSite=Lax';
            return;
          }
          localStorage.removeItem('dreampath-demo-persona');
        }

        const response = await fetch('/api/auth/session', { cache: 'no-store' });
        if (!response.ok) {
          localStorage.removeItem('dreampath-current-user');
          setUser(null);
          return;
        }

        const { user: sessionUser } = await response.json();
        if (!sessionUser) return;

        const storedUser = localStorage.getItem('dreampath-current-user');
        let userData = sessionUser;
        if (storedUser) {
          try {
            const cachedUser = JSON.parse(storedUser);
            const sameAccount = cachedUser?.id === sessionUser.id && cachedUser?.email === sessionUser.email;
            // Restore local progress only when the cache belongs to this verified session.
            if (sameAccount) {
              // Keep profile selections aligned with server data; other progress remains locally cached.
              userData = {
                ...sessionUser,
                ...cachedUser,
                id: sessionUser.id,
                email: sessionUser.email,
                dreamJobId: sessionUser.dreamJobId,
                educationTier: sessionUser.educationTier,
              };
            }
          } catch {
            localStorage.removeItem('dreampath-current-user');
          }
        }

        setUser(userData);
        applyUserToStore(userData, updateProfile, setColorMode, setEducationTier);
        localStorage.setItem('dreampath-current-user', JSON.stringify(userData));
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('dreampath-current-user');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [updateProfile, setColorMode, setEducationTier, applyDemoPersona]);

  const refreshUser = useCallback(async () => {
    if (user?.isDemoPersona) return;
    const response = await fetch('/api/auth/session', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not refresh your account details.');
    const { user: freshUser } = await response.json();
    if (!freshUser) throw new Error('Your session has expired. Please sign in again.');
    setUser(freshUser);
    applyUserToStore(freshUser, updateProfile, setColorMode, setEducationTier);
    localStorage.setItem('dreampath-current-user', JSON.stringify(freshUser));
  }, [updateProfile, setColorMode, setEducationTier, user]);

  const signInAsPersona = useCallback((personaId: string) => {
    const persona = getDemoPersona(personaId);
    if (!persona) return false;

    applyDemoPersona(persona);
    const { colorMode, ...profile } = useProgressionStore.getState().profile;
    const demoUser: AuthUser = {
      ...profile,
      id: -1,
      email: '',
      totalXp: persona.initialProgress.totalXp,
      simulatedSalary: persona.initialProgress.simulatedSalary,
      completedQuests: [...persona.initialProgress.completedQuests],
      skills: { ...persona.initialProgress.skills },
      achievements: [...persona.initialProgress.achievements],
      careerProgress: { ...persona.initialProgress.careerProgress },
      dreamJobId: persona.primaryCareerId,
      isDemoPersona: true,
      colorMode,
    };
    localStorage.setItem('dreampath-demo-persona', persona.id);
    document.cookie = 'dreampath-demo-persona=1; Path=/; SameSite=Lax';
    localStorage.removeItem('dreampath-current-user');
    setUser(demoUser);
    playSound('success');
    return true;
  }, [applyDemoPersona]);

  const signIn = useCallback(async (email: string, password: string) => {
   try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Sign in failed' };
      }

      playSound('success');

      const userData = data.user;
      localStorage.removeItem('dreampath-demo-persona');
      document.cookie = 'dreampath-demo-persona=; Path=/; Max-Age=0; SameSite=Lax';
      setUser(userData);
      applyUserToStore(userData, updateProfile, setColorMode, setEducationTier);
      localStorage.setItem('dreampath-current-user', JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      console.error('Signin error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }, [updateProfile, setColorMode, setEducationTier]);

  const signOut = useCallback(async () => {
    if (user?.isDemoPersona) {
      playSound('click');
      setUser(null);
      localStorage.removeItem('dreampath-demo-persona');
      document.cookie = 'dreampath-demo-persona=; Path=/; Max-Age=0; SameSite=Lax';
      router.replace('/');
      router.refresh();
      return;
    }

    try {
      const response = await fetch('/api/auth/signout', { method: 'POST' });
      if (!response.ok) throw new Error('Could not clear the server session');
    } catch (error) {
      console.error('Signout error:', error);
    } finally {
      playSound('click');
      setUser(null);
      localStorage.removeItem('dreampath-current-user');
      localStorage.removeItem('dreampath-demo-persona');
      document.cookie = 'dreampath-demo-persona=; Path=/; Max-Age=0; SameSite=Lax';
      router.replace('/');
      router.refresh();
    }
  }, [router, user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, signIn, signInAsPersona, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}