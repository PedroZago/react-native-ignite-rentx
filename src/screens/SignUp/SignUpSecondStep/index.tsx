import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
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

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import { postUsers, PostUsersRequest } from '../../../services/postUsers';
import * as S from './styles';

interface SignUpFirstStepParams {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export const SignUpSecondStep = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { user } = route.params as SignUpFirstStepParams;

  const theme = useTheme();

  const handleBack = () => navigation.goBack();

  const handleRegister = async () => {
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
          .required('Senha obrigatória')
          .min(8, 'No mínimo 8 caracteres'),
        passwordConfirm: Yup.string().oneOf(
          [null, Yup.ref('password')],
          'As senhas precisam ser iguais'
        ),
      });

      await schema.validate({ password, passwordConfirm });

      const dataRequest: PostUsersRequest = {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      };

      await postUsers(dataRequest);

      navigation.navigate('Confirmation', {
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar`,
        nextScreenRoute: 'SignIn',
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa!', error.message);
      }

      Alert.alert('Opa!', 'Não foi possível cadastrar.');
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <StatusBar style="dark" backgroundColor="transparent" translucent />

          <S.Header>
            <BackButton onPress={handleBack} />

            <S.Steps>
              <Bullet />

              <Bullet active />
            </S.Steps>
          </S.Header>

          <S.Title>
            Crie sua {'\n'}
            conta
          </S.Title>

          <S.SubTitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil.
          </S.SubTitle>

          <S.Form>
            <S.FormTitle>2. Senha</S.FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />

            <S.Divider />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </S.Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
