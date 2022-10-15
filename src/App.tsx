import Navigation from 'navigations';
import React from 'react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {COLORS} from 'theme';

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

export default App;
