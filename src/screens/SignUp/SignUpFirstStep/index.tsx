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
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import * as S from './styles';

export const SignUpFirstStep = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const handleBack = () => navigation.goBack();

  const handleNextStep = async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH obrigatória'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('E-mail inválido'),
        name: Yup.string().required('Nome obrigatório'),
      });

      const data = { name, email, driverLicense };

      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa!', error.message);
      }
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
              <Bullet active />

              <Bullet />
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
            <S.FormTitle>1. Dados</S.FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />

            <S.Divider />

            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />

            <S.Divider />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </S.Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
