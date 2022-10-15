import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PADDING} from 'theme';

export const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Hallo</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: PADDING.large,
  },
});
