import React, { useRef, useState } from 'react';
import { ListRenderItem, ViewToken } from 'react-native';

import { Bullet } from '../Bullet';
import * as S from './styles';

export type Photo = {
  id: string;
  photo: string;
};

interface ImageSliderProps {
  imagesUrl: Photo[];
}

interface ListItemProps {
  data: Photo;
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
      <S.CarImage source={{ uri: data.photo }} resizeMode="contain" />
    </S.CarImageWrapper>
  );

  const renderItem: ListRenderItem<Photo> = ({ item }) => (
    <ListItem data={item} />
  );
  return (
    <S.Container>
      <S.ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet key={String(item.id)} active={index === imageIndex} />
        ))}
      </S.ImageIndexes>

      <S.Carousel
        data={imagesUrl}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onViewableItemsChanged={indexChanged.current}
      />
    </S.Container>
  );
};
