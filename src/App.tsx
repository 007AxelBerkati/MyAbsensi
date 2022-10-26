import React from 'react';
import {StatusBar} from 'react-native';
import CodePush from 'react-native-code-push';
import FlashMessage from 'react-native-flash-message';
import Navigation from './navigations';
import {COLORS} from './theme';

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
      <FlashMessage position="top" />
    </>
  );
};
const App = () => {
  return <MainApp />;
};

export default CodePush(codePushOptions)(App);
