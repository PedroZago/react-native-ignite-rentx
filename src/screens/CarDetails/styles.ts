import { ScrollViewProps, Text, View } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
  z-index: 1;
`;

export const AnimatedViewCarImages = styled(Animated.View)``;

export const CarImages = styled(View)`
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const TopContent = styled(Animated.View)`
  position: absolute;
  overflow: hidden;
  z-index: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Content = styled(Animated.ScrollView).attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: getStatusBarHeight() + 160,
    alignItems: 'center',
  },
  showsVerticalScrollIndicator: false,
} as ScrollViewProps)``;

export const Details = styled(View)`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 38px;
`;

export const Description = styled(View)``;

export const Brand = styled(Text)`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary500};
  color: ${({ theme }) => theme.colors.text_detail};

  text-transform: uppercase;
`;

export const Name = styled(Text)`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary500};
  color: ${({ theme }) => theme.colors.title};
`;

export const Rent = styled(View)``;

export const Period = styled(Text)`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary500};
  color: ${({ theme }) => theme.colors.text_detail};

  text-transform: uppercase;
`;

export const Price = styled(Text)`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary500};
  color: ${({ theme }) => theme.colors.main};
`;

export const About = styled(Text)`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
  color: ${({ theme }) => theme.colors.text};
  text-align: justify;
  line-height: ${RFValue(25)}px;

  margin-top: 23px;
`;

export const CarAccessories = styled(View)`
  width: 100%;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
`;

export const Footer = styled(View)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background_primary};

  padding: 24px 24px ${getBottomSpace() + 24}px;
`;

export const OfflineInfo = styled(Text)`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
  color: ${({ theme }) => theme.colors.main};
  text-align: center;
`;
