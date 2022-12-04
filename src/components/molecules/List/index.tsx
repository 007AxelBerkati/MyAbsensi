import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  IconEditProfile,
  IconHelp,
  IconLanguage,
  IconNext,
  IconRate,
} from '../../../assets';
import {COLORS, FONTS, SIZE, windowHeight} from '../../../theme';

type ListProps = {
  profile: any;
  name: string;
  desc?: string;
  type?: any;
  onPress: () => void;
  chat?: any;
  icon?: string;
  date?: string;
  time?: string;
};

export default function List({
  profile,
  name,
  chat,
  type,
  onPress,
  icon,
  desc,
  time,
  date,
}: ListProps) {
  const Icon = () => {
    if (icon === 'edit-profile') {
      return <IconEditProfile />;
    }
    if (icon === 'language') {
      return <IconLanguage />;
    }
    if (icon === 'rate') {
      return <IconRate />;
    }
    if (icon === 'help') {
      return <IconHelp />;
    }
    return <IconEditProfile />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? (
        <Icon />
      ) : (
        <FastImage source={profile} style={styles.imageStyle} />
      )}
      <View style={styles.titleWrapper}>
        <Text style={styles.names}>{name}</Text>
        <Text style={styles.chat} numberOfLines={1}>
          {chat}
        </Text>
      </View>
      {type === 'next' && <IconNext />}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.time}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: COLORS.border.primary,
    borderBottomWidth: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleWrapper: {
    flex: 1,
    marginLeft: 16,
  },
  imageStyle: {
    width: windowHeight * 0.07,
    height: windowHeight * 0.07,
    borderRadius: (windowHeight * 0.07) / 4,
    marginRight: 12,
  },

  names: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[600],
    color: COLORS.text.primary,
  },

  chat: {
    fontSize: SIZE.font14,
    fontFamily: FONTS.primary[400],
    color: COLORS.text.subtitle,
    textTransform: 'capitalize',
  },

  time: {
    color: COLORS.text.subtitle,
    fontSize: 12,
    fontFamily: FONTS.primary[600],
  },
});

// List.defaultProps = {
//   type: '',
//   icon: '',
//   name: '',
//   desc: '',
//   chat: '',
//   time: '',
//   date: '',
// };
