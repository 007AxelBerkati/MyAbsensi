import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS, RADIUS, SIZE} from '../../../theme';
import BtnIconSend from './BtnIconSend';
import FloatingButton from './FloatingButton';
import IconButton from './IconButton';
import IconOnly from './IconOnly';

type CustomButtonType = {
  type: string;
  title?: string;
  onPress: () => void;
  icon: string;
  disable: boolean;
  nonButton: boolean;
  label: string;
  style: object;
  styleText?: object;
  color: string;
};

function CustomButton({
  type,
  title,
  onPress,
  icon,
  disable,
  nonButton,
  label,
  style,
  styleText,
  color,
}: CustomButtonType) {
  if (type === 'icon-button') {
    return (
      <IconButton
        onPress={onPress}
        nonButton={nonButton}
        label={label}
        style={style}
      />
    );
  }
  if (type === 'floating-btn') {
    return <FloatingButton icon={icon} onPress={onPress} color={color} />;
  }

  if (type === 'icon-only') {
    return <IconOnly icon={icon} onPress={onPress} />;
  }

  if (type === 'Icon-send') {
    return <BtnIconSend disable={disable} onPress={onPress} />;
  }

  return (
    <TouchableOpacity
      style={
        !disable
          ? {...container(type), ...style}
          : {...styles.disableBG, ...style}
      }
      onPress={onPress}
      disabled={disable}>
      <Text
        style={!disable ? {...text(type), ...styleText} : styles.disableText}>
        {title}
      </Text>
      {icon && (
        <Icon
          name={icon}
          size={24}
          color={COLORS.background.primary}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
}

export default memo(CustomButton);

const container = (type: string): ViewStyle => ({
  backgroundColor:
    type === 'secondary'
      ? COLORS.button.secondary.background
      : COLORS.button.primary.background,
  paddingVertical: 10,
  borderRadius: RADIUS.large,
  borderWidth: 1,
  borderColor:
    type === 'secondary'
      ? COLORS.button.secondary.border
      : COLORS.button.primary.border,
});

const text = (type: string): TextStyle => ({
  fontFamily: FONTS.primary[600],
  textAlign: 'center',
  color:
    type === 'secondary'
      ? COLORS.button.secondary.text
      : COLORS.button.primary.text,
  fontSize: SIZE.font16,
});

const styles = StyleSheet.create({
  disableText: {
    fontSize: SIZE.font16,
    fontFamily: FONTS.primary[600],
    color: COLORS.disable.text,
    textAlign: 'center',
  },

  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  disableBG: {
    paddingVertical: 10,
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.disable.background,
  },
});

CustomButton.defaultProps = {
  type: 'primary',
  title: 'Button',
  onPress: () => {},
  icon: '',
  disable: false,
  nonButton: false,
  label: '',
  style: {},
  styleText: {},
  color: '',
};
