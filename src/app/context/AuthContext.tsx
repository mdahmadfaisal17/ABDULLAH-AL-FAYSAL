import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getAdminSession, loginAdmin, logoutAdmin } from "../lib/api";

type AuthContextValue = {
  isAuthenticated: boolean;
  adminEmail: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const session = await getAdminSession();

        if (!isMounted) {
          return;
        }

        setAdminEmail(session.authenticated ? session.adminEmail : null);
      } catch {
        if (isMounted) {
          setAdminEmail(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const session = await loginAdmin(email, password);
    setAdminEmail(session.authenticated ? session.adminEmail : null);
    return session.authenticated;
  };

  const logout = async () => {
    try {
      await logoutAdmin();
    } finally {
      setAdminEmail(null);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(adminEmail),
      adminEmail,
      isLoading,
      login,
      logout,
    }),
    [adminEmail, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
