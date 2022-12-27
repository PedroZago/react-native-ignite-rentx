import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import { useWindowDimensions } from 'react-native';

import DoneSvg from '../../assets/done.svg';
import LogoSvg from '../../assets/logo_background_gray.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import * as S from './styles';

interface SchedulingCompleteProps {}

export const SchedulingComplete: React.FC<SchedulingCompleteProps> = () => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleConfirmRental = () => {
    navigation.navigate('Home');
  };

  return (
    <S.Container>
      <LogoSvg width={width} />

      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>Carro alugado!</S.Title>

        <S.Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton title="OK" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  );
};
