import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS, SIZE, windowWidth} from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  title: string;
  onPress: () => void;
  icon: string;
};

const CardService = ({title, onPress, icon}: Props) => {
  return (
    <View style={styles.containerService}>
      <TouchableOpacity style={styles.buttonService} onPress={onPress}>
        <Icon name={icon} color={COLORS.background.tertiary} size={25} />
      </TouchableOpacity>
      <Text style={styles.titleService}>{title}</Text>
    </View>
  );
};

export default CardService;

const styles = StyleSheet.create({
  buttonService: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.border.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleService: {
    fontSize: SIZE.font14,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.primary,
    marginTop: 8,
  },

  containerService: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
