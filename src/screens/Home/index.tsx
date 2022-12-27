import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import * as S from './styles';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const carData = [
    {
      id: '0',
      brand: 'Audi',
      name: 'RS 5 Coupé',
      rent: {
        period: 'AO DIA',
        price: 120,
      },
      thumbnail:
        'https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png',
    },
  ];

  const handleCarDetails = () => {
    navigation.navigate('CarDetails');
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <S.TotalCars>Total de 12 carros</S.TotalCars>
        </S.HeaderContent>
      </S.Header>

      <S.CarList
        data={carData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Car data={item} onPress={handleCarDetails} />
        )}
      />
    </S.Container>
  );
};
