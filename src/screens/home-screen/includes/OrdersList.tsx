import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import ArrowRight from '@app/assets/icons/arrow_right.svg';
import HistoryItemCard from '@app/screens/report-screen/includes/HistoryItemCard';

type Props = {};

const OrdersList = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowfullView}>
        <Text style={styles.titleText}>New Orders</Text>
        <TouchableOpacity style={styles.rowView}>
          <Text style={styles.buttonText}>View All</Text>
          <View>
            <ArrowRight />
          </View>
        </TouchableOpacity>
      </View>
      {Array(10)
        .fill(10)
        .map((item, index) => (
          <HistoryItemCard />
        ))}
    </View>
  );
};

export default OrdersList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.wp(20 / 4.2),
    width: '100%',
  },

  rowfullView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SIZES.wp(20 / 4.2),
  },
  titleText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(16 / 4.2),
    color: '#28292B',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(12 / 4.2),
    color: COLORS.primary,
    marginRight: SIZES.wp(8 / 4.2),
  },
});
