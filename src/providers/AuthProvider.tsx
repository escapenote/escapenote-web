import { createContext, useEffect } from 'react';

import type { IUser } from 'types';

import api from 'api';
import type { ILoginByEmailRes } from 'api/auth';

import { useAppDispatch, useAppSelector } from 'store';
import { currentAuthenticatedUser } from 'store/authSlice';

interface LoginProps {
  email: string;
  password: string;
  onSuccess?: (data?: ILoginByEmailRes) => void;
  onError?: (error?: any) => void;
}

type AuthState = {
  accessToken: string | null;
  user: IUser | null;
  login: ({ email, password, onSuccess, onError }: LoginProps) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector(state => state.auth);

  const login = async ({ email, password, onSuccess, onError }: LoginProps) => {
    try {
      const { data } = await api.auth.loginByEmail({ email, password });

      // Set access token to state and refresh token to cookie
      dispatch(currentAuthenticatedUser(data));

      onSuccess?.(data);
    } catch (error: any) {
      console.error('Login failed:', error);
      onError?.(error);
    }
  };

  const logout = async () => {
    await api.auth.logout();
    dispatch(currentAuthenticatedUser(null));
  };

  // Token refresh logic on initial load or refresh
  useEffect(() => {
    const visibilityChange = () => {
      if (user && !document.hidden) {
        refreshTokens();
      }
    };

    document.addEventListener('visibilitychange', visibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', visibilityChange);
    };
  }, [user]);

  async function refreshTokens() {
    try {
      // Request new access token using refresh token
      const { data } = await api.auth.refreshToken();

      // Update access token and user in state
      dispatch(currentAuthenticatedUser(data));
    } catch (error) {
      console.error('Failed to refresh tokens:', error);
      dispatch(currentAuthenticatedUser(null));
    }
  }

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
