import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

import { database } from '../database';
import { User as ModelUser } from '../database/model/User';
import { api } from '../services/api';

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  isLogging: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<User>({} as User);
  const [isLogging, setIsLogging] = useState(false);

  async function signIn({ email, password }: SignInCredentials): Promise<void> {
    try {
      const response = await api.post<{ token: string; user: User }>(
        '/sessions',
        {
          email,
          password,
        }
      );

      setIsLogging(false);

      const { token, user } = response.data;

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const dataUser = await userCollection.create(newUser => {
          // eslint-disable-next-line no-unused-expressions, no-sequences
          (newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.driver_license = user.driver_license),
            (newUser.avatar = user.avatar),
            (newUser.token = token);
        });

        const userData = dataUser._raw as unknown as User;
        setData(userData);
      });
    } catch (error) {
      console.log(error);
      throw new Error(error as any);
    }
  }

  async function signOut(): Promise<void> {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error) {
      console.log(error);
      throw new Error(error as any);
    }
  }

  async function updateUser(user: User): Promise<void> {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        const dataUser = await userSelected.update(userData => {
          // eslint-disable-next-line no-unused-expressions, no-sequences
          (userData.name = user.name),
            (userData.driver_license = user.driver_license),
            (userData.avatar = user.avatar);
        });

        const userData = dataUser._raw as unknown as User;
        setData(userData);
      });
    } catch (error) {
      console.log(error);
      throw new Error(error as any);
    }
  }

  useEffect(() => {
    const loadUserData = async () => {
      const userCollection = database.get<ModelUser>('users');
      const users = await userCollection.query().fetch();

      if (users.length > 0) {
        const userData = users[0]._raw as unknown as User;

        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${userData.token}`;

        setData(userData);
      }
    };

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data, signIn, signOut, updateUser, isLogging }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
