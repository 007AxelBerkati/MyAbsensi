import {StyleSheet, View, Image, StatusBar, Text} from 'react-native';
import React, {useEffect} from 'react';
import {IconsApp2, Splash} from '../../assets';
import LottieView from 'lottie-react-native';
import {COLORS, SIZE, FONTS, windowHeight, windowWidth} from '../../theme';

function SplashScreen({navigation}: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
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
    backgroundColor: COLORS.background.secondary,
  },

  text: {
    fontSize: SIZE.font40,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.secondary,
    position: 'absolute',
    alignSelf: 'center',
  },
});
