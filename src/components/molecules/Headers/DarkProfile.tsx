import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../../../theme';
import {CustomButton} from '../../atoms';

type DarkProfileProps = {
  onPress: () => void;
  title: string;
  desc: string;
  photo: any;
};

export default function DarkProfile({
  onPress,
  title,
  photo,
  desc,
}: DarkProfileProps) {
  return (
    <View style={styles.container}>
      <CustomButton type="icon-only" icon="back-light" onPress={onPress} />
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <Image source={photo} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },

  avatar: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },

  name: {
    fontSize: 20,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: FONTS.primary[400],
    color: COLORS.text.secondary,
    marginTop: 6,
    textAlign: 'center',
  },
});