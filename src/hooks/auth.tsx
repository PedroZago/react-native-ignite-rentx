import React, { createContext, useState, useContext, ReactNode } from 'react';

import { database } from '../database';
import { User as ModelUser } from '../database/model/User';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password }: SignInCredentials): Promise<void> {
    const response = await api.post<AuthState>('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const userCollection = database.get<ModelUser>('users');
    await database.write(async () => {
      await userCollection.create(newUser => {
        newUser.user_id = user.id,
        newUser.name = user.name,
        newUser.email = user.email,
        newUser.driver_license = user.driver_license,
        newUser.avatar = user.avatar,
        newUser.token = token,
      })
    })

    setData({ token, user });
  }

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
