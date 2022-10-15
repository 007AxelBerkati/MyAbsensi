import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {COLORS, RADIUS, SIZE, TYPE} from 'theme';

type input = {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  label: string;
  onBlur: any;
  cannotEdited: boolean;
  secureTextEntry: boolean;
  leftIcon: string;
  props: any;
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
        activeOutlineColor={COLORS.grey2}
        outlineColor={cannotEdited ? COLORS.grey8 : COLORS.grey1}
        style={styles.input}
        secureTextEntry={secureTextEntry ? passwordVisible : false}
        left={<TextInput.Icon name={leftIcon} />}
        right={
          secureTextEntry ? (
            <TextInput.Icon
              name={passwordVisible ? 'eye-off' : 'eye'}
              onPress={() => setPasswordVisible(!passwordVisible)}
              color={passwordVisible ? COLORS.warning : COLORS.black}
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
    fontFamily: TYPE.montserratMedium,
    fontSize: SIZE.font16,
    color: COLORS.primary,
  },
});
