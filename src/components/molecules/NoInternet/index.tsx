import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZE} from '../../../theme';

export default function NoInternet() {
  return (
    <View style={styles.container}>
      <Icon name="cloud-offline" size={17} color={COLORS.background.primary} />
      <Text style={styles.infoText}>No Connection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.warning,
  },
  infoText: {
    fontFamily: FONTS.primary[600],
    fontSize: SIZE.font16,
    color: COLORS.text.secondary,
    marginLeft: 8,
  },
});
