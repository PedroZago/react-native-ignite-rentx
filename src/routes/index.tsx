import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { SplashRoutes } from './splash.routes';

const Routes = () => {
  return (
    <NavigationContainer>
      <SplashRoutes />
    </NavigationContainer>
  );
};

export default Routes;
