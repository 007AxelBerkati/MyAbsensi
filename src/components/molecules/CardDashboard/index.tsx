import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, RADIUS, SIZE, windowWidth} from '../../../theme';
import {BcDashAdmin} from '../../../assets';

type Props = {
  type?: string;
  text?: string;
  title?: string;
  onPress?: () => void;
  hadir?: number;
  user?: number;
  belumHadir?: number;
};

const CardDashboard = ({
  type,
  text,
  title,
  onPress,
  hadir,
  belumHadir,
  user,
}: Props) => {
  if (type === 'maps') {
    return (
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          style={styles.image}
          imageStyle={{borderRadius: RADIUS.medium}}
          source={{
            uri: 'https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5f7db426b676b95755fb2844_Group%20805.jpg',
          }}>
          <Text style={styles.textMaps}>{text}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  if (type === 'admin') {
    return (
      <View style={styles.cardAdmin}>
        <ImageBackground source={BcDashAdmin} style={{padding: 16}}>
          <Text style={styles.textTitleAdmin}>{title}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginBottom: 16,
            }}>
            <Text style={styles.totalHadir}>{hadir}</Text>
            <Text style={styles.totalUser}>/ {user}</Text>
          </View>
          <Text style={styles.totalBelumHadir}>
            {belumHadir} orang belum hadir
          </Text>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.textTitle}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default CardDashboard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.border.primary,
    borderRadius: 10,
    padding: 16,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.4,
  },

  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.4,
    flex: 1,
    borderRadius: 10,
    padding: 16,
  },

  textMaps: {
    fontSize: SIZE.font12,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.primary,
  },

  textTitle: {
    fontSize: SIZE.font12,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.subtitle,
  },

  text: {
    fontSize: SIZE.font20,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.primary,
  },

  cardAdmin: {
    borderRadius: RADIUS.medium,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border.primary,
  },

  textTitleAdmin: {
    fontSize: SIZE.font14,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.secondary,
    marginTop: windowWidth * 0.1,
  },

  totalHadir: {
    fontSize: SIZE.font44,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.secondary,
  },

  totalUser: {
    fontSize: SIZE.font20,
    fontFamily: FONTS.primary[800],
    color: COLORS.text.secondary,
  },

  totalBelumHadir: {
    fontSize: SIZE.font14,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.secondary,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
