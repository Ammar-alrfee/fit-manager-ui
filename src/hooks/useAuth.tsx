
import { useState, createContext, useContext, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('fitmanager_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({ user, isAuthenticated: true });
      } catch (error) {
        localStorage.removeItem('fitmanager_user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let user: User | null = null;
      
      if (username === 'admin' && password === 'admin123') {
        user = {
          id: '1',
          username: 'admin',
          role: 'admin',
          name: 'مدير النظام'
        };
      } else if (username === 'employee' && password === 'emp123') {
        user = {
          id: '2',
          username: 'employee',
          role: 'employee',
          name: 'موظف الاستقبال'
        };
      }

      if (user) {
        setAuthState({ user, isAuthenticated: true });
        localStorage.setItem('fitmanager_user', JSON.stringify(user));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('fitmanager_user');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
