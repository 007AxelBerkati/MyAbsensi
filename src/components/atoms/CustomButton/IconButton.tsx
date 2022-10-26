import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, RADIUS} from '../../../theme';

type IconsType = {
  label: string;
};

type IconButtonType = {
  onPress: () => void;
  nonButton: boolean;
  label: string;
  style: object;
};

function Icons({label}: IconsType) {
  if (label === 'BackButton') {
    return <Icon name="arrow-back" size={24} color={COLORS.background.black} />;
  }
  return <Icon name="fingerprint" size={25} color={COLORS.secondary} />;
}
function IconButton({onPress, nonButton, label, style}: IconButtonType) {
  return (
    <View>
      {nonButton ? (
        <View style={styles.iconNonButton}>
          <View style={styles.icon}>
            <Icons label={label} />
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={{...styles.iconWrapper, ...style}}
          onPress={onPress}>
          <View style={styles.icon}>
            <Icons label={label} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 24 / 2,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    elevation: 6,
  },
  icon: {
    alignSelf: 'center',
    borderRadius: RADIUS.medium,
  },
  iconNonButton: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: COLORS.secondary,
    opacity: 0.8,
    justifyContent: 'center',
  },
});
