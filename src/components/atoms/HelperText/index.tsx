import React, {memo} from 'react';
import {Text} from 'react-native';
import {COLORS, SIZE, TYPE} from '../../../theme';

type HelperTextProps = {
  text: string;
};

function HelperText({text}: HelperTextProps) {
  return (
    <Text
      style={{
        fontFamily: TYPE.montserratRegular,
        fontSize: SIZE.font10,
        color: COLORS.warning,
      }}>
      {text}
    </Text>
  );
}

export default memo(HelperText);
