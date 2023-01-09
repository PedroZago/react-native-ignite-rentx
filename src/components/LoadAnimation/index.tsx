import AnimatedLottieView from 'lottie-react-native';
import React from 'react';

import loadingCar from '../../assets/loading_car.json';
import * as S from './styles';

interface LoadAnimationProps {
  isConnected?: boolean;
}

export const LoadAnimation: React.FC<LoadAnimationProps> = ({
  isConnected = true,
}) => {
  return (
    <S.Container>
      <AnimatedLottieView
        style={{ height: 200 }}
        resizeMode="contain"
        source={loadingCar}
        loop
        autoPlay
      />

      {!isConnected && (
        <S.ConnectionText>Você está sem conexão de internet!</S.ConnectionText>
      )}
    </S.Container>
  );
};
