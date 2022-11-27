import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import {Gap} from '../../atoms';
import {COLORS, FONTS, SIZE} from '../../../theme';

type Props = {
  label: string;
  onPress: () => void;
  source: any;
};

function UploadPhoto({label, source, onPress}: Props) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Gap height={4} />
      {source === '' ? (
        <TouchableOpacity style={styles.parent} onPress={onPress}>
          <Icon name="plus" size={20} color={COLORS.disable.background} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.parent2} onPress={onPress}>
          <FastImage source={source} style={styles.image} />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    width: 96,
    height: 96,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: COLORS.disable.background,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: SIZE.font14,
    fontFamily: FONTS.primary[400],
    color: COLORS.text.subtitle,
  },

  parent2: {
    width: 96,
    height: 96,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default UploadPhoto;
