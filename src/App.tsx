import React from 'react';
import {StatusBar} from 'react-native';
import CodePush from 'react-native-code-push';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Loading} from './components';
import Navigation from './navigations';
import {Persistore, RootState, Store} from './reduxx';
import {COLORS, RADIUS, windowHeight, windowWidth} from './theme';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

const MainApp = () => {
  const {loading} = useSelector((state: RootState) => state.dataGlobal);
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
      {loading && <Loading />}
    </>
  );
};
const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistore}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default CodePush(codePushOptions)(App);
