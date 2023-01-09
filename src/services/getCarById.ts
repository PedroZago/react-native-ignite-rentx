import { ResponseErrorMessage } from './@types';
import { api } from './api';

export interface GetCarByIdRequest {
  carId: string;
}

export interface GetCarByIdResponse extends ResponseErrorMessage {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories: {
    id: string;
    type: string;
    name: string;
  }[];
  photos: {
    id: string;
    photo: string;
  }[];
}

export const getCarById = async ({
  carId,
}: GetCarByIdRequest): Promise<GetCarByIdResponse> => {
  try {
    const { data } = await api.get<GetCarByIdResponse>(`/cars/${carId}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
