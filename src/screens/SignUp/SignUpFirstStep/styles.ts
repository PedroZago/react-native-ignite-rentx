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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + 31}px;
`;

export const Steps = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled(Text)`
  font-size: ${RFValue(40)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary600};

  margin-top: 60px;
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

  margin-top: 64px;
  margin-bottom: 16px;
`;

export const FormTitle = styled(Text)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary600};

  margin-bottom: 24px;
`;

export const Divider = styled(View)`
  margin-top: 8px;
`;
