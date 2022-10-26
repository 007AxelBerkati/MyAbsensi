import {Dimensions, PixelRatio, Platform} from 'react-native';

const width = Math.round(Dimensions.get('window').width);

const scale = width / 375;

export const normalize = (size: number): number => {
  const newSize = size * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const RADIUS = {
  small: normalize(12),
  medium: normalize(14),
  large: normalize(16),
  xLarge: normalize(24),
};

const MARGIN = {
  small: normalize(12),
  medium: normalize(14),
  large: normalize(16),
  xLarge: normalize(24),
};

const PADDING = {
  small: normalize(12),
  medium: normalize(14),
  large: normalize(16),
  xLarge: normalize(24),
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export {PADDING, MARGIN, RADIUS, windowWidth, windowHeight};
