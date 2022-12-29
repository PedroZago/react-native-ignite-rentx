import { FlatList, FlatListProps, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { CardDTO } from '../../dtos/CardDTO';

export const Container = styled(View)`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled(View)`
  width: 100%;
  height: 133px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: flex-end;

  padding: 32px 24px;
`;

export const HeaderContent = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalCars = styled(Text)`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(
  FlatList as new (props: FlatListProps<CardDTO>) => FlatList<CardDTO>
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
} as FlatListProps<CardDTO>)``;
