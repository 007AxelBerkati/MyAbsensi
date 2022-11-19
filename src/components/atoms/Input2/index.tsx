/* eslint-disable react/jsx-props-no-spreading */
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {COLORS, FONTS, SIZE} from '../../../theme';

function Input({
  onChangeText,
  value,
  label,
  onBlur,
  cannotEdited,
  onPressIn,
  rightIcon,
  ...props
}: any) {
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        label={label}
        onBlur={onBlur}
        mode="outlined"
        activeOutlineColor={COLORS.lineTextInput}
        outlineColor={
          cannotEdited ? COLORS.disable.background : COLORS.outlineInput
        }
        style={{...styles.input, ...props.style}}
        {...props}
        right={
          rightIcon ? (
            <TextInput.Icon
              name={rightIcon}
              onPress={onPressIn}
              color={COLORS.text.tertiary}
            />
          ) : null
        }
      />
    </View>
  );
}

export default memo(Input);

const styles = StyleSheet.create({
  input: {
    fontFamily: FONTS.primary[400],
    fontSize: SIZE.font14,
    color: COLORS.text.primary,
  },
});
