import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import {convertToAMPM} from '@app/utils/dateTime';
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
import {navigate} from '@app/services/navigationService';
import {openGoogleMapsNavigation} from '@app/utils/navigationUtils';

type Props = {
  item: any;
  type?: string;
};

const HistoryItemCard = (props: Props) => {
  const {item} = props;

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
      transform: [{rotate: withTiming(arrowDegree.value)}],
    };
  });

  const animateViewStyle = useAnimatedStyle(() => {
    return {
      height: animateHight.value,
      overflow: 'hidden',
    };
  });

  const handleGoogleMapsNavigation = () => {
    if (!item.latitude || !item.longitude) return;
    openGoogleMapsNavigation(item.latitude, item.longitude);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => onToggle()}>
      <View style={styles.rowView}>
        <View>
          {props.type === 'history' ? (
            <DeliveredIcon />
          ) : item.is_pickup && item.status === 'pending' ? (
            <PickupIcon />
          ) : !item.is_pickup && item.status === 'pending' ? (
            <DeliveryIcon />
          ) : (
            <AttemptIcon />
          )}
        </View>
        <View>
          <Text style={styles.itemText} numberOfLines={1}>
            {item?.address}
          </Text>
          {props.type !== 'history' ? (
            !item.is_pickup ? (
              item.status === 'pending' && (
                <Text style={styles.subText}>Delivered within 30 min</Text>
              )
            ) : item.is_pickup && item.status === 'pending' ? (
              <Text style={styles.subText}>Pickup within 30 min</Text>
            ) : (
              <Text style={styles.subText}>
                Attempted {item.attempted_count} time
              </Text>
            )
          ) : (
            <Text style={styles.subText}>Delivered</Text>
          )}
        </View>
        <Animated.View style={rotateArrowStyle}>
          <DownArrow />
        </Animated.View>
      </View>
      <Animated.View style={animateViewStyle}>
        <Animated.View
          ref={listRef}
          collapsable={false}
          style={[styles.contentView]}>
          <View style={styles.lineView} />
          <View style={styles.imageContainer}>
            <View style={styles.rowViewSpace}>
              <Text style={styles.labelText}>Order id</Text>
              <Text style={styles.itemTextSmall}>#3498590</Text>
            </View>
            <View style={styles.rowViewSpace}>
              <Text style={styles.labelText}>Order type</Text>
              <Text style={styles.itemTextSmall}>{item?.order_type}</Text>
            </View>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Recipient name</Text>
            <Text style={styles.itemTextSmall}>{item?.recepient_name}</Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Phone number</Text>
            <Text style={styles.itemTextSmall}>{item?.recepient_phone}</Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Pickup</Text>
            <Text style={styles.itemTextSmall}>{item?.address}</Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Delivery time</Text>
            <Text style={styles.itemTextSmall}>
              Between {convertToAMPM(item?.from_time)} &{' '}
              {convertToAMPM(item?.to_time)}
            </Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Address</Text>
            <Text style={styles.itemTextSmall}>{item?.address}</Text>
          </View>
          {props.type !== 'history' && <View style={styles.lineView} />}
          {props.type !== 'history' && (
            <>
              <View style={[styles.rowContainer]}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    navigate('DeliveryUpdate', {data: item});
                  }}>
                  <Text style={styles.buttonText}>Delivered</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonContainer, {borderColor: '#FF8A3C'}]}>
                  <Text style={[styles.buttonText, {color: '#FF8A3C'}]}>
                    {item.attempted_count} Attempted
                  </Text>
                </TouchableOpacity>
              </View>
              <Button
                onPressFunction={handleGoogleMapsNavigation}
                label={
                  !item.is_pickup && item.status === 'pending'
                    ? 'Navigate to  delivery location'
                    : item.is_pickup &&
                      item.status === 'pending' &&
                      'Navigate to pickup location'
                }
                buttonStyle={[styles.buttonStyle, {width: '100%'}]}
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
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#474747',
  },
  subText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(12 / 4.2),
    color: '#34B65F',
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
    height: SIZES.wp(100 / 4.2),
    backgroundColor: '#F4F7FF',
    borderRadius: SIZES.wp(6 / 4.2),
    marginBottom: SIZES.wp(16 / 4.2),
    padding: SIZES.wp(20 / 4.2),
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
});
