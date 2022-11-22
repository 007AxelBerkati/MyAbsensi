import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {RootState, setOnline, useAppDispatch} from '../../../reduxx';
import {COLORS, FONTS, SIZE} from '../../../theme';
import {IconButton} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

export default function NoInternet({onPress}: any) {
  return (
    <View style={styles.container}>
      <Icon name="cloud-offline" size={17} color={COLORS.background.primary} />
      <Text style={styles.infoText}>No Connection</Text>
      <IconButton icon="camera" onPress={onPress} />
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
