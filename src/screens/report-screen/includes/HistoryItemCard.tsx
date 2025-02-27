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
import DeliveryIcon from '@app/assets/icons/delivery_history_icon.svg';
import DownArrow from '@app/assets/icons/down_arrow.svg';
import Button from '@app/components/Button';
import {navigate} from '@app/services/navigationService';

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

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => onToggle()}>
      <View style={styles.rowView}>
        <View>
          <DeliveryIcon />
        </View>
        <View>
          <Text style={styles.itemText} numberOfLines={1}>
            {item?.address}
          </Text>
          {props.type !== 'history' && (
            <Text style={styles.subText}>{item?.delivery_day}</Text>
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
            <View
              style={[styles.rowViewSpace, {marginBottom: SIZES.wp(20 / 4.2)}]}>
              {props.type !== 'pickup' && props.type !== 'assigned_orders' && (
                <Button
                  onPressFunction={() => {
                    navigate('DeliveryUpdate', {data: item});
                  }}
                  label="Deliver Now"
                  buttonStyle={styles.whiteButton}
                  buttonTextStyle={styles.whiteButtonText}
                />
              )}
              <Button
                onPressFunction={() => {
                  navigate('MapScreen', {
                    data: item,
                  });
                }}
                label={
                  props.type === 'pickup' ? 'Pickup the order' : 'Navigate Now'
                }
                buttonStyle={[
                  styles.buttonStyle,
                  (props.type === 'pickup' ||
                    props.type === 'assigned_orders') && {width: '100%'},
                ]}
              />
            </View>
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
    marginTop: SIZES.wp(24 / 4.2),
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
});
