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
import type { Workshop, WorkshopInput } from '@/types/workshop';

type WorkshopContextValue = {
  workshop: Workshop | null;
  hasWorkshop: boolean;
  saveWorkshop: (data: WorkshopInput) => void;
  updateWorkshop: (patch: Partial<Omit<Workshop, 'createdAt' | 'email'>>) => void;
  clearWorkshop: () => void;
};

const WorkshopContext = createContext<WorkshopContextValue | null>(null);

export function WorkshopProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setWorkshop(null);
    }
  }, [isAuthenticated]);

  const saveWorkshop = useCallback((data: WorkshopInput) => {
    setWorkshop({
      ...data,
      photos: [],
      onVacation: false,
      createdAt: new Date().toISOString(),
    });
  }, []);

  const updateWorkshop = useCallback((patch: Partial<Omit<Workshop, 'createdAt' | 'email'>>) => {
    setWorkshop((current) => (current ? { ...current, ...patch } : current));
  }, []);

  const clearWorkshop = useCallback(() => {
    setWorkshop(null);
  }, []);

  const value = useMemo(
    () => ({
      workshop,
      hasWorkshop: workshop !== null,
      saveWorkshop,
      updateWorkshop,
      clearWorkshop,
    }),
    [workshop, saveWorkshop, updateWorkshop, clearWorkshop],
  );

  return <WorkshopContext.Provider value={value}>{children}</WorkshopContext.Provider>;
}

export function useWorkshop() {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw new Error('useWorkshop must be used within WorkshopProvider');
  }
  return context;
}
