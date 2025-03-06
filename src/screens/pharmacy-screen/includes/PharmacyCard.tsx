import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '@app/themes/themes';
import LocationIcon from '@app/assets/icons/location.svg';
import Divider from '@app/components/Divider';
import {navigate} from '@app/services/navigationService';
import {openGoogleMapsNavigation} from '@app/utils/navigationUtils';

interface PharmacyCardProps {
  pharmacy: any;
}

const PharmacyCard = ({pharmacy}: PharmacyCardProps) => {
  const getCount = (orders: any) => {
    if (orders.length > 0) {
      return orders
        .map((item: any) => item.count)
        .reduce((a: any, b: any) => a + b);
    } else {
      return 0;
    }
  };

  const handleGoogleMapsNavigation = () => {
    openGoogleMapsNavigation(
      pharmacy.location_data.latitude,
      pharmacy.location_data.longitude,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameRow}>
        <View style={styles.iconContainer}>
          <Text>{pharmacy.company_name[0].toUpperCase()}</Text>
        </View>
        <View>
          <Text style={styles.titleText}>{pharmacy.name}</Text>
          <Text style={styles.idText}>#{pharmacy.company_register_no}</Text>
        </View>
      </View>
      <Divider color="#F5F7FA" marginVertical={0} />
      <View style={styles.ordersRow}>
        <Text style={styles.ordersText}>
          Pending Orders: {getCount(pharmacy.order_details)}
        </Text>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={handleGoogleMapsNavigation}>
          <Text style={styles.ordersText}>Get direction</Text>
          <LocationIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PharmacyCard;

const styles = StyleSheet.create({
  container: {
    padding: SIZES.wp(16 / 4.2),
    backgroundColor: '#FFFFFF',
    borderRadius: SIZES.wp(16 / 4.2),
    gap: SIZES.wp(12 / 4.2),
  },
  iconContainer: {
    width: SIZES.wp(48 / 4.2),
    height: SIZES.wp(48 / 4.2),
    borderRadius: SIZES.wp(100 / 4.2),
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.wp(12 / 4.2),
  },
  ordersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(18 / 4.2),
    color: '#272727',
    lineHeight: 24,
    marginBottom: 4,
  },
  idText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#676767',
    lineHeight: 20,
  },
  ordersText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#4576E2',
    lineHeight: 20,
    marginRight: 4,
  },
});
