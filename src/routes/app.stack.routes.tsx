import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CarDetails } from '../screens/CarDetails';
import { Confirmation } from '../screens/Confirmation';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Splash } from '../screens/Splash';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppStackRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Splash" component={Splash} />

      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />

      <Screen name="CarDetails" component={CarDetails} />

      <Screen name="Scheduling" component={Scheduling} />

      <Screen name="Confirmation" component={Confirmation} />

      <Screen name="SchedulingDetails" component={SchedulingDetails} />

      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
};
