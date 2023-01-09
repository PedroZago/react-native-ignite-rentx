import { ResponseErrorMessage } from './@types';
import { api } from './api';

export interface PostSessionsRequest {
  email: string;
  password: string;
}

export interface PostSessionsResponse extends ResponseErrorMessage {
  user: {
    id: string;
    name: string;
    email: string;
    driver_license: string;
    avatar: string;
  };
  token: string;
}

export const postSessions = async (
  dataRequest: PostSessionsRequest
): Promise<PostSessionsResponse> => {
  try {
    const { data } = await api.post<PostSessionsResponse>(
      '/sessions',
      dataRequest
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
