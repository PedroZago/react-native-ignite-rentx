import { Feather } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import { putUser, PutUserRequest } from '../../services/putUser';
import * as S from './styles';

type OptionForm = 'dataEdit' | 'passwordEdit';

export const Profile = () => {
  const { user, signOut, updateUser } = useAuth();

  const netInfo = useNetInfo();

  const [option, setOption] = useState<OptionForm>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);

  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleGoBack = () => navigation.goBack();

  const handleChangeOptions = (optionSelected: OptionForm) => {
    if (netInfo.isConnected === false && optionSelected === 'passwordEdit') {
      Alert.alert(
        'Você está offline',
        'Para mudar a senha, conecte-se a internet.'
      );
    } else {
      setOption(optionSelected);
    }
  };

  const handleSelectAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.canceled) return;

    if (result.assets) setAvatar(result.assets[0].uri);
  };

  const handleUpdateProfile = async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH obrigatória'),
        name: Yup.string().required('Nome obrigatório'),
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        name,
        email: user.email,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });

      Alert.alert('Sucesso!', 'Perfil atualizado com sucesso!.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa!', error.message);
      }

      Alert.alert('Opa!', 'Não foi possível atualizar o perfil.');
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const schema = Yup.object().shape({
        oldPassword: Yup.string()
          .required('Senha atual obrigatória')
          .min(8, 'No mínimo 8 caracteres'),
        newPassword: Yup.string()
          .required('Senha nova obrigatória')
          .min(8, 'No mínimo 8 caracteres'),
        newPasswordConfirm: Yup.string().oneOf(
          [null, Yup.ref('newPassword')],
          'As senhas novas precisam ser iguais'
        ),
      });

      const data = { oldPassword, newPassword, newPasswordConfirm };
      await schema.validate(data);

      const dataRequest: PutUserRequest = {
        name,
        driver_license: driverLicense,
        avatar,
        password: newPasswordConfirm,
        old_password: oldPassword,
      };

      await putUser(dataRequest);

      Alert.alert('Sucesso!', 'Senha atualizada com sucesso!.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa!', error.message);
      }

      Alert.alert('Opa!', 'Não foi possível atualizar o perfil.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: async () => {},
        },
        {
          text: 'Sair',
          onPress: async () => signOut(),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <S.HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleGoBack} />

              <S.HeaderTitle>Editar Perfil</S.HeaderTitle>

              <S.LogoutButton onPress={handleLogout}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </S.LogoutButton>
            </S.HeaderTop>

            <S.PhotoContainer>
              {!!avatar && (
                <S.Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}

              <S.EditPhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </S.EditPhotoButton>
            </S.PhotoContainer>
          </S.Header>

          <S.Content>
            <S.Options>
              <S.Option
                active={option === 'dataEdit'}
                onPress={() => handleChangeOptions('dataEdit')}
              >
                <S.OptionTitle active={option === 'dataEdit'}>
                  Dados
                </S.OptionTitle>
              </S.Option>

              <S.Option
                active={option === 'passwordEdit'}
                onPress={() => handleChangeOptions('passwordEdit')}
              >
                <S.OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </S.OptionTitle>
              </S.Option>
            </S.Options>

            {option === 'dataEdit' ? (
              <S.Section>
                <Input
                  iconName="user"
                  placeholder="Name"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />

                <S.Divider />

                <Input
                  iconName="mail"
                  placeholder="E-mail"
                  editable={false}
                  defaultValue={user.email}
                />

                <S.Divider />

                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </S.Section>
            ) : (
              <S.Section>
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha atual"
                  onChangeText={setOldPassword}
                  value={oldPassword}
                />

                <S.Divider />

                <PasswordInput
                  iconName="lock"
                  placeholder="Nova senha"
                  onChangeText={setNewPassword}
                  value={newPassword}
                />

                <S.Divider />

                <PasswordInput
                  iconName="lock"
                  placeholder="Repetir senha"
                  onChangeText={setNewPasswordConfirm}
                  value={newPasswordConfirm}
                />
              </S.Section>
            )}

            <S.Divider />

            <Button
              title="Salvar alterações"
              onPress={
                option === 'dataEdit'
                  ? handleUpdateProfile
                  : handleUpdatePassword
              }
            />
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
