import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CardDTO } from '../../dtos/CardDTO';
import { api } from '../../services/api';
import * as S from './styles';

export const Home = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [cars, setCars] = useState<CardDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCarDetails = (car: CardDTO) =>
    navigation.navigate('CarDetails', { car });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await api.get<CardDTO[]>('/cars');

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && <S.TotalCars>Total de {cars.length} carros</S.TotalCars>}
        </S.HeaderContent>
      </S.Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <S.CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </S.Container>
  );
};
