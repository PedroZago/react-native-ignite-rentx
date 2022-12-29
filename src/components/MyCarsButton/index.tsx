import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';

import * as S from './styles';

interface MyCarsButtonProps extends TouchableOpacityProps {}

export const MyCarsButton: React.FC<MyCarsButtonProps> = ({ ...press }) => {
  const theme = useTheme();

  return (
    <S.Container {...press}>
      <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
    </S.Container>
  );
};
