import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dashboard, Login, SplashScreen} from '../pages';
import React from 'react';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      {/* <Stack.Screen name="Geo" component={Geo} /> */}
    </Stack.Navigator>
  );
}

export default Router;
