import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZE} from '../../../theme';

type IsMe = {
  text: string;
  date: string;
};

export default function IsMe({text, date}: IsMe) {
  return (
    <View style={styles.container}>
      <View style={styles.chatContent}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  chatContent: {
    backgroundColor: COLORS.cardLight,
    paddingRight: 18,
    padding: 12,
    maxWidth: '70%',
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  text: {
    fontSize: SIZE.font14,
    fontFamily: FONTS.primary.normal,
    color: COLORS.text.primary,
  },
  date: {
    fontFamily: FONTS.primary.normal,
    fontSize: SIZE.font12,
    color: COLORS.text.secondary,
  },
});
