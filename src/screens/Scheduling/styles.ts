import { ScrollView, ScrollViewProps, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
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
  font-size: ${RFValue(34)}px;
  font-family: ${({ theme }) => theme.fonts.secondary600};
  color: ${({ theme }) => theme.colors.shape};

  margin-top: 24px;
`;

export const RentalPeriod = styled(View)`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 32px 0px;
`;

export const DateInfo = styled(View)`
  width: 30%;
`;

export const DateTitle = styled(Text)`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary500};
  color: ${({ theme }) => theme.colors.title};
`;

interface DataValueProps {
  selected: boolean;
}

export const DataValue = styled(Text)<DataValueProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary500};
  color: ${({ theme }) => theme.colors.shape};

  ${({ selected, theme }) =>
    !selected &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.text};
      padding-bottom: 5px;
    `}
`;

export const Content = styled(ScrollView).attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
} as ScrollViewProps)``;

export const Footer = styled(View)`
  padding: 24px;
`;
