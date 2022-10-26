import React from 'react';
import {StatusBar} from 'react-native';
import CodePush from 'react-native-code-push';
import FlashMessage from 'react-native-flash-message';
import Navigation from './navigations';
import {COLORS, RADIUS, windowHeight, windowWidth} from './theme';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

const MainApp = () => {
  return (
    <>
      <StatusBar
        backgroundColor={COLORS.background.secondary}
        barStyle="default"
      />
      <Navigation />
      <FlashMessage
        position="top"
        style={{
          marginTop: windowHeight * 0.05,
          width: windowWidth * 0.9,
          borderRadius: RADIUS.xLarge,
          alignSelf: 'center',
        }}
      />
    </>
  );
};
const App = () => {
  return <MainApp />;
};

export default CodePush(codePushOptions)(App);
