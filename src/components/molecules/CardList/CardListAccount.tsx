import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZE} from '../../../theme';

type CardListAccountProps = {
  title: string;
  onPress: () => void;
  name: string;
};

function CardListAccount({onPress, name, title}: CardListAccountProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={name} size={25} color={COLORS.background.secondary} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default CardListAccount;

CardListAccount.defaultProps = {
  title: 'Title',
  name: 'user',
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.primary,
    flexDirection: 'row',
  },

  text: {
    marginLeft: 20,
    fontSize: SIZE.font12,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.primary,
  },
});
