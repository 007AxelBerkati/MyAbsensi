import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS, FONTS, RADIUS, SIZE} from '../../../theme';

type Props = {
  title: string;
  name: string;
  photo: any;
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
    textTransform: 'uppercase',
    color: COLORS.text.primary,
  },
});
