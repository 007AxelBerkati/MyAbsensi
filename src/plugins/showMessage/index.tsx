import {showMessage} from 'react-native-flash-message';
import {COLORS} from '../../theme';

export function showError(message: any) {
  showMessage({
    message,
    type: 'danger',
    color: COLORS.background.primary,
    icon: 'danger',
  });
}

export function showSuccess(message: any) {
  showMessage({
    message,
    type: 'success',
    color: COLORS.background.primary,
    icon: 'success',
  });
}

export function showInfo(message: any, onPress: any) {
  showMessage({
    message,
    type: 'info',
    color: COLORS.background.primary,
    icon: 'info',
    onPress,
  });
}
