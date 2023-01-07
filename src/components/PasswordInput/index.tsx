import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import * as S from './styles';

interface PasswordInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  iconName,
  value,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(isVisible => !isVisible);
  };

  return (
    <S.Container>
      <S.IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
          autoCorrect={false}
        />
      </S.IconContainer>

      <S.TextInput
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />

      <S.ChangePasswordVisibilityButton
        onPress={handlePasswordVisibility}
        activeOpacity={0.5}
      >
        <S.IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </S.IconContainer>
      </S.ChangePasswordVisibilityButton>
    </S.Container>
  );
};
