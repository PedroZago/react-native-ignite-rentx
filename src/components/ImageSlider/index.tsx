import React, { useRef, useState } from 'react';
import { ListRenderItem, ViewToken } from 'react-native';

import { Bullet } from '../Bullet';
import * as S from './styles';

interface ImageSliderProps {
  imagesUrl: string[];
}

interface ListItemProps {
  data: string;
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ imagesUrl }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  const ListItem = ({ data }: ListItemProps) => (
    <S.CarImageWrapper>
      <S.CarImage source={{ uri: data }} resizeMode="contain" />
    </S.CarImageWrapper>
  );

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <ListItem data={item} />
  );
  return (
    <S.Container>
      <S.ImageIndexes>
        {imagesUrl.map((_, index) => (
          <Bullet key={String(index)} active={index === imageIndex} />
        ))}
      </S.ImageIndexes>

      <S.Carousel
        data={imagesUrl}
        keyExtractor={item => item}
        renderItem={renderItem}
        onViewableItemsChanged={indexChanged.current}
      />
    </S.Container>
  );
};
