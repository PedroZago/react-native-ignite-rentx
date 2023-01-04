import { Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(View)`
  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled(View)`
  width: 100%;

  margin-top: ${getStatusBarHeight() + 115}px;
`;

export const Title = styled(Text)`
  font-size: ${RFValue(40)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary600};
`;

export const SubTitle = styled(Text)`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary400};
  line-height: ${RFValue(25)}px;

  margin-top: 16px;
`;

export const Form = styled(View)`
  width: 100%;

  margin: 64px 0;
`;

export const Footer = styled(View)``;

export const Divider = styled(View)`
  margin-top: 8px;
`;
