import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';
import * as S from './styles';

export const Splash = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const startApp = () => navigation.navigate('AppStacks');

  useEffect(() => {
    let mounted = true;

    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      if (mounted) {
        // eslint-disable-next-line no-unused-expressions, prettier/prettier
        ('worklet');
        runOnJS(startApp)();
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <S.Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </S.Container>
  );
};
