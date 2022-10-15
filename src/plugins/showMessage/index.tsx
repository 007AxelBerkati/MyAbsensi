import {showMessage} from 'react-native-flash-message';
import {COLORS} from 'theme';

export function showError(message: any) {
  showMessage({
    message,
    type: 'danger',
    color: COLORS.white,
    icon: 'danger',
  });
}

export function showSuccess(message: any) {
  showMessage({
    message,
    type: 'success',
    color: COLORS.white,
    icon: 'success',
  });
}

export function showInfo(message: any, onPress: any) {
  showMessage({
    message,
    type: 'info',
    color: COLORS.white,
    icon: 'info',
    onPress,
  });
}
