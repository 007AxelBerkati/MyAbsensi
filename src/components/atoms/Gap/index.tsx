import React from 'react';
import {View} from 'react-native';

type GapProps = {
  height?: number;
  width?: number;
};

export default function Gap({height, width}: GapProps) {
  return <View style={{height, width}} />;
}
