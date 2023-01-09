import { synchronize } from '@nozbe/watermelondb/sync';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { database } from '../../database';
import { Cars as ModelCars } from '../../database/model/Cars';
import { getCarsSync } from '../../services/getCarsSync';
import { postUsersSync } from '../../services/postUsersSync';
import * as S from './styles';

export const Home = () => {
  const [cars, setCars] = useState<ModelCars[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const synchronizing = useRef(false);

  const handleCarDetails = (car: ModelCars) =>
    navigation.navigate('CarDetails', { carId: car._raw.id });

  const fetchCars = async () => {
    try {
      const userCollection = database.get<ModelCars>('cars');
      const cars = await userCollection.query().fetch();

      setCars(cars);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const offlineSynchronize = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const data = await getCarsSync({ lastPulledAt });

        const { latestVersion, changes } = data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        if (user) await postUsersSync(user);
      },
    });

    await fetchCars();
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchCars();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const syncChanges = async () => {
        if (netInfo.isConnected && !synchronizing.current) {
          synchronizing.current = true;

          try {
            await offlineSynchronize();
          } catch (error) {
            console.log(error);
          } finally {
            synchronizing.current = false;
          }
        }
      };

      syncChanges();
    }, [netInfo.isConnected])
  );

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
