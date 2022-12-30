import { Ionicons } from '@expo/vector-icons';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CardDTO } from '../../dtos/CardDTO';
import { api } from '../../services/api';
import * as S from './styles';

export const Home = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [cars, setCars] = useState<CardDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const handleCarDetails = (car: CardDTO) =>
    navigation.navigate('CarDetails', { car });

  const handleOpenMyCars = () => navigation.navigate('MyCars');

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

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );

    return () => backHandler.remove();
  });

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

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <S.ButtonContainer style={[myCarsButtonStyleAnimation]}>
          <S.Button onPress={handleOpenMyCars}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </S.Button>
        </S.ButtonContainer>
      </PanGestureHandler>
    </S.Container>
  );
};
