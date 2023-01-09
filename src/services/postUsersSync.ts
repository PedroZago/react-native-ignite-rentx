import { SyncTableChangeSet } from '@nozbe/watermelondb/sync';

import { ResponseErrorMessage } from './@types';
import { api } from './api';

export interface PostUsersSyncRequest extends SyncTableChangeSet {}

export interface PostUsersSyncResponse extends ResponseErrorMessage {
  id: string;
  name: string;
  driver_license: string;
  avatar: string;
}

export const postUsersSync = async (
  dataRequest: PostUsersSyncRequest
): Promise<PostUsersSyncResponse> => {
  try {
    const { data } = await api.post<PostUsersSyncResponse>(
      '/users/sync',
      dataRequest
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
