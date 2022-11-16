import React, {memo} from 'react';
import {Text} from 'react-native';
import {COLORS, FONTS, SIZE} from '../../../theme';

type HelperTextProps = {
  text: string;
};

function HelperText({text}: HelperTextProps) {
  return (
    <Text
      style={{
        fontFamily: FONTS.primary[400],
        fontSize: SIZE.font10,
        color: COLORS.warning,
      }}>
      {text}
    </Text>
  );
}

export default memo(HelperText);
