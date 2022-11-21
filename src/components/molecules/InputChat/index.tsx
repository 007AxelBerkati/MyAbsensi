import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS, FONTS} from '../../../theme';
import {CustomButton} from '../../atoms';

type InputChatProps = {
  value: string;
  onChangeText: (value: string) => void;
  onButtonPress: () => void;
  targetChat: any;
};

export default function InputChat({
  value,
  onChangeText,
  onButtonPress,
  targetChat,
}: InputChatProps) {
  // useEffect(() => {
  //   console.log('targetChat', targetChat);
  // }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={`Tulis Pesan Untuk ${targetChat?.fullname}`}
        value={value}
        onChangeText={onChangeText}
      />
      <CustomButton
        type={'Icon-send'}
        onPress={onButtonPress}
        disable={value.length < 1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: COLORS.background.primary,
  },
  input: {
    backgroundColor: COLORS.disable.background,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontFamily: FONTS.primary.normal,
    fontSize: 14,
    maxHeight: 45,
    color: COLORS.text.primary,
  },
});
