import { api } from './api';

export interface PostUsersRequest {
  name: string;
  email: string;
  driver_license: string;
  password: string;
}

export const postUsers = async (
  dataRequest: PostUsersRequest
): Promise<void> => {
  try {
    const { data } = await api.post('/users', dataRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
