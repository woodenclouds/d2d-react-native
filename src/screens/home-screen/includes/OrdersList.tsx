import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import ArrowRight from '@app/assets/icons/arrow_right.svg';
import FilterIcon from '@app/assets/icons/filter_icon.svg';
import HistoryItemCard from '@app/screens/report-screen/includes/HistoryItemCard';
import {navigate} from '@app/services/navigationService';

type Props = {
  data: any;
  setSelectItem?: (item: any) => void;
};

const OrdersList = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowfullView}>
        <Text style={styles.titleText}>New Orders</Text>
        <View style={styles.rowView}>
          <TouchableOpacity
            onPress={() => {
              navigate('OrdersPage', {});
            }}
            style={[
              styles.rowView,
              {
                height: SIZES.wp(32 / 4.2),
                paddingHorizontal: SIZES.wp(12 / 4.2),
                backgroundColor: '#fff',
                borderRadius: SIZES.wp(8 / 4.2),
              },
            ]}>
            <Text style={styles.buttonText}>View All</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[
              styles.rowView,
              {
                height: SIZES.wp(32 / 4.2),
                paddingHorizontal: SIZES.wp(12 / 4.2),
                backgroundColor: '#fff',
                borderRadius: SIZES.wp(8 / 4.2),
                marginLeft: SIZES.wp(8 / 4.2),
              },
            ]}>
            <FilterIcon />
          </TouchableOpacity> */}
        </View>
      </View>
      {props.data.map((item: any, index: number) => (
        <HistoryItemCard
          item={item}
          key={index}
          type={'assigned_orders'}
          onAttemptPress={() => {
            navigate('DeliveryUpdate', {data: item, type: 'attempted'});
          }}
        />
      ))}
    </View>
  );
};

export default OrdersList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.wp(20 / 4.2),
    marginBottom: SIZES.wp(100 / 4.2),
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
