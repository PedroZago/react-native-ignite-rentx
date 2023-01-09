import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useAuth } from '../hooks/auth';
import { Splash } from '../screens/Splash';
import { AppStackRoutes } from './app.stack.routes';
import { AuthRoutes } from './auth.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export const SplashRoutes = () => {
  const { user } = useAuth();

  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />

      <Screen
        name="AppStacks"
        component={user.id ? AppStackRoutes : AuthRoutes}
      />
    </Navigator>
  );
};
