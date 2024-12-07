import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS} from '@app/themes/themes';

type Props = {
  label: string;
  onPressFunction?: () => void;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  buttonStyle?: ViewStyle;
};

const Button = (props: Props) => {
  const {label, onPressFunction, LeftIcon, RightIcon, buttonStyle} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, buttonStyle]}
      onPress={onPressFunction}>
      {LeftIcon}
      <Text style={styles.buttonText}>{label}</Text>
      {RightIcon}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: SIZES.wp(48 / 4.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.wp(12 / 4.2),
    marginTop: SIZES.wp(40 / 4.2),
  },
  buttonText: {
    ...FONTS.medium,
    color: '#fff',
    fontSize: SIZES.wp(14 / 4.2),
    marginHorizontal: SIZES.wp(10 / 4.2),
  },
});
