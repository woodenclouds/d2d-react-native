import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { SIZES, COLORS, FONTS } from '@app/themes/themes';
import GreenBox from '@app/assets/icons/green_box.svg';
import NavigateIcon from '@app/assets/icons/navigate_icon.svg';
import Animated, {
  useAnimatedStyle,
  interpolate,
  SharedValue,
  Extrapolation,
} from 'react-native-reanimated';
import DeliveryVehicleIcon from '@app/assets/icons/delivery_vehicle.svg';
import DeliveryIcon from '@app/assets/icons/delivery_green_icon.svg';
import DeliveredIcon from '@app/assets/icons/delivered_icon.svg';
import PickupIcon from '@app/assets/icons/pickup_icon.svg';
import AttemptIcon from '@app/assets/icons/attempt_icon.svg';

type Props = {
  item: any;
  index: number;
  scrollX: SharedValue<number>;
  currentIndex: number;
  onPressFunction: () => void;
};

const width = SIZES.wp('100%');

const CardItem = (props: Props) => {
  const { index, scrollX, currentIndex, onPressFunction, item } = props;

  const swipeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.35, 0, width * 0.35],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, swipeAnimatedStyle]}>
      <TouchableOpacity
        onPress={onPressFunction}
        activeOpacity={0.7}
        style={[
          styles.cardContainer,
          { borderColor: currentIndex === index ? COLORS.primary : '#fff' },
        ]}>
        <View style={styles.rowContainer}>
          {/* <GreenBox /> */}
          <View>
            {props.type === 'history' ? (
              <DeliveredIcon />
            ) : item.next_action === 'pickup' ? (
              <PickupIcon />
            ) : item.next_action === 'delivery' ? (
              <DeliveryIcon />
            ) : (
              <AttemptIcon />
            )}
          </View>
          <View style={styles.contentSide}>
            <Text style={styles.streetName} numberOfLines={1}>
              {/* {item?.address} */}
              {
                item.is_pickup ? (
                  item.next_action === 'pickup' ? (
                    item?.address || item?.location
                  ) : (
                    item?.pharmacy_address || item?.location
                  )
                ) : (
                  item.next_action === 'pickup' ? (
                    item?.pharmacy_address || item?.location
                  ) : (
                    item?.address || item?.location
                  )
                )
              }
            </Text>
            <View style={styles.rowTextView}>
              {/* <Text style={styles.statusText}>Delivery</Text> */}
              {item.next_action === 'pickup' ? (
                <Text style={styles.subText}>Ready to pickup</Text>
              ) : (
                <Text style={[styles.subText, { color: '#007DDC' }]}>
                  Ready to deliver
                </Text>
              )}
              {/* <Text style={styles.distanceText}>2km</Text> */}
              {item?.order_type && <DeliveryVehicleIcon />}
            </View>
            <View style={[styles.rowTextView, { marginTop: SIZES.wp(16 / 4.2) }]}>
              <Text style={styles.detailsText}>View Details</Text>
              <NavigateIcon />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: 'center',
  },
  cardContainer: {
    width: SIZES.wp(260 / 4.2),
    backgroundColor: '#FFFFFF',
    padding: SIZES.wp(20 / 4.2),
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: COLORS.primary,
    borderRadius: SIZES.wp(24 / 4.2),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SIZES.wp(160 / 4.2),
  },
  contentSide: {
    width: '100%',
    marginLeft: SIZES.wp(12 / 4.2),
  },
  streetName: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#1C1C1C',
    marginBottom: SIZES.wp(3 / 4.2),
  },
  rowTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(12 / 4.2),
    color: '#48AE50',
  },
  distanceText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(12 / 4.2),
    color: '#646464',
  },
  detailsText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(12 / 4.2),
    color: COLORS.primary,
  },
  subText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(12 / 4.2),
    color: '#B064F7',
    // marginTop: SIZES.wp(4 / 4.2),
  },
});
