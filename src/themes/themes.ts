import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#003FF0',
  grey: '#747474',
  border_color: '#A2A2A2',
  material_green: '#31993D',
};

export const SIZE = {
  width: width,
  height: height,
  base1: 25,
};

export const SIZES = {
  wp: wp,
  hp: hp,
};

export const FONTS = {
  extraBold: {
    fontFamily: 'Gilroy-ExtraBold',
  },
  bold: {
    fontFamily: 'Gilroy-Bold',
  },
  semiBold: {
    fontFamily: 'Gilroy-SemiBold',
  },
  medium: {
    fontFamily: 'Gilroy-Medium',
  },
  regular: {
    fontFamily: 'Gilroy-Regular',
  },
  light: {
    fontFamily: 'Gilroy-Light',
  },
  extraLight: {
    fontFamily: 'Gilroy-ExtraLight',
  },
};
