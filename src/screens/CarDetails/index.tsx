import { useNetInfo } from '@react-native-community/netinfo';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { Accessories } from '../../components/Accessories';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';
import { Cars as ModelCars } from '../../database/model/Cars';
import { CardDTO } from '../../dtos/CardDTO';
import { api } from '../../services/api';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import * as S from './styles';

interface CarDetailsParams {
  car: ModelCars;
}

export const CarDetails = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { car } = route.params as CarDetailsParams;

  const [carUpdated, setCarUpdated] = useState<CardDTO>({} as CardDTO);

  const netInfo = useNetInfo();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  const handleConfirmRental = () => navigation.navigate('Scheduling', { car });

  const handleGoBack = () => navigation.goBack();

  useEffect(() => {
    const fetchUpdatedCar = async () => {
      const response = await api.get<CardDTO>(`/cars/${car.id}`);
      setCarUpdated(response.data);
    };

    if (netInfo.isConnected === true) fetchUpdatedCar();
  }, [netInfo.isConnected]);

  return (
    <S.Container>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      <S.TopContent style={[headerStyleAnimation]}>
        <S.Header>
          <BackButton onPress={handleGoBack} />
        </S.Header>

        <S.AnimatedViewCarImages style={[sliderCarsStyleAnimation]}>
          <S.CarImages>
            <ImageSlider
              imagesUrl={
                carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </S.CarImages>
        </S.AnimatedViewCarImages>
      </S.TopContent>

      <S.Content onScroll={scrollHandler} scrollEventThrottle={16}>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>

            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>

            <S.Price>
              {`R$ ${
                netInfo.isConnected === true
                  ? car.price.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })
                  : '...'
              }`}
            </S.Price>
          </S.Rent>
        </S.Details>

        {!!carUpdated.accessories && (
          <S.CarAccessories>
            {carUpdated.accessories.map(accessory => (
              <Accessories
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </S.CarAccessories>
        )}

        <S.About>{car.about}</S.About>
      </S.Content>

      <S.Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {netInfo.isConnected === true && (
          <S.OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro
          </S.OfflineInfo>
        )}
      </S.Footer>
    </S.Container>
  );
};
