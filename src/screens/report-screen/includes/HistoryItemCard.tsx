import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS} from '@app/themes/themes';
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

type Props = {};

const HistoryItemCard = (props: Props) => {
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
        <Text style={styles.itemText} numberOfLines={1}>
          2900 Ritter Street, Huntsville, AL 35805, USA
        </Text>
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
          <View style={styles.imageContainer}></View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Order type:</Text>
            <Text style={styles.itemTextSmall}>Delivery</Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Recipient name:</Text>
            <Text style={styles.itemTextSmall}>David Abraham</Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Phone number:</Text>
            <Text style={styles.itemTextSmall}>+1 123 456 789</Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Delivery time:</Text>
            <Text style={styles.itemTextSmall}>
              Between 10:00 am & 05:00 pm
            </Text>
          </View>
          <View style={styles.rowViewSpace}>
            <Text style={styles.labelText}>Address:</Text>
            <Text style={styles.itemTextSmall}>
              Toronto Medical Deliveries 124 street, Toronto.
            </Text>
          </View>
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
  lineView: {
    width: '100%',
    height: SIZES.wp(1 / 4.2),
    backgroundColor: '#F5F7FA',
    marginTop: SIZES.wp(20 / 4.2),
    marginBottom: SIZES.wp(10 / 4.2),
  },
  imageContainer: {
    width: '100%',
    height: SIZES.wp(100 / 4.2),
    backgroundColor: '#F5F7FA',
    borderRadius: SIZES.wp(6 / 4.2),
    marginBottom: SIZES.wp(16 / 4.2),
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
    color: '#7F7F7F',
  },
  itemTextSmall: {
    ...FONTS.regular,
    fontSize: SIZES.wp(13 / 4.2),
    color: '#474747',
    maxWidth: SIZES.wp(190 / 4.2),
    textAlign: 'right',
  },
  contentView: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});
