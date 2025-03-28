import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {SIZES, FONTS} from '@app/themes/themes';
import DeliveryIcon from '@app/assets/icons/delivery_icon.svg';

type Props = {
  label: string;
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
  data: any;
  totalDeliveries: number;
};

const TopCardItem = (props: Props) => {
  const {containerStyle, label, icon, data, totalDeliveries} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.titleView}>
        <View>{icon ?? <DeliveryIcon />}</View>
        <Text style={styles.titleText}>{label}</Text>
      </View>
      <Text style={styles.bigText}>{totalDeliveries}</Text>
      {Object.entries(data || {}).map(([key, value]) => (
        <View style={styles.smallView} key={key}>
          <Text style={styles.smallText}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          <Text style={styles.smallTextNum}>{value}</Text>
        </View>
      ))}
    </View>
  );
};

export default TopCardItem;

const styles = StyleSheet.create({
  container: {
    padding: SIZES.wp(14 / 4.2),
    width: '100%',
    backgroundColor: '#B0E2CD',
    borderRadius: SIZES.wp(16 / 4.2),
    height: '100%'
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: SIZES.wp(17 / 4.2),
  },
  titleText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(13 / 4.2),
    color: '#232323',
    marginLeft: SIZES.wp(8 / 4.2),
  },
  bigText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(18 / 4.2),
    color: '#0A0A0A',
    marginBottom: SIZES.wp(16 / 4.2),
  },
  smallView: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ffffff30',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.wp(10 / 4.2),
    borderRadius: SIZES.wp(8 / 4.2),
    marginBottom: SIZES.wp(4 / 4.2),
  },
  smallText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(13 / 4.2),
    color: '#616161',
  },
  smallTextNum: {
    ...FONTS.regular,
    fontSize: SIZES.wp(13 / 4.2),
    color: '#434343',
  },
});
