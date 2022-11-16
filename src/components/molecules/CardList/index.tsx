import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomButton} from '../../atoms';
import CardListAccount from './CardListAccount';
import {COLORS, FONTS, RADIUS, SIZE} from '../../../theme';
import FastImage from 'react-native-fast-image';

type CardListProps = {
  source?: string;
  onPress?: () => void;
  title?: string;
  kota?: string;
  name?: string;
  type?: string;
};

function CardList({source, onPress, kota, name, type, title}: CardListProps) {
  if (type === 'akun') {
    return <CardListAccount onPress={onPress} name={name} title={title} />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FastImage source={source} style={styles.image} />
        <View style={styles.desc}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.kota}>{kota}</Text>
        </View>
        {onPress !== undefined ? (
          <CustomButton
            type="secondary"
            title="Edit"
            style={styles.buttonContainer}
            styleText={styles.buttonTitle}
            onPress={onPress}
          />
        ) : null}
      </View>
    </View>
  );
}

export default CardList;

CardList.defaultProps = {
  source: '',
  onPress: () => {},
  title: '',
  kota: '',
  name: '',
  type: '',
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingBottom: 16,
    padding: 16,
    elevation: 4,
    backgroundColor: COLORS.background.primary,
    borderRadius: RADIUS.xLarge,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    marginRight: 16,
    width: 48,
    height: 48,
    borderRadius: RADIUS.large,
  },

  name: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.primary,
  },

  kota: {
    fontFamily: FONTS.primary[400],
    fontSize: SIZE.font14,
    color: COLORS.text.subtitle,
  },

  desc: {
    justifyContent: 'center',
  },

  buttonContainer: {
    paddingHorizontal: 12,
    marginLeft: 'auto',
    justifyContent: 'center',
    paddingVertical: 4,
  },

  buttonTitle: {
    fontSize: SIZE.font14,
    color: COLORS.text.primary,
    fontFamily: FONTS.primary[600],
  },
});
