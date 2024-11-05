import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import {COLORS, SIZES, FONTS} from '@app/themes/themes';

import SpotLight from './includes/SpotLight';
import OrdersList from './includes/OrdersList';
import SigninButton from './includes/SigninButton';
import CenterModalBox from '@app/components/CenterModalBox';
import PunchOutModal from './includes/PunchOutModal';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {navigate} from '@app/services/navigationService';
import {useToast} from 'react-native-toast-notifications';

import AppLogo from '@app/assets/icons/app_logo.svg';
import BellIcon from '@app/assets/icons/bell_icon.svg';
import TickWithSparkle from '@app/assets/icons/tick_with_sparkle.svg';

type Props = {};

const HomeScreen = (props: Props) => {
  const toast = useToast();
  const [signIn, setSignIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const CustomToast = () => {
    return (
      <View style={styles.customToast}>
        <View style={styles.tickIcon}>
          <TickWithSparkle />
        </View>
        <Text style={styles.toastText}>Logging successfull</Text>
      </View>
    );
  };

  const showToast = () => {
    toast.show('', {
      data: {renderToast: () => CustomToast()},
    });
  };

  return (
    <>
      <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
        <GestureHandlerRootView>
          <ScrollView>
            <CenterModalBox
              isVisible={modalVisible}
              onBackButtonPress={() => {
                setModalVisible(false);
                setSignIn(true);
              }}
              onBackdropPress={() => {
                setModalVisible(false);
                setSignIn(true);
              }}
              children={
                <PunchOutModal
                  setModalVisible={setModalVisible}
                  setSignIn={setSignIn}
                />
              }
            />
            <View style={styles.topContainer}>
              <View style={styles.logoHeader}>
                <View style={styles.rowView}>
                  <View>
                    <AppLogo />
                  </View>
                  <Text style={styles.headingText}>Health Care</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigate('NotificationScreen', {});
                  }}>
                  <BellIcon />
                </TouchableOpacity>
              </View>
              <SpotLight />
            </View>
            <SigninButton
              showToast={showToast}
              setSignIn={setSignIn}
              signIn={signIn}
              setModalVisible={setModalVisible}
            />
            <OrdersList />
          </ScrollView>
        </GestureHandlerRootView>
      </SafeAreaWrapper>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: SIZES.wp(246 / 4.2),
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.wp(20 / 4.2),
    paddingTop: SIZES.wp(20 / 4.2),
  },
  logoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(20 / 4.2),
    color: '#FFFFFF',
    marginLeft: SIZES.wp(12 / 4.2),
  },
  customToast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: SIZES.wp(13 / 4.2),
    paddingHorizontal: SIZES.wp(25 / 4.2),
    borderRadius: SIZES.wp(34 / 4.2),
    bottom: SIZES.wp(100 / 4.2),
  },
  tickIcon: {
    marginRight: SIZES.wp(10 / 4.2),
    position: 'absolute',
    left: SIZES.wp(-10 / 4.2),
    top: SIZES.wp(-13 / 4.2),
  },
  toastText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(12 / 4.2),
    color: COLORS.primary,
    marginLeft: SIZES.wp(20 / 4.2),
  },
});
