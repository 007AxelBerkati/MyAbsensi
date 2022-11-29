import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS, FONTS, SIZE, windowHeight} from '../../../theme';

type OtherProps = {
  text: string;
  date: string;
  photo: any;
};

export default function Other({text, date, photo}: OtherProps) {
  return (
    <View style={styles.container}>
      <FastImage source={photo} style={styles.avatar} />
      <View>
        <View style={styles.chatContent}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingLeft: 16,
    flexDirection: 'row',
  },
  avatar: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 4,
    marginRight: 12,
  },
  chatContent: {
    backgroundColor: COLORS.primary,
    paddingRight: 18,
    padding: 12,
    maxWidth: '80%',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  text: {
    fontSize: SIZE.font14,
    fontFamily: FONTS.primary.normal,
    color: COLORS.text.primary,
  },
  date: {
    fontFamily: FONTS.primary.normal,
    fontSize: SIZE.font12,
    color: COLORS.text.subtitle,
  },
});
