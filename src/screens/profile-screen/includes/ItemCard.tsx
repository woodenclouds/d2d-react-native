import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import {convertToAMPM} from '@app/utils/dateTime';

type Props = {
  label: string;
  attendance?: boolean;
  valueText: string;
  color?: string;
  loginLogout?: {
    chekin: string;
    chekout: string;
  };
};

const ItemCard = (props: Props) => {
  const {label, attendance, valueText, color, loginLogout} = props;

  return attendance ? (
    <View style={styles.container}>
      <View>
        <Text style={{...styles.attendanceText, ...{color: color}}}>
          {valueText}
        </Text>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View>
        <Text style={styles.labelText}>Login</Text>
        <Text style={styles.labelText}>
          {convertToAMPM(loginLogout?.chekin) ?? '--/--'}
        </Text>
      </View>
      <View>
        <Text style={styles.labelText}>Logout</Text>
        <Text style={styles.labelText}>
          {convertToAMPM(loginLogout?.chekout) ?? '--/--'}
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={styles.valueText}>{valueText}</Text>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.wp(8 / 4.2),
    backgroundColor: '#F5F7FA',
    paddingHorizontal: SIZES.wp(12 / 4.2),
    paddingVertical: SIZES.wp(20 / 4.2),
    borderRadius: SIZES.wp(10 / 4.2),
  },
  labelText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#676767',
    marginBottom: SIZES.wp(8 / 4.2),
  },
  valueText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#474747',
  },
  attendanceText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#24AC33',
    marginBottom: SIZES.wp(8 / 4.2),
  },
});
