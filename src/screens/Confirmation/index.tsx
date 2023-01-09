import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useWindowDimensions } from 'react-native';

import DoneSvg from '../../assets/done.svg';
import LogoSvg from '../../assets/logo_background_gray.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import * as S from './styles';

interface ConfirmationParams {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export const Confirmation = () => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { title, message, nextScreenRoute } =
    route.params as ConfirmationParams;

  const handleConfirmRental = () => navigation.navigate(nextScreenRoute);

  return (
    <S.Container>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <LogoSvg width={width} />

      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>{title}</S.Title>

        <S.Message>{message}</S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton title="OK" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  );
};
