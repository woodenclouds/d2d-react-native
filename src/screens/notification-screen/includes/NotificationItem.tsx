import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, COLORS, FONTS} from '@app/themes/themes';
import NotificationApproved from '@app/assets/icons/notification_approved.svg';

type Props = {};

const NotificationItem = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.notReadDot} />
        <NotificationApproved />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.notificationText} numberOfLines={2}>
          Your leave request from 10/12/2024 to 16/12/2024 has been approved.
          Enjoy your time off, and we’ll see you back soon! 😊
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.readmoreText}>Read more</Text>
        </TouchableOpacity>
        <Text style={styles.dateTimeText}>12/10/2024 at 9:42 AM</Text>
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
  },
  dateTimeText: {
    marginTop: SIZES.wp(10 / 4.2),
    ...FONTS.regular,
    fontSize: SIZES.wp(12 / 4.2),
    color: '#B0B0B0',
  },
});
