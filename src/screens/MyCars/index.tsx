import { AntDesign } from '@expo/vector-icons';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { ListRenderItem } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Cars as ModelCars } from '../../database/model/Cars';
import { api } from '../../services/api';
import * as S from './styles';

export interface CarProps {
  id: string;
  car: ModelCars;
  start_date: string;
  end_date: string;
}

interface ListItemProps {
  data: CarProps;
}

export const MyCars = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const handleGoBack = () => navigation.goBack();

  const ListItem = ({ data }: ListItemProps) => (
    <S.CarWrapper>
      <Car data={data.car} />

      <S.CarFooter>
        <S.CarFooterTitle>Período</S.CarFooterTitle>

        <S.CarFooterPeriod>
          <S.CarFooterDate>{data.start_date}</S.CarFooterDate>

          <AntDesign
            name="arrowright"
            size={20}
            color={theme.colors.title}
            style={{ marginHorizontal: 10 }}
          />

          <S.CarFooterDate>{data.end_date}</S.CarFooterDate>
        </S.CarFooterPeriod>
      </S.CarFooter>
    </S.CarWrapper>
  );

  const renderItem: ListRenderItem<CarProps> = ({ item }) => (
    <ListItem data={item} />
  );

  useFocusEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await api.get('/rentals');

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.ButtonContainer>
          <BackButton color={theme.colors.shape} onPress={handleGoBack} />
        </S.ButtonContainer>

        <S.Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </S.Title>

        <S.SubTitle>Conforto, segurança e praticidade.</S.SubTitle>
      </S.Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <S.Content>
          <S.Appointment>
            <S.AppointmentTitle>Agendamentos feitos</S.AppointmentTitle>
            <S.AppointmentQuantity>{cars.length}</S.AppointmentQuantity>
          </S.Appointment>

          <S.CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </S.Content>
      )}
    </S.Container>
  );
};
