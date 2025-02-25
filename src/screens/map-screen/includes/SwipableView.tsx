import {Dimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {SIZES} from '@app/themes/themes';
import CardItem from './CardItem';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
} from 'react-native-reanimated';

type Props = {
  points: Array<any>;
  currentIndex: number;
  setCurrentIndex: (value: number) => void;
  onSwipeEnd: () => void;
  setDetailsModal: (value: boolean) => void;
};

const width = SIZES.wp('100%');

const SwipableView = (props: Props) => {
  const {points, currentIndex, setCurrentIndex, onSwipeEnd, setDetailsModal} =
    props;

  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
      const currentIndex = Math.round(scrollX.value / width);
      runOnJS(setCurrentIndex)(currentIndex);
    },
  });

  return (
    <Animated.ScrollView
      style={styles.container}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={onSwipeEnd}
      onScroll={onScrollHandler}>
      {points.map((item, index) => (
        <CardItem
          index={index}
          item={item}
          scrollX={scrollX}
          currentIndex={currentIndex}
          onPressFunction={() => {
            setDetailsModal(true);
          }}
        />
      ))}
    </Animated.ScrollView>
  );
};

export default SwipableView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    bottom: SIZES.wp(120 / 4.2),
  },
});
