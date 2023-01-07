import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Cars as ModelCars } from '../../database/model/Cars';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import * as S from './styles';

interface CarProps extends TouchableOpacityProps {
  data: ModelCars;
}

export const Car: React.FC<CarProps> = ({ data, ...rest }) => {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  const netInfo = useNetInfo();

  return (
    <S.Container {...rest}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>

        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.period}</S.Period>

            <S.Price>{`R$ ${
              netInfo.isConnected === true
                ? data.price.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })
                : '...'
            }`}</S.Price>
          </S.Rent>

          <S.Type>
            <MotorIcon />
          </S.Type>
        </S.About>
      </S.Details>

      <S.CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </S.Container>
  );
};
