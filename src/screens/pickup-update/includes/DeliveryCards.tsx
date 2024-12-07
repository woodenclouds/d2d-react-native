import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import ClockIcon from '@app/assets/icons/clock_icon.svg';
import WhiteTick from '@app/assets/icons/white_tick.svg';

type Props = {};

const DeliveryCards = (props: Props) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={styles.checkBox}>
        <WhiteTick />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.titleText}>
          19 Furness Dr, Kitchener, ON N2M 1S8
        </Text>
        <View style={styles.subTextContainer}>
          <ClockIcon />
          <Text style={styles.subText}>
            Any time between 10:00 PM & 11:00 PM
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DeliveryCards;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: SIZES.wp(1 / 4.2),
    paddingVertical: SIZES.wp(20 / 4.2),
    borderColor: '#A6A8AF',
  },
  checkBox: {
    width: SIZES.wp(24 / 4.2),
    height: SIZES.wp(24 / 4.2),
    borderRadius: SIZES.wp(8 / 4.2),
    padding: SIZES.wp(3 / 4.2),
    backgroundColor: COLORS.primary,
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    marginLeft: SIZES.wp(16 / 4.2),
  },
  titleText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#28292B',
  },
  subTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.wp(8 / 4.2),
  },
  subText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(12 / 4.2),
    color: '#707174',
    marginLeft: SIZES.wp(8 / 4.2),
  },
});
