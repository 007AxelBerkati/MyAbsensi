import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, RADIUS, SIZE, windowWidth} from '../../../theme';
import FastImage from 'react-native-fast-image';

type Props = {
  title: string;
  name: string;
  photo: string;
};

const CardProfile = ({title, name, photo}: Props) => {
  return (
    <View style={styles.containerProfile}>
      <View style={styles.profileDesc}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{name}</Text>
      </View>
      <FastImage source={photo} style={styles.photoProfile} />
    </View>
  );
};

export default CardProfile;

const styles = StyleSheet.create({
  containerProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },

  photoProfile: {
    height: 50,
    width: 50,
    borderRadius: RADIUS.large,
  },

  profileDesc: {
    flexDirection: 'column',
  },

  title: {
    fontSize: SIZE.font20,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.primary,
  },

  text: {
    fontFamily: FONTS.primary[800],
    fontSize: SIZE.font16,
    color: COLORS.text.primary,
  },
});
