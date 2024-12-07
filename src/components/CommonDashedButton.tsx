import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, COLORS, FONTS} from '@app/themes/themes';

type Props = {
  label?: string;
  onPressFunction?: () => void;
};

const CommonDashedButton = (props: Props) => {
  const {label, onPressFunction} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={onPressFunction}>
      <Text style={styles.textStyle}>
        <Text style={styles.plusStyle}>+</Text> {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CommonDashedButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: SIZES.wp(1 / 4.2),
    padding: SIZES.wp(16 / 4.2),
    borderRadius: SIZES.wp(8 / 4.2),
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusStyle: {
    fontSize: SIZES.wp(16 / 4.2),
  },
  textStyle: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: COLORS.primary,
    textAlign: 'center',
  },
});
