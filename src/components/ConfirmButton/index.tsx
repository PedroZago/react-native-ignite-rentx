import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

interface ConfirmButtonProps extends TouchableOpacityProps {
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
