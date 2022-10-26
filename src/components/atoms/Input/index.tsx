import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {COLORS, RADIUS, SIZE, TYPE} from '../../../theme';

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
        left={<TextInput.Icon name={leftIcon} />}
        right={
          secureTextEntry ? (
            <TextInput.Icon
              name={passwordVisible ? 'eye-off' : 'eye'}
              onPress={() => setPasswordVisible(!passwordVisible)}
              color={passwordVisible ? COLORS.warning : COLORS.background.black}
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
    fontFamily: TYPE.montserratRegular,
    fontSize: SIZE.font14,
    color: COLORS.primary,
  },
});
