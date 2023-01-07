import { FlatList, FlatListProps, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { Cars as ModelCars } from '../../database/model/Cars';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

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
  FlatList as new (props: FlatListProps<ModelCars>) => FlatList<ModelCars>
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
} as FlatListProps<ModelCars>)``;

export const ButtonContainer = styled(Animated.View)`
  position: absolute;
  bottom: 13px;
  right: 22px;
`;

export const Button = styled(ButtonAnimated)`
  width: 60px;
  height: 60px;

  align-items: center;
  justify-content: center;

  border-radius: 30px;

  background-color: ${({ theme }) => theme.colors.main};
`;
