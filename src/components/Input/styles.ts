import { TextInput as TextInputRN, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled(View)`
  flex-direction: row;
`;

interface IconContainerProps {
  isFocused: boolean;
}

export const IconContainer = styled(View)<IconContainerProps>`
  height: 55px;
  width: 55px;

  justify-content: center;
  align-items: center;

  margin-right: 2px;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

interface TextInputProps {
  isFocused: boolean;
}

export const TextInput = styled(TextInputRN)<TextInputProps>`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary400};

  padding: 0 23px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;
