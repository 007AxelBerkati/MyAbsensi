import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AllUser,
  Chatting,
  Dashboard,
  EditProfile,
  ForgetPass,
  InformasiProfile,
  Login,
  SplashScreen,
} from '../pages';
import React, {useEffect, useState} from 'react';
import MainApp from './MainApp';
import NetInfo from '@react-native-community/netinfo';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={MainApp} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="InformasiProfile" component={InformasiProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AllUser" component={AllUser} />
      <Stack.Screen name="Chatting" component={Chatting} />
      {/* <Stack.Screen name="Geo" component={Geo} /> */}
    </Stack.Navigator>
  );
}

export default Router;
