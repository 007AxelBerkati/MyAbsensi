import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import {COLORS} from '../../../theme';

type FloatingButtonType = {
  onPress: () => void;
  icon: string;
  color: string;
};

function FloatingButton({onPress, icon, color}: FloatingButtonType) {
  return <FAB style={styles.fab} icon={icon} onPress={onPress} color={color} />;
}

export default memo(FloatingButton);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 50,
    backgroundColor: COLORS.primary,
  },
});
