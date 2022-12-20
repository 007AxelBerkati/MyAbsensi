import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS, FONTS, SIZE, windowHeight} from '../../../theme';
import DarkProfile from './DarkProfile';
import DashboardProfile from './DashboardProfile';

type HeadersProps = {
  title: string;
  onPress: () => void;
  type?: string;
  desc: string;
  photo?: any;
  pressFilter?: () => void;
};

function Headers({
  onPress,
  title,
  type,
  desc,
  photo,
  pressFilter,
}: HeadersProps) {
  if (type === 'dark-profile') {
    return (
      <DarkProfile onPress={onPress} title={title} desc={desc} photo={photo} />
    );
  }

  if (type === 'dashboard-profile') {
    return <DashboardProfile onPress={onPress} title={title} photo={photo} />;
  }
  if (type === 'back-title') {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPress}
          style={{position: 'absolute', left: 0}}>
          <Icon name="arrow-left" size={24} color={COLORS.background.black} />
        </TouchableOpacity>
        <Text style={styles.titleBack}>{title}</Text>
        {pressFilter && (
          <TouchableOpacity
            onPress={pressFilter}
            style={{
              position: 'absolute',
              right: 0,
              padding: 10,
              borderRadius: 10,
              backgroundColor: COLORS.background.tertiary,
            }}>
            <Icon name="filter" size={24} color={COLORS.background.primary} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (type === 'back') {
    return (
      <TouchableOpacity style={styles.container2} onPress={onPress}>
        <Icon name="arrow-left" size={24} color={COLORS.background.black} />
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container2}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default memo(Headers);

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.primary[800],
    fontSize: SIZE.font24,
    color: COLORS.text.primary,
  },

  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * 0.03,
  },

  container2: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginTop: windowHeight * 0.03,
  },

  titleBack: {
    fontFamily: FONTS.primary[800],
    fontSize: SIZE.font16,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
});

Headers.defaultProps = {
  type: 'default',
  desc: '',
  photo: '',
  onPress: () => {},
};
