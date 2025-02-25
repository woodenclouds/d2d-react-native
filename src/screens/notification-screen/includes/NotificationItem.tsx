import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, COLORS, FONTS} from '@app/themes/themes';
import NotificationApproved from '@app/assets/icons/notification_approved.svg';
import OrderAssigned from '@app/assets/icons/order_assigned.svg';
import {navigate} from '@app/services/navigationService';

type Props = {
  item: any;
};

const NotificationItem = (props: Props) => {
  const {item} = props;
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.notReadDot} />
        {item.type === 'order_assignment' ? (
          <OrderAssigned />
        ) : (
          <NotificationApproved />
        )}
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.notificationText} numberOfLines={2}>
          {item.title}
        </Text>
        {item.type === 'order_assignment' ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonContainer}
            onPress={() => {
              navigate('OrdersPage', {});
            }}>
            <Text style={styles.buttonText}>View Order</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.readmoreText}>Read more</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.dateTimeText}>{item.date_added}</Text>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: SIZES.wp(20 / 4.2),
    borderBottomWidth: SIZES.wp(1 / 4.2),
    borderBottomColor: '#EBEBEB',
    flexDirection: 'row',
  },
  leftContainer: {
    width: SIZES.wp(42 / 4.2),
    marginRight: SIZES.wp(16 / 4.2),
  },
  notReadDot: {
    position: 'absolute',
    top: SIZES.wp(2 / 4.2),
    left: SIZES.wp(2 / 4.2),
    zIndex: 1,
    width: SIZES.wp(8 / 4.2),
    height: SIZES.wp(8 / 4.2),
    borderRadius: SIZES.wp(100 / 4.2),
    backgroundColor: COLORS.material_green,
  },
  rightContainer: {
    width: SIZES.wp(292 / 4.2),
  },
  notificationText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#28292B',
  },
  readmoreText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(14 / 4.2),
    color: COLORS.primary,
    textAlign: 'center',
  },
  dateTimeText: {
    marginTop: SIZES.wp(10 / 4.2),
    ...FONTS.regular,
    fontSize: SIZES.wp(12 / 4.2),
    color: '#B0B0B0',
  },
  buttonContainer: {
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: '#DDDEE1',
    width: SIZES.wp(110 / 4.2),
    paddingVertical: SIZES.wp(8 / 4.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.wp(6 / 4.2),
    marginTop: SIZES.wp(8 / 4.2),
  },
  buttonText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#28292B',
    textAlign: 'center',
  },
});
