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
import { LoadAnimation } from '../../components/LoadAnimation';
import { CardDTO } from '../../dtos/CardDTO';
import { getCarById } from '../../services/getCarById';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import * as S from './styles';

interface CarDetailsParams {
  carId: string;
}

export const CarDetails = () => {
  const [car, setCar] = useState<CardDTO>({} as CardDTO);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { carId } = route.params as CarDetailsParams;

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
    const fetchOnlineData = async () => {
      try {
        const data = await getCarById({ carId });

        setCar(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (netInfo.isConnected === true) fetchOnlineData();
  }, [netInfo.isConnected]);

  if (loading) {
    return (
      <>
        <StatusBar style="dark" backgroundColor="transparent" translucent />
        <LoadAnimation isConnected={netInfo.isConnected === true} />
      </>
    );
  }

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
                car.photos
                  ? car.photos
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

        {!!car.accessories && (
          <S.CarAccessories>
            {car.accessories.map(accessory => (
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

        {netInfo.isConnected === false && (
          <S.OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro
          </S.OfflineInfo>
        )}
      </S.Footer>
    </S.Container>
  );
};
