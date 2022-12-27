import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
}

export const Button: React.FC<ButtonProps> = ({ title, color, ...rest }) => {
  return (
    <S.Container {...rest} color={color}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
