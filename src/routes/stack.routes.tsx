import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CarDetails } from '../screens/CarDetails';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { SchedulingDetails } from '../screens/SchedulingDetails';

const { Navigator, Screen } = createNativeStackNavigator();

export const StackRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />

      <Screen name="CarDetails" component={CarDetails} />

      <Screen name="Scheduling" component={Scheduling} />

      <Screen name="SchedulingComplete" component={SchedulingComplete} />

      <Screen name="SchedulingDetails" component={SchedulingDetails} />

      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
};
