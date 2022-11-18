import React from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {IconSendDark, IconSendLight} from '../../../assets';
import {COLORS} from '../../../theme';

type BtnIconSendProps = {
  disable: boolean;
  onPress: () => void;
};

export default function BtnIconSend({disable, onPress}: BtnIconSendProps) {
  if (disable) {
    return (
      <View style={{...container(disable)}}>
        <IconSendDark />
      </View>
    );
  }
  return (
    <TouchableOpacity style={container(disable)} onPress={onPress}>
      <IconSendLight />
    </TouchableOpacity>
  );
}

const container = (disable: boolean): ViewStyle => ({
  backgroundColor: disable
    ? COLORS.disable.background
    : COLORS.background.tertiary,
  height: 46,
  width: 46,
  paddingRight: 3,
  paddingTop: 3,
  paddingLeft: 8,
  paddingBottom: 8,
  borderRadius: 15,
  borderWidth: 1,
  borderColor: COLORS.border.primary,
});
