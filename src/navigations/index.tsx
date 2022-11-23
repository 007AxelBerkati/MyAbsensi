import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {COLORS} from '../theme';
import Router from './Stack';

const MyTheme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background.primary,
  },
};

const Navigation = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Router />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default Navigation;
