import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps {
  color?: string;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.main};
`;

interface TitleProps {
  light?: boolean;
}

export const Title = styled(Text)<TitleProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary500};
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
`;
