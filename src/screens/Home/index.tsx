import { synchronize } from '@nozbe/watermelondb/sync';
import { useNetInfo } from '@react-native-community/netinfo';
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
import { database } from '../../database';
import { Cars as ModelCars } from '../../database/model/Cars';
import { api } from '../../services/api';
import * as S from './styles';

export const Home = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [cars, setCars] = useState<ModelCars[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();

  const handleCarDetails = (car: ModelCars) =>
    navigation.navigate('CarDetails', { car });

  const offlineSynchronize = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `/cars/sync/pull?lastPulledVersion=${lastPulledAt ?? 0}`
        );

        const { latestVersion, changes } = data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/cars/sync', user);
      },
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCard = async () => {
      try {
        const userCollection = database.get<ModelCars>('cars');
        const cars = await userCollection.query().fetch();

        if (isMounted) setCars(cars);
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCard();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) offlineSynchronize();
  }, [netInfo.isConnected]);

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
