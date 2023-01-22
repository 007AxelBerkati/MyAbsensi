import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZE} from '../../../theme';

type Props = {
  type: string;
};

export default function Loading({type}: Props) {
  if (type === 'full') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.background.secondary} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={COLORS.background.secondary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: COLORS.loadingBackground,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONTS.primary[800],
    fontSize: SIZE.font16,
    color: COLORS.text.primary,
    marginTop: 12,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },
});
