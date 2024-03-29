import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZE} from '../../../theme';

type LinkComponentProps = {
  title: string;
  size?: number;
  color?: string;
  onPress: () => void;
  disable?: boolean;
  style?: any;
};

function LinkComponent({title, onPress, disable, style}: LinkComponentProps) {
  return (
    <TouchableOpacity onPress={onPress} style={style} disabled={disable}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default memo(LinkComponent);

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.primary[600],
    fontSize: SIZE.font12,
    color: COLORS.text.tertiary,
    textAlign: 'center',
  },
});
