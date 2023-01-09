import { SyncTableChangeSet } from '@nozbe/watermelondb/sync';

import { ResponseErrorMessage } from './@types';
import { api } from './api';

export interface PutUserRequest {
  name: string;
  driver_license: string;
  avatar: string;
  password: string;
  old_password: string;
}

export interface PutUserResponse extends ResponseErrorMessage {
  id: string;
  name: string;
  driver_license: string;
  avatar: string;
}

export const putUser = async (
  dataRequest: PutUserRequest | SyncTableChangeSet
): Promise<PutUserResponse> => {
  try {
    const { data } = await api.put<PutUserResponse>('/users', dataRequest);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
