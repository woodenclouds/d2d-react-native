import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

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

import {useAuth} from '../../context/AuthContext';
import {assignedOrders, orderReports} from '@app/services/api';

type Props = {};

const HomeScreen = (props: Props) => {
  const toast = useToast();
  const [signIn, setSignIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {checkIn, checkOut, state} = useAuth();
  const {checkInId} = state;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reports, setReports] = useState([]);
  const [orderReportLoading, setOrderReportLoading] = useState(true);
  const [orderReportError, setOrderReportError] = useState(null);

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

  const handleCheckIn = async () => {
    try {
      if (!checkInId) {
        await checkIn();
      }
      showToast();
    } catch (error) {
      console.log(error, 'Check-in failed.');
    }
  };

  const handleCheckOut = async () => {
    try {
      if (checkInId) {
        const checkin = parseInt(checkInId, 10);
        console.log(checkin, 'checkin');

        await checkOut(checkin);
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error, 'Check-out failed.');
    }
  };

  // Fetch orders on component mount
  const fetchOrders = async () => {
    try {
      const data = await assignedOrders(); // Call API
      setOrders(data); // Store data in state
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderReports = async () => {
    try {
      const data = await orderReports(); // Call API
      setReports(data); // Store data in state
    } catch (err) {
      setOrderReportError('Failed to load orders');
    } finally {
      setOrderReportError(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchOrderReports();
  }, []);

  return (
    <>
      <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
        <GestureHandlerRootView>
          <ScrollView>
            <CenterModalBox
              isVisible={modalVisible}
              onBackButtonPress={() => {
                setModalVisible(false);
              }}
              onBackdropPress={() => {
                setModalVisible(false);
              }}
              children={
                <PunchOutModal
                  setModalVisible={setModalVisible}
                  setSignIn={setSignIn}
                  onPress={handleCheckOut}
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
              <SpotLight data={reports} />
            </View>
            <SigninButton
              // onSwipeComplete={handleCheckIn}
              showToast={handleCheckIn}
              setSignIn={setSignIn}
              signIn={checkInId ? true : false}
              setModalVisible={setModalVisible}
            />
            {loading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : error ? (
              <Text style={styles.error}>{error}</Text>
            ) : orders.length === 0 ? (
              <Text style={styles.noOrders}>No assigned orders</Text>
            ) : (
              <OrdersList data={orders.data} />
            )}
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
  error: {
    color: 'red',
    fontSize: 16,
  },
  noOrders: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
