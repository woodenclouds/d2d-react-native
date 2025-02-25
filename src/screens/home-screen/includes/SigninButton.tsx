import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import SigninArrow from '@app/assets/icons/signin_arrow.svg';
import TripleArrow from '@app/assets/icons/triple_arrow.svg';
import SignOutArrow from '@app/assets/icons/signout_arrow.svg';
import SignOutTripleArrow from '@app/assets/icons/signout_triple_arrow.svg';

type Props = {
  signIn: boolean;
  setSignIn: (value: boolean | ((prev: boolean) => boolean)) => void;
  showToast: () => void;
  setModalVisible: (value: boolean) => void;
};

function clamp(val: any, min: any, max: any) {
  return Math.min(Math.max(val, min), max);
}

const animWidth = SIZES.wp(322.5 / 4.2);

const SigninButton = (props: Props) => {
  const {showToast, setSignIn, signIn, setModalVisible} = props;

  const translationX = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: translationX.value}],
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: 1 - translationX.value / animWidth,
  }));

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
    })
    .onUpdate(event => {
      const maxTranslateX = animWidth;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        0,
        maxTranslateX,
      );
    })
    .onEnd(() => {
      const maxTranslateX = animWidth;
      if (translationX.value >= maxTranslateX) {
        setSignIn((prev: boolean) => !prev);
        if (!signIn) {
          // onSwipeComplete();
          showToast();
        } else {
          setModalVisible(true);
        }
      }
      translationX.value = withTiming(0, {
        duration: 200,
      });
    })
    .runOnJS(true);

  return (
    <View style={styles.container}>
      <View style={[styles.Miancontainer, signIn && styles.signOutColor]}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[animatedStyles, styles.IconView]}>
            {!signIn ? <SigninArrow /> : <SignOutArrow />}
          </Animated.View>
        </GestureDetector>
        <Animated.Text
          style={[
            opacityStyle,
            styles.buttonText,
            signIn && styles.signoutButtonColor,
          ]}>
          {!signIn ? 'Swipe to sign in ' : 'Swipe to sign out'}
        </Animated.Text>
        <Animated.View style={opacityStyle}>
          {!signIn ? <TripleArrow /> : <SignOutTripleArrow />}
        </Animated.View>
      </View>
    </View>
  );
};

export default SigninButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: SIZES.wp(20 / 4.2),
    marginBottom: SIZES.wp(24 / 4.2),
  },
  Miancontainer: {
    width: SIZES.wp(375 / 4.2),
    backgroundColor: '#1A1D21',
    height: SIZES.wp(52 / 4.2),
    marginTop: SIZES.wp(74 / 4.2),
    alignSelf: 'center',
    borderRadius: SIZES.wp(48 / 4.2),
    padding: SIZES.wp(5 / 4.2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  signOutColor: {
    backgroundColor: '#F1CECE',
  },
  IconView: {
    width: SIZES.wp(42 / 4.2),
    height: SIZES.wp(42 / 4.2),
    backgroundColor: '#fff',
    borderRadius: SIZES.wp(100 / 4.2),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.wp(16 / 4.2),
    zIndex: 1,
  },
  buttonText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(12 / 4.2),
    color: '#41DD75',
  },
  signoutButtonColor: {
    color: '#C74141',
  },
});
