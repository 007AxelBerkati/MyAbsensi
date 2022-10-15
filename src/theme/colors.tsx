const mainColors = {
  black1: '#112340',
  black2: 'rgba(0, 0, 0, 0.5)',
  grey1: '#7D8797',
  grey2: '#B1B7C2',
  grey3: '#E9E9E9',
  grey4: '#EDEEF0',
  grey5: '#B1B7C2',
  grey6: '#B0B0B0',
  grey7: '#F0F0F0',
  dark1: '#112340',
  dark2: '#495A75',
  red1: '#E06379',
  // blue1: '#2F80ED',
  // blue2: '#0066CB',
  green1: '#2AC63A',
  green2: '#EDFCFD',
  orange1: '#FF8303',
  orange2: '#FF9425',
  orange3: '#FFA84D',
  orange4: '#FFB669',
  orange5: '#FFCB94',
};

export const COLORS = {
  warning: mainColors.red1,
  success: mainColors.green1,
  primary: 'white',
  secondary: mainColors.orange1,
  background: {
    primary: 'white',
    secondary: mainColors.orange1,
    black: mainColors.black1,
    grey: mainColors.grey7,
    tertiary: mainColors.orange5,
  },
  button: {
    primary: {
      background: mainColors.orange1,
      text: 'white',
      border: mainColors.orange1,
    },
    secondary: {
      background: 'white',
      text: mainColors.black1,
      border: mainColors.orange1,
    },
  },

  text: {
    primary: mainColors.black1,
    secondary: 'white',
    subtitle: mainColors.grey1,
    tertiary: mainColors.orange1,
  },

  disable: {
    background: mainColors.grey4,
    text: mainColors.grey5,
  },

  lineTextInput: mainColors.orange1,
  loadingBackground: mainColors.black2,
  outlineInput: mainColors.grey2,
  border: {
    primary: mainColors.grey3,
    secondary: mainColors.grey6,
  },
};
