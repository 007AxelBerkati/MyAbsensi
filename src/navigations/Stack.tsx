import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  AllUser,
  Chatting,
  DetailRiwayat,
  EditProfile,
  ForgetPass,
  InformasiProfile,
  Login,
  Riwayat,
  SplashScreen,
} from '../pages';
import {RootState, useAppSelector} from '../reduxx';
import MainApp from './MainApp';

const Stack = createNativeStackNavigator();

function Router() {
  const {role} = useAppSelector((state: RootState) => state.dataAuth);
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
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
      <Stack.Screen name="Riwayat" component={Riwayat} />
      <Stack.Screen name="DetailRiwayat" component={DetailRiwayat} />
      {/* <Stack.Screen name="Geo" component={Geo} /> */}
    </Stack.Navigator>
  );
}

export default Router;
