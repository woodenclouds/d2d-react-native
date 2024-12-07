import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, COLORS, FONTS} from '@app/themes/themes';
import BackArrow from '@app/assets/icons/back_arrow.svg';

type Props = {
  headingText: string;
  backArrow?: boolean;
  rightIcon?: boolean;
  icon?: React.ReactNode;
  backPress?: () => void;
  additionIconFunction?: () => void;
};

const CommonHeader = (props: Props) => {
  const {
    headingText,
    backArrow,
    rightIcon,
    icon,
    backPress,
    additionIconFunction,
  } = props;
  return (
    <View style={styles.container}>
      <View>
        {backArrow && (
          <TouchableOpacity onPress={backPress}>
            <BackArrow />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.headingText}>{headingText}</Text>
      <View>
        {rightIcon && (
          <TouchableOpacity onPress={additionIconFunction}>
            {icon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.wp(20 / 4.2),
    paddingVertical: SIZES.wp(10 / 4.2),
    borderBottomWidth: SIZES.wp(1 / 4.2),
    borderBottomColor: '#EBEBEB',
    backgroundColor: '#fff',
  },
  headingText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(18 / 4.2),
    color: '#272727',
  },
});
