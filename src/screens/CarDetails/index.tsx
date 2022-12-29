import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';

import { Accessories } from '../../components/Accessories';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';
import { CardDTO } from '../../dtos/CardDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import * as S from './styles';

interface CarDetailsParams {
  car: CardDTO;
}

export const CarDetails = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { car } = route.params as CarDetailsParams;

  const handleConfirmRental = () => {
    navigation.navigate('Scheduling', { car });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleGoBack} />
      </S.Header>

      <S.CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>

            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.rent.period}</S.Period>

            <S.Price>
              {`R$ ${car.rent.price.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}`}
            </S.Price>
          </S.Rent>
        </S.Details>

        <S.CarAccessories>
          {car.accessories.map(accessory => (
            <Accessories
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </S.CarAccessories>

        <S.About>{car.about}</S.About>
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
