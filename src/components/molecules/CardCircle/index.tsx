import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {COLORS, FONTS, SIZE, windowHeight, windowWidth} from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  title: string;
  icon: string;
  onPress: () => void;
  absen: string;
};

function CardCircle({title, icon, onPress, absen}: Props) {
  return (
    <Pressable style={circleButton(absen)} onPress={onPress}>
      <Icon name={icon} size={windowWidth / 5} color={COLORS.primary} />
      <Text style={styles.absen}>{title}</Text>
    </Pressable>
  );
}
export default CardCircle;

const circleButton = (absen: string): ViewStyle => ({
  width: windowWidth * 0.5,
  height: windowWidth * 0.5,
  borderRadius: (windowWidth * 0.5) / 2,
  backgroundColor:
    absen === 'keluar'
      ? COLORS.warning
      : absen === 'alreadyPresence'
      ? COLORS.background.disable
      : COLORS.background.tertiary,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: COLORS.background.black,
  elevation: 18,
  shadowOpacity: 0.5,
  shadowRadius: 10,
});

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginHorizontal: 16,
  },
  hourMinutes: {
    fontSize: SIZE.font32,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.primary,
  },

  date: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.subtitle,
  },

  cardTime: {
    flexDirection: 'row',
  },

  cardAbsen: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  absen: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.secondary,
  },
});
