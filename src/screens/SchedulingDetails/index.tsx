import { Feather } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { Accessories } from '../../components/Accessories';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';
import { CardDTO } from '../../dtos/CardDTO';
import { api } from '../../services/api';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import * as S from './styles';

interface SchedulingDetailsParams {
  car: CardDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export const SchedulingDetails = () => {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const [carUpdated, setCarUpdated] = useState<CardDTO>({} as CardDTO);

  const netInfo = useNetInfo();

  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { car, dates } = route.params as SchedulingDetailsParams;

  const handleConfirmRental = async () => {
    try {
      setLoading(true);

      await api.post('/rentals', {
        user_id: 1,
        car_id: car.id,
        start_date: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        end_date: format(
          getPlatformDate(new Date(dates[dates.length - 1])),
          'dd/MM/yyyy'
        ),
        total: rentTotal,
      });

      navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
        nextScreenRoute: 'Home',
      });
    } catch (error) {
      Alert.alert('Não foi possível confirmar o agendamento.');
      console.log(error);
      setLoading(false);
    }
  };

  const handleGoBack = () => navigation.goBack();

  const rentTotal = dates.length * car.price;

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUpdatedCar = async () => {
      const response = await api.get<CardDTO>(`/cars/${car.id}`);
      setCarUpdated(response.data);
    };

    if (netInfo.isConnected === true) fetchUpdatedCar();
  }, [netInfo.isConnected]);

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleGoBack} />
      </S.Header>

      <S.CarImages>
        <ImageSlider
          imagesUrl={
            carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>

            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>

            <S.Price>
              {`R$ ${car.price.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}`}
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

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{rentalPeriod.start}</S.DateValue>
          </S.DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.end}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>

          <S.RentalPriceDetails>
            <S.RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</S.RentalPriceQuota>

            <S.RentalPriceTotal>
              {`R$ ${rentTotal.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}`}
            </S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button
          title="Alugar agora"
          onPress={handleConfirmRental}
          color={theme.colors.success}
          enabled={!loading}
          loading={loading}
        />
      </S.Footer>
    </S.Container>
  );
};
