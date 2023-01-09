import { Cars as ModelCars } from '../database/model/Cars';
import { ResponseErrorMessage } from './@types';
import { api } from './api';

export interface GetRentalsResponse extends ResponseErrorMessage {
  id: string;
  car: ModelCars;
  start_date: string;
  end_date: string;
}

export const getRentals = async (): Promise<GetRentalsResponse[]> => {
  try {
    const { data } = await api.get<GetRentalsResponse[]>('/rentals');

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
