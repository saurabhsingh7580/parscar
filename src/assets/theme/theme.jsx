import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const metrics = {
  screenHeight: width < height ? height : width,
  screenWidth: width < height ? width : height,
};

export const color = {
  white: '#FFFFFF',
  black: '#000000',
  gray: '#A2A5A4',
  cyan: '#00AEEF',
  red: '#AF292E',
  blue: '#00539F',
  button: '#1983d4',
  theme: '#FFFFFF',
  lightGray: '#e0e0e0',
  primary: '#00539F',
  secondary:'#ededed'
};

export const size = {
  font6: metrics.screenWidth * (6 / 400),
  font8: metrics.screenWidth * (8 / 400),
  font10: metrics.screenWidth * (10 / 400),
  font12: metrics.screenWidth * (12 / 400),
  font14: metrics.screenWidth * (14 / 400),
  font16: metrics.screenWidth * (16 / 400),
  font18: metrics.screenWidth * (18 / 400),
  font20: metrics.screenWidth * (20 / 400),
  font22: metrics.screenWidth * (22 / 400),
  font24: metrics.screenWidth * (24 / 400),
  font26: metrics.screenWidth * (26 / 400),
  font28: metrics.screenWidth * (28 / 400),
  font30: metrics.screenWidth * (30 / 400),
};

export const weight = {
  extrabold: '800',
  bold: '700',
  semibold: '600',
  medium: '500',
  low: '400',
  regular: 'normal',
};
