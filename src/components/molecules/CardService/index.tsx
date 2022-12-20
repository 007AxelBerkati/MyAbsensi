import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS, SIZE} from '../../../theme';

type Props = {
  title: string;
  onPress?: () => void;
  icon: string;
  clock?: string;
};

const CardService = ({title, onPress, icon, clock}: Props) => {
  return (
    <View style={styles.containerService}>
      {onPress ? (
        <TouchableOpacity style={styles.buttonService} onPress={onPress}>
          <Icon name={icon} color={COLORS.background.tertiary} size={25} />
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonService}>
          <Icon name={icon} color={COLORS.background.tertiary} size={25} />
        </View>
      )}
      {clock ? <Text style={styles.clock}>{clock}</Text> : null}
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
    borderColor: COLORS.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  titleService: {
    fontSize: SIZE.font12,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.subtitle,
  },

  containerService: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clock: {
    fontSize: SIZE.font20,
    color: COLORS.text.primary,
    fontFamily: FONTS.primary[800],
  },
});
