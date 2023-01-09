import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

interface ConfirmButtonProps extends RectButtonProps {
  title: string;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  title,
  ...rest
}) => {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
