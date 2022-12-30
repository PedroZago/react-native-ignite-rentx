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

interface ImageIndexProps {
  active: boolean;
}

export const ImageIndex = styled(View)<ImageIndexProps>`
  width: 6px;
  height: 6px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};

  margin-left: 8px;
  border-radius: 3px;
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
