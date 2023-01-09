import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CarDetails } from '../screens/CarDetails';
import { Confirmation } from '../screens/Confirmation';
// import { Home } from '../screens/Home';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { AppTabRoutes } from './app.tab.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppStackRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="AppTabRoutes" component={AppTabRoutes} />

      <Screen name="CarDetails" component={CarDetails} />

      <Screen name="Scheduling" component={Scheduling} />

      <Screen name="Confirmation" component={Confirmation} />

      <Screen name="SchedulingDetails" component={SchedulingDetails} />
    </Navigator>
  );
};
