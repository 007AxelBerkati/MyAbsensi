import React, {memo} from 'react';
import {Text} from 'react-native';
import {COLORS, SIZE, TYPE} from 'theme';

type HelperText = {
  text: string;
};

function HelperText({text}: HelperText) {
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
