import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {COLORS} from 'theme';
import Router from './Stack';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white,
  },
};

const Navigation = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Router />
    </NavigationContainer>
  );
};

export default Navigation;
