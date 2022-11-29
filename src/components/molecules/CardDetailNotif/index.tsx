import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLORS, FONTS, SIZE, windowHeight, windowWidth} from '../../../theme';

type Props = {
  title: string;
  text: string;
  source: any;
};

const CardDetailNotif = ({title, text, source}: Props) => {
  if (source !== null) {
    return (
      <View
        style={{
          borderBottomColor: COLORS.border.primary,
          borderBottomWidth: 1,
          paddingBottom: 16,
          marginBottom: 16,
        }}>
        <Text style={styles.title}>{title}</Text>
        <FastImage source={source} style={styles.image} />
      </View>
    );
  }

  return (
    <View
      style={{
        borderBottomColor: COLORS.border.primary,
        borderBottomWidth: 1,
        paddingBottom: 16,
        marginBottom: 16,
      }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default CardDetailNotif;

const styles = StyleSheet.create({
  title: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.subtitle,
    marginBottom: 8,
  },

  text: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.primary,
  },

  image: {
    height: windowHeight * 0.15,
    width: windowWidth * 0.3,
  },
});

CardDetailNotif.defaultProps = {
  title: 'Title',
  text: 'Text',
  source: null,
};
