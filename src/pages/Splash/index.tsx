import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Splash} from '../../assets';
import {COLORS, FONTS, SIZE, windowHeight, windowWidth} from '../../theme';
import auth from '@react-native-firebase/auth';
import {getDataSecure} from '../../plugins';
import {RootState, useAppSelector} from '../../reduxx';

function SplashScreen({navigation}: any) {
  const {isLogin} = useAppSelector((state: RootState) => state.dataAuth);
  useEffect(() => {
    setTimeout(() => {
      isLogin ? navigation.replace('Dashboard') : navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <LottieView
        source={Splash}
        autoPlay
        loop
        style={{width: windowWidth * 0.5, height: windowHeight * 0.5}}
      />
      <Text style={styles.text}>My Absensi</Text>
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.tertiary,
  },

  text: {
    fontSize: SIZE.font40,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.secondary,
    position: 'absolute',
    alignSelf: 'center',
  },
});
