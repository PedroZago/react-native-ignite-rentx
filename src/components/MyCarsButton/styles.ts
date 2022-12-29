import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  width: 60px;
  height: 60px;

  align-items: center;
  justify-content: center;

  border-radius: 30px;

  background-color: ${({ theme }) => theme.colors.main};

  position: absolute;
  bottom: 13px;
  right: 22px;
`;
