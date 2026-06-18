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
import type { Motorcycle } from '@/types/motorcycle';

type MotorcycleContextValue = {
  motorcycle: Motorcycle | null;
  hasMotorcycle: boolean;
  saveMotorcycle: (data: Omit<Motorcycle, 'createdAt'>) => void;
  clearMotorcycle: () => void;
};

const MotorcycleContext = createContext<MotorcycleContextValue | null>(null);

export function MotorcycleProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setMotorcycle(null);
    }
  }, [isAuthenticated]);

  const saveMotorcycle = useCallback((data: Omit<Motorcycle, 'createdAt'>) => {
    setMotorcycle({ ...data, createdAt: new Date().toISOString() });
  }, []);

  const clearMotorcycle = useCallback(() => {
    setMotorcycle(null);
  }, []);

  const value = useMemo(
    () => ({
      motorcycle,
      hasMotorcycle: motorcycle !== null,
      saveMotorcycle,
      clearMotorcycle,
    }),
    [motorcycle, saveMotorcycle, clearMotorcycle],
  );

  return <MotorcycleContext.Provider value={value}>{children}</MotorcycleContext.Provider>;
}

export function useMotorcycle() {
  const context = useContext(MotorcycleContext);
  if (!context) {
    throw new Error('useMotorcycle must be used within MotorcycleProvider');
  }
  return context;
}
