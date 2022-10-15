import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomButton} from 'components';

const Login = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <CustomButton
        onPress={() => navigation.navigate('Home')}
        title="test"
        disable={false}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {},
});
