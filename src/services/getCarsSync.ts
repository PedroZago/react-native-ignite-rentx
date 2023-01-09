import { SyncDatabaseChangeSet } from '@nozbe/watermelondb/sync';

import { ResponseErrorMessage } from './@types';
import { api } from './api';

export interface GetCarsSyncRequest {
  lastPulledAt: number | null;
}

export interface GetCarsSyncResponse extends ResponseErrorMessage {
  latestVersion: number;
  changes: SyncDatabaseChangeSet;
}

export const getCarsSync = async ({
  lastPulledAt,
}: GetCarsSyncRequest): Promise<GetCarsSyncResponse> => {
  try {
    const { data } = await api.get<GetCarsSyncResponse>(
      `/cars/sync/pull?lastPulledVersion=${lastPulledAt ?? 0}`
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
