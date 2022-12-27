import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';

import AccelerationSvg from '../../assets/acceleration.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import PeopleSvg from '../../assets/people.svg';
import SpeedSvg from '../../assets/speed.svg';
import { Accessories } from '../../components/Accessories';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';
import * as S from './styles';

interface CarDetailsProps {}

export const CarDetails: React.FC<CarDetailsProps> = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleConfirmRental = () => {
    navigation.navigate('Scheduling');
  };

  return (
    <S.Container>
      <S.Header>
        <BackButton />
      </S.Header>

      <S.CarImages>
        <ImageSlider
          imagesUrl={[
            'https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png',
          ]}
        />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>Lamborghini</S.Brand>

            <S.Name>Huracan</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>Ao dia</S.Period>

            <S.Price>R$ 580</S.Price>
          </S.Rent>
        </S.Details>

        <S.CarAccessories>
          <Accessories name="380Km/h" icon={SpeedSvg} />
          <Accessories name="3.2s" icon={AccelerationSvg} />
          <Accessories name="800 HP" icon={ForceSvg} />
          <Accessories name="Gasolina" icon={GasolineSvg} />
          <Accessories name="Auto" icon={ExchangeSvg} />
          <Accessories name="2 pessoas" icon={PeopleSvg} />
        </S.CarAccessories>

        <S.About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </S.About>
      </S.Content>

      <S.Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </S.Footer>
    </S.Container>
  );
};
