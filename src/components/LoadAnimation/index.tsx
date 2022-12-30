import AnimatedLottieView from 'lottie-react-native';
import React from 'react';

import loadingCar from '../../assets/loading_car.json';
import * as S from './styles';

interface LoadAnimationProps {}

export const LoadAnimation: React.FC<LoadAnimationProps> = () => {
  return (
    <S.Container>
      <AnimatedLottieView
        style={{ height: 200 }}
        resizeMode="contain"
        source={loadingCar}
        loop
        autoPlay
      />
    </S.Container>
  );
};
