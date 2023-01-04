import { Image, View, Dimensions, FlatListProps, FlatList } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  width: 100%;
`;

export const ImageIndexes = styled(View)`
  flex-direction: row;
  align-self: flex-end;

  padding-right: 24px;
`;

export const CarImageWrapper = styled(View)`
  width: ${Dimensions.get('window').width}px;
  height: 132px;

  justify-content: center;
  align-items: center;
`;

export const CarImage = styled(Image)`
  width: 280px;
  height: 132px;
`;

export const Carousel = styled(
  FlatList as new (props: FlatListProps<string>) => FlatList<string>
).attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
} as FlatListProps<string>)``;
