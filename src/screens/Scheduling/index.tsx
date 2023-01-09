import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { DateData } from 'react-native-calendars';
import { useTheme } from 'styled-components';

import ArrowSvg from '../../assets/arrow.svg';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, MarkedDates } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { CardDTO } from '../../dtos/CardDTO';
import { formattedDate } from '../../utils/formattedDate';
import { getPlatformDate } from '../../utils/getPlatformDate';
import * as S from './styles';

interface RentalPeriod {
  start: string;
  end: string;
}

interface SchedulingParams {
  car: CardDTO;
}

export const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>(
    {} as DateData
  );
  const [markedDates, setMarkedDates] = useState<MarkedDates>(
    {} as MarkedDates
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { car } = route.params as SchedulingParams;

  const handleConfirmRental = () =>
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates ?? {}),
    });

  const handleGoBack = () => navigation.goBack();

  const handleDateChange = (date: DateData) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: formattedDate(getPlatformDate(new Date(firstDate))),
      end: formattedDate(getPlatformDate(new Date(endDate))),
    });
  };

  return (
    <S.Container>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <S.Header>
        <S.ButtonContainer>
          <BackButton color={theme.colors.shape} onPress={handleGoBack} />
        </S.ButtonContainer>

        <S.Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DataValue selected={!!rentalPeriod.start}>
              {rentalPeriod.start}
            </S.DataValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DataValue selected={!!rentalPeriod.end}>
              {rentalPeriod.end}
            </S.DataValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar markedDates={markedDates} onDayPress={handleDateChange} />
      </S.Content>

      <S.Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.start}
        />
      </S.Footer>
    </S.Container>
  );
};
