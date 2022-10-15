import propTypes from 'prop-types';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {borderRadius, colors, fonts, fontSize} from '../../../utils';
import FloatingButton from './FloatingButton';
import IconButton from './IconButton';

type CustomButton = {
  type: string;
  title: string;
  onPress: () => void;
  icon: string;
  disable: boolean;
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
  testID,
}) {
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
    return <FloatingButton icon={icon} onPress={onPress} />;
  }

  return (
    <TouchableOpacity
      style={
        !disable
          ? {...styles.container(type), ...style}
          : {...styles.disableBG, ...style}
      }
      onPress={onPress}
      testID={testID}
      disabled={disable}>
      <Text
        style={
          !disable ? {...styles.text(type), ...styleText} : styles.disableText
        }>
        {title}
      </Text>
      {icon && (
        <Icon
          name={icon}
          size={24}
          color={colors.background.primary}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
}

export default memo(CustomButton);

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor:
      type === 'secondary'
        ? colors.button.secondary.background
        : colors.button.primary.background,
    paddingVertical: 10,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor:
      type === 'secondary'
        ? colors.button.secondary.border
        : colors.button.primary.border,
  }),
  disableBG: {
    paddingVertical: 10,
    borderRadius: borderRadius.large,
    backgroundColor: colors.disable.background,
  },
  disableText: {
    fontSize: fontSize.large,
    fontFamily: fonts.Poppins.Regular,
    color: colors.disable.text,
    textAlign: 'center',
  },
  text: type => ({
    fontSize: fontSize.large,
    fontFamily: fonts.Poppins.Regular,
    textAlign: 'center',
    color:
      type === 'secondary'
        ? colors.button.secondary.text
        : colors.button.primary.text,
  }),

  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

CustomButton.propTypes = {
  type: propTypes.string,
  title: propTypes.string,
  onPress: propTypes.func.isRequired,
  icon: propTypes.string,
  disable: propTypes.bool,
  nonButton: propTypes.bool,
  label: propTypes.string,
  style: propTypes.shape({}),
  styleText: propTypes.shape({}),
};

CustomButton.defaultProps = {
  title: undefined,
  type: 'primary',
  icon: null,
  disable: false,
  nonButton: false,
  label: null,
  style: {},
  styleText: {},
};
