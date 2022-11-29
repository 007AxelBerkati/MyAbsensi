import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS, FONTS, RADIUS, SIZE} from '../../../theme';

type Props = {
  type: string;
  text: string;
};

const BadgeStatus = ({type, text}: Props) => {
  return (
    <View style={badgeStatus(type)}>
      <Text style={styles.labelStatus}>{text}</Text>
    </View>
  );
};

export default BadgeStatus;

const badgeStatus = (type: string): ViewStyle => ({
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: RADIUS.large,
  backgroundColor:
    type === 'pending'
      ? COLORS.background.tertiary
      : type === 'accepted'
      ? COLORS.success
      : type === 'declined'
      ? COLORS.warning
      : COLORS.background.tertiary,
  width: 80,
});

const styles = StyleSheet.create({
  labelStatus: {
    fontSize: SIZE.font14,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});
