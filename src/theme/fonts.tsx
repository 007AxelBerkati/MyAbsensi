import {metrics} from './metrics';

const SIZE = {
  font6: metrics.screenWidth * (6 / 365),
  font8: metrics.screenWidth * (8 / 365),
  font10: metrics.screenWidth * (10 / 365),
  font12: metrics.screenWidth * (12 / 365),
  font14: metrics.screenWidth * (14 / 365),
  font16: metrics.screenWidth * (16 / 365),
  font20: metrics.screenWidth * (20 / 365),
};

const WEIGHT = {
  full: '900',
  semi: '600',
  low: '400',
  bold: 'bold',
  normal: 'normal',
};

const TYPE = {
  montserratMedium: 'Montserrat-Medium',
  montserratRegular: 'Montserrat-Regular',
  montserratSemiBold: 'Montserrat-SemiBold',
};

export {SIZE, WEIGHT, TYPE};
