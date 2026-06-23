import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { useAuth } from '@/contexts/auth-context';
import { profileFromEmail, type UserProfile } from '@/types/user-profile';

type UserProfileContextValue = {
  profile: UserProfile | null;
  updateProfile: (patch: Partial<UserProfile>) => void;
};

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, userEmail } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !userEmail) {
      setProfile(null);
      return;
    }
    setProfile((current) => current ?? profileFromEmail(userEmail));
  }, [isAuthenticated, userEmail]);

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setProfile((current) => (current ? { ...current, ...patch } : current));
  }, []);

  const value = useMemo(
    () => ({
      profile,
      updateProfile,
    }),
    [profile, updateProfile],
  );

  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within UserProfileProvider');
  }
  return context;
}
