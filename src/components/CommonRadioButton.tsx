import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';

type Props = {
  containerStyle?: ViewStyle;
  selected?: boolean;
  label?: string;
  onPressFunction?: () => void;
};

const CommonRadioButton = (props: Props) => {
  const {containerStyle, selected, label, onPressFunction} = props;

  return (
    <TouchableOpacity
      onPress={onPressFunction}
      style={[
        styles.container,
        selected && styles.selectedContainer,
        {...containerStyle},
      ]}
      activeOpacity={0.5}>
      <View style={styles.outerRound}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <Text style={[styles.textStyle, selected && styles.selectedTextStyle]}>
        {label ?? 'Delivery'}
      </Text>
    </TouchableOpacity>
  );
};

export default CommonRadioButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: SIZES.wp(20 / 4.2),
    paddingVertical: SIZES.wp(16 / 4.2),
    borderRadius: SIZES.wp(8 / 4.2),
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: '#A2A2A2',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedContainer: {
    borderColor: COLORS.primary,
  },
  outerRound: {
    width: SIZES.wp(16 / 4.2),
    height: SIZES.wp(16 / 4.2),
    borderRadius: SIZES.wp(40 / 4.2),
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: '#6A7683',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.wp(8 / 4.2),
    padding: SIZES.wp(3 / 4.2),
  },
  innerCircle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#003FF0',
    borderRadius: SIZES.wp(40 / 4.2),
  },
  textStyle: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#6A7683',
  },
  selectedTextStyle: {
    color: COLORS.primary,
  },
});
