import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  IconEditProfile,
  IconHelp,
  IconLanguage,
  IconNext,
  IconRate,
} from '../../../assets';
import {COLORS, FONTS, SIZE} from '../../../theme';

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
    <Pressable
      style={styles.container as unknown as StyleProp<ViewStyle>}
      onPress={onPress}>
      {icon ? <Icon /> : <Image source={profile} style={styles.imageStyle} />}
      <View style={styles.titleWrapper}>
        <Text style={styles.names}>{name}</Text>
        <Text style={styles.chat}>{chat}</Text>
        <Text style={styles.chat}>{desc}</Text>
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
    </Pressable>
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
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
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

List.defaultProps = {
  type: '',
  icon: '',
  name: '',
  desc: '',
  chat: '',
  time: '',
  date: '',
};
