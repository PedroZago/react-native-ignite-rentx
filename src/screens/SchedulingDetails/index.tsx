import { Feather } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
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
import { getCarById } from '../../services/getCarById';
import { formattedDate } from '../../utils/formattedDate';
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

      const dataRequest = {
        user_id: 1,
        car_id: car.id,
        start_date: getPlatformDate(new Date(dates[0])),
        end_date: getPlatformDate(new Date(dates[dates.length - 1])),
        total: rentTotal,
      };

      await api.post('/rentals', dataRequest);

      navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: `Agora voc?? s?? precisa ir\nat?? a concession??ria da RENTX\npegar o seu autom??vel.`,
        nextScreenRoute: 'Home',
      });
    } catch (error) {
      console.log(error);
      Alert.alert('N??o foi poss??vel confirmar o agendamento.');
      setLoading(false);
    }
  };

  const handleGoBack = () => navigation.goBack();

  const rentTotal = dates.length * car.price;

  useEffect(() => {
    setRentalPeriod({
      start: formattedDate(getPlatformDate(new Date(dates[0]))),
      end: formattedDate(getPlatformDate(new Date(dates[dates.length - 1]))),
    });
  }, []);

  useEffect(() => {
    const fetchUpdatedCar = async () => {
      const data = await getCarById({ carId: car.id });
      setCarUpdated(data);
    };

    if (netInfo.isConnected === true) fetchUpdatedCar();
  }, [netInfo.isConnected]);

  return (
    <S.Container>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

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
            <S.DateTitle>AT??</S.DateTitle>
            <S.DateValue>{rentalPeriod.end}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>

          <S.RentalPriceDetails>
            <S.RentalPriceQuota>{`R$ ${car.price} x${dates.length} di??rias`}</S.RentalPriceQuota>

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
