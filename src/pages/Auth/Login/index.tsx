import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Login = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text>{process.env.NODE_ENV}</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {},
});
