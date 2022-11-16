import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {COLORS, FONTS, RADIUS, SIZE} from '../../../theme';

type input = {
  onChangeText: (text: string) => void;
  value: string;
  placeholder?: string;
  label?: string;
  onBlur?: any;
  cannotEdited?: boolean;
  secureTextEntry?: boolean;
  leftIcon?: string;
  props?: any;
  color?: string;
};

function Input({
  onChangeText,
  value,
  label,
  placeholder,
  onBlur,
  cannotEdited,
  secureTextEntry,
  leftIcon,
  color,
  ...props
}: input) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  return (
    <View style={{borderRadius: RADIUS.xLarge}}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        label={label}
        onBlur={onBlur}
        placeholder={placeholder}
        mode="outlined"
        activeOutlineColor={COLORS.secondary}
        outlineColor={
          cannotEdited ? COLORS.border.primary : COLORS.border.secondary
        }
        style={styles.input}
        secureTextEntry={secureTextEntry ? passwordVisible : false}
        left={<TextInput.Icon name={leftIcon} color={color} />}
        right={
          secureTextEntry ? (
            <TextInput.Icon
              name={passwordVisible ? 'eye-off' : 'eye'}
              onPress={() => setPasswordVisible(!passwordVisible)}
              color={passwordVisible ? COLORS.warning : COLORS.text.tertiary}
            />
          ) : null
        }
        {...props}
      />
    </View>
  );
}

export default memo(Input);

const styles = StyleSheet.create({
  input: {
    fontFamily: FONTS.primary[400],
    fontSize: SIZE.font14,
    color: COLORS.primary,
  },
});
