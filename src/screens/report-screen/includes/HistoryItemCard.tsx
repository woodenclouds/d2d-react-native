import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SIZES, FONTS, COLORS } from '@app/themes/themes';
import { convertToAMPM } from '@app/utils/dateTime';
import Animated, {
  measure,
  runOnJS,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import DeliveryIcon from '@app/assets/icons/delivery_green_icon.svg';
import DeliveredIcon from '@app/assets/icons/delivered_icon.svg';
import PickupIcon from '@app/assets/icons/pickup_icon.svg';
import AttemptIcon from '@app/assets/icons/attempt_icon.svg';
import DownArrow from '@app/assets/icons/down_arrow.svg';
import Button from '@app/components/Button';
import { navigate } from '@app/services/navigationService';
import { openGoogleMapsNavigation } from '@app/utils/navigationUtils';
import DeliveryVehicleIcon from '@app/assets/icons/delivery_vehicle.svg';

type Props = {
  item: any;
  type?: string;
  onAttemptPress?: () => void;
};

const HistoryItemCard = (props: Props) => {
  const { item, onAttemptPress } = props;

  console.log(item, 'item');

  const arrowDegree = useSharedValue('0deg');
  const animateHight = useSharedValue(0);
  const isExpanded = useSharedValue(false);
  const listRef = useAnimatedRef();

  const onToggle = () => {
    if (!isExpanded.value) {
      runOnUI(() => {
        'worklet';
        animateHight.value = withTiming(measure(listRef)?.height);
      })();
      arrowDegree.value = '180deg';
    } else {
      arrowDegree.value = '0deg';
      animateHight.value = withTiming(0);
    }
    isExpanded.value = !isExpanded.value;
  };

  const rotateArrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(arrowDegree.value) }],
    };
  });

  const animateViewStyle = useAnimatedStyle(() => {
    return {
      height: animateHight.value,
      overflow: 'hidden',
    };
  });

  const handleGoogleMapsNavigation = () => {
    if (item.is_pickup) {
      if (item.next_action === 'pickup') {
        if (!item.latitude || !item.longitude) return;
        openGoogleMapsNavigation(item.latitude, item.longitude);
      } else {
        const pharmacyLocation = item.pharmacy_location;
        if (!pharmacyLocation.latitude || !pharmacyLocation.longitude) return;
        openGoogleMapsNavigation(
          pharmacyLocation.latitude,
          pharmacyLocation.longitude,
        );
      }
    } else {
      if (item.next_action === 'pickup') {
        const pharmacyLocation = item.pharmacy_location;
        if (!pharmacyLocation.latitude || !pharmacyLocation.longitude) return;
        openGoogleMapsNavigation(
          pharmacyLocation.latitude,
          pharmacyLocation.longitude,
        );
      } else {
        if (!item.latitude || !item.longitude) return;
        openGoogleMapsNavigation(item.latitude, item.longitude);
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => onToggle()}
    >
      <View style={styles.rowView}>
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
        <View>
          <Text style={styles.itemText} numberOfLines={1}>
            {item.is_pickup
              ? item.next_action === 'pickup'
                ? item?.pharmacy_address
                : item?.address
              : item.next_action === 'delivery'
              ? item?.address
              : item?.pharmacy_address}
          </Text>
          {props.type !== 'history' ? (
            <>
              {item.next_action === 'pickup' ? (
                <Text style={[styles.subText, { color: '#B064F7' }]}>
                  Ready to pickup
                </Text>
              ) : (
                <Text style={[styles.subText, { color: '#007DDC' }]}>
                  Ready to deliver
                </Text>
              )}
              <Text style={[styles.subText, { color: '#FF8A3C' }]}>
                {item.attempted_count} Attempt
              </Text>
            </>
          ) : (
            <Text style={styles.subText}>Delivered</Text>
          )}
        </View>
        <View style={styles.arrowContainer}>
          <Animated.View style={rotateArrowStyle}>
            <DownArrow />
          </Animated.View>
          {item?.order_type === 'Express' && <DeliveryVehicleIcon />}
        </View>
      </View>
      <Animated.View style={animateViewStyle}>
        <Animated.View
          ref={listRef}
          collapsable={false}
          style={[styles.contentView]}
        >
          <View style={styles.lineView} />
          <View style={styles.imageContainer}>
            <View style={styles.rowViewSpace}>
              <Text style={styles.labelText}>Order id</Text>
              <Text style={styles.itemTextSmall}>
                {item?.order_id ?? '----'}
              </Text>
            </View>
            <View style={styles.rowViewSpace}>
              <Text style={styles.labelText}>Pickup/Delivery</Text>
              <Text style={styles.itemTextSmall}>
                {item?.is_pickup ? 'Pickup' : 'Delivery'}
              </Text>
            </View>
            <View style={styles.rowViewSpace}>
              <Text style={styles.labelText}>Order type</Text>
              <Text style={styles.itemTextSmall}>
                {item?.order_type ?? '---'}
              </Text>
            </View>
            <View style={styles.rowViewSpace}>
              <Text style={styles.labelText}>Pharmacy name</Text>
              <Text style={styles.itemTextSmall}>
                {item?.pharmacy_name ?? '---'}
              </Text>
            </View>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Recipient name</Text>
            <Text style={styles.itemTextSmall}>
              {item?.recepient_name || item?.customer_name}
            </Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Phone number</Text>
            <Text style={styles.itemTextSmall}>{item?.recepient_phone}</Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Pickup address</Text>
            <Text style={styles.itemTextSmall}>
              {item?.is_pickup
                ? item?.address
                : `${item?.pharmacy_name}, \n ${item?.pharmacy_address}`}
            </Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Delivery date</Text>
            <Text style={styles.itemTextSmall}>
              {item?.delivery_date ?? '---'}
            </Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Delivery time</Text>
            <Text style={styles.itemTextSmall}>
              Before {/* {convertToAMPM(item?.from_time)} &{' '} */}
              {convertToAMPM(item?.to_time)}
            </Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Delivery address</Text>
            <Text style={styles.itemTextSmall}>
              {!item?.is_pickup
                ? item?.address
                : `${item?.pharmacy_name}, \n ${item?.pharmacy_address}`}
            </Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Buzzer code</Text>
            <Text style={styles.itemTextSmall}>
              {item?.buzzer_code ?? '---'}
            </Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Unit number</Text>
            <Text style={styles.itemTextSmall}>
              {item?.unit_number ?? '---'}
            </Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Delivery notes</Text>
            <Text style={styles.itemTextSmall}>
              {item?.delivery_note ?? '---'}
            </Text>
          </View>
          {props.type !== 'history' && <View style={styles.lineView} />}
          {props.type !== 'history' && (
            <>
              <View style={[styles.rowContainer]}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    navigate('DeliveryUpdate', {
                      data: item,
                      type:
                        item.next_action === 'delivery'
                          ? 'delivered'
                          : 'pickup',
                    });
                  }}
                >
                  <Text style={styles.buttonText}>
                    {item.next_action === 'delivery'
                      ? 'Deliver'
                      : 'Pick the order'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onAttemptPress}
                  disabled={onAttemptPress ? false : true}
                  style={[styles.buttonContainer, { borderColor: '#FF8A3C' }]}
                >
                  <Text style={[styles.buttonText, { color: '#FF8A3C' }]}>
                    {item.attempted_count} Attempted
                  </Text>
                </TouchableOpacity>
              </View>
              <Button
                onPressFunction={handleGoogleMapsNavigation}
                label={
                  item.next_action === 'delivery'
                    ? 'Navigate to delivery location'
                    : 'Navigate to pickup location'
                }
                buttonStyle={[styles.buttonStyle, { width: '100%' }]}
              />
            </>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default HistoryItemCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: SIZES.wp(16 / 4.2),
    padding: SIZES.wp(20 / 4.2),
    marginBottom: SIZES.wp(8 / 4.2),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemText: {
    width: SIZES.wp(248 / 4.2),
    ...FONTS.semiBold,
    fontSize: SIZES.wp(16 / 4.2),
    color: '#474747',
  },
  subText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(12 / 4.2),
    color: '#00A76A',
    marginTop: SIZES.wp(4 / 4.2),
  },
  lineView: {
    width: '100%',
    height: SIZES.wp(1 / 4.2),
    backgroundColor: '#F5F7FA',
    marginTop: SIZES.wp(16 / 4.2),
    marginBottom: SIZES.wp(10 / 4.2),
  },
  imageContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#F4F7FF',
    borderRadius: SIZES.wp(6 / 4.2),
    marginBottom: SIZES.wp(16 / 4.2),
    paddingHorizontal: SIZES.wp(20 / 4.2),
    paddingTop: SIZES.wp(20 / 4.2),
  },
  rowViewSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SIZES.wp(23 / 4.2),
  },
  labelText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(13 / 4.2),
    color: '#4C4C4C',
  },
  itemTextSmall: {
    ...FONTS.regular,
    fontSize: SIZES.wp(13 / 4.2),
    color: '#212529',
    maxWidth: SIZES.wp(190 / 4.2),
    textAlign: 'right',
  },
  contentView: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  buttonStyle: {
    width: '48%',
    marginTop: SIZES.wp(8 / 4.2),
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  whiteButton: {
    backgroundColor: '#fff',
    width: '48%',
    marginTop: SIZES.wp(24 / 4.2),
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  whiteButtonText: {
    color: COLORS.primary,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '48%',
    borderColor: '#003FF0',
    borderWidth: SIZES.wp(1 / 4.2),
    borderRadius: SIZES.wp(6 / 4.2),
    paddingVertical: SIZES.wp(15 / 4.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#003FF0',
  },
  arrowContainer: {
    rowGap: SIZES.wp(16 / 4.2),
  },
});
