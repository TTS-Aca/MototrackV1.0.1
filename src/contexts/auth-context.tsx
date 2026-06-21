import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type AccountType = 'rider' | 'workshop';

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string | null;
  accountType: AccountType | null;
  signIn: (email: string, accountType?: AccountType) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  const signIn = useCallback((email: string, type: AccountType = 'rider') => {
    const normalized = email.trim() || 'demo@mototrack.mx';
    setUserEmail(normalized);
    setAccountType(type);
    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    setUserEmail(null);
    setAccountType(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading: false,
      userEmail,
      accountType,
      signIn,
      signOut,
    }),
    [isAuthenticated, userEmail, accountType, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
