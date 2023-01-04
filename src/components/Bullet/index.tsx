import React from 'react';
import { ViewProps } from 'react-native';

import * as S from './styles';

interface BulletProps extends ViewProps {
  active?: boolean;
}

export const Bullet: React.FC<BulletProps> = ({ active = false, ...rest }) => {
  return <S.Container active={active} {...rest} />;
};
