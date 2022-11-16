import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS, FONTS, SIZE, windowHeight} from '../../../theme';

type HeadersProps = {
  title: string;
  onPress?: () => void;
  type?: string;
};

function Headers({onPress, title, type}: HeadersProps) {
  if (type === 'back-title') {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPress}
          style={{position: 'absolute', left: 0}}>
          <Icon name="arrow-left" size={24} color={COLORS.background.black} />
        </TouchableOpacity>
        <Text style={styles.titleBack}>{title}</Text>
      </View>
    );
  }

  if (type === 'back') {
    return (
      <TouchableOpacity style={styles.container2} onPress={onPress}>
        <Icon name="arrow-left" size={24} color={COLORS.background.black} />
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container2}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default memo(Headers);

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.primary[800],
    fontSize: SIZE.font24,
    color: COLORS.text.primary,
  },

  container: {
    flexDirection: 'row',
    height: 50,
    width: null,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * 0.03,
  },

  container2: {
    flexDirection: 'row',
    width: null,
    height: 50,
    alignItems: 'center',
    marginTop: windowHeight * 0.03,
  },

  titleBack: {
    fontFamily: FONTS.primary[800],
    fontSize: SIZE.font16,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
});
