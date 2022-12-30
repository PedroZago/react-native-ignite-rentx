import { AntDesign } from '@expo/vector-icons';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CardDTO } from '../../dtos/CardDTO';
import { api } from '../../services/api';
import * as S from './styles';

export interface CarProps {
  id: string;
  user_id: string;
  car: CardDTO;
  startDate: string;
  endDate: string;
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
          <S.CarFooterDate>{data.startDate}</S.CarFooterDate>

          <AntDesign
            name="arrowright"
            size={20}
            color={theme.colors.title}
            style={{ marginHorizontal: 10 }}
          />

          <S.CarFooterDate>{data.endDate}</S.CarFooterDate>
        </S.CarFooterPeriod>
      </S.CarFooter>
    </S.CarWrapper>
  );

  const renderItem: ListRenderItem<CarProps> = ({ item }) => (
    <ListItem data={item} />
  );

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');

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
