import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../pages';
import React from 'react';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator
      initialRouteName="Geo"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Geo" component={Geo} /> */}
    </Stack.Navigator>
  );
}

export default Router;
