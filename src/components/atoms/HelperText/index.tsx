import React from 'react';
import {Text} from 'react-native';
import {SIZE, TYPE} from 'theme';

type HelperText = {
  text: string;
};

function HelperText({text}: HelperText) {
  return (
    <Text style={{fontFamily: TYPE.montserratRegular, fontSize: SIZE.font10}}>
      {text}
    </Text>
  );
}

export default HelperText;
