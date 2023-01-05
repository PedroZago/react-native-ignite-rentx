import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import * as S from './styles';

export const SignIn = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const theme = useTheme();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSign = async () => {
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
          .required('Senha é obrigatória')
          .min(8, 'No mínimo 8 caracteres'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('E-mail inválido'),
      });

      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa!', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação!',
          'Ocorreu um erro ao fazer login, verifique as credencias.'
        );
      }
    }
  };

  const handleNewAccount = () => navigation.navigate('SignUpFirstStep');

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <StatusBar style="dark" backgroundColor="transparent" translucent />

          <S.Header>
            <S.Title>
              Estamos {'\n'}
              quase lá
            </S.Title>

            <S.SubTitle>
              Faça seu login para começar {'\n'}
              uma experiência incrível.
            </S.SubTitle>

            <S.Form>
              <Input
                iconName="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
              />

              <S.Divider />

              <PasswordInput
                iconName="lock"
                placeholder="Senha"
                autoCorrect={false}
                onChangeText={setPassword}
                value={password}
              />
            </S.Form>

            <S.Footer>
              <Button
                title="Login"
                onPress={handleSign}
                enabled={true}
                loading={false}
              />

              <S.Divider />

              <Button
                title="Criar conta gratuita"
                onPress={handleNewAccount}
                light
                enabled={true}
                loading={false}
                color={theme.colors.background_secondary}
              />
            </S.Footer>
          </S.Header>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
