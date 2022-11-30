import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, RADIUS, SIZE, windowWidth} from '../../../theme';

type Props = {
  type?: string;
  text: string;
  title?: string;
  onPress?: () => void;
};

const CardDashboard = ({type, text, title, onPress}: Props) => {
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
});
