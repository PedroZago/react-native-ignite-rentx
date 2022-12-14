import { FlatList, FlatListProps, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { CarProps } from '.';

export const Container = styled(View)`
  flex: 1;

  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled(View)`
  width: 100%;
  height: 325px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: center;
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 30}px;
`;

export const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(Text)`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary600};
  color: ${({ theme }) => theme.colors.shape};

  margin-top: 24px;
`;

export const SubTitle = styled(Text)`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary400};
  color: ${({ theme }) => theme.colors.shape};

  margin-top: 24px;
`;

export const Content = styled(View)`
  flex: 1;
  width: 100%;
  padding: 0 16px;
`;

export const Appointment = styled(View)`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px 0px;
`;

export const AppointmentTitle = styled(Text)`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
  color: ${({ theme }) => theme.colors.text};
`;

export const AppointmentQuantity = styled(Text)`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary500};
  color: ${({ theme }) => theme.colors.title};
`;

export const CarList = styled(
  FlatList as new (props: FlatListProps<CarProps>) => FlatList<CarProps>
).attrs({
  showsVerticalScrollIndicator: false,
} as FlatListProps<CarProps>)``;

export const CarWrapper = styled(View)`
  margin-bottom: 16px;
`;

export const CarFooter = styled(View)`
  width: 100%;
  padding: 12px;

  margin-top: -10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const CarFooterTitle = styled(Text)`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary500};
  color: ${({ theme }) => theme.colors.text_detail};
`;

export const CarFooterPeriod = styled(View)`
  flex-direction: row;
`;

export const CarFooterDate = styled(Text)`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
  color: ${({ theme }) => theme.colors.title};
`;
