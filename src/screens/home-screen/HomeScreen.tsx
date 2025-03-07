import {
  ActivityIndicator,
  RefreshControl,
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
import CardBoard from '@app/assets/icons/card_board.svg';
import ArrowRight from '@app/assets/icons/arrow_right.svg';

import {useAuth} from '../../context/AuthContext';
import {assignedOrders, orderReports} from '@app/services/api';
import OrderDetailsUpdateModal from '../map-screen/includes/OrderDetailsUpdateModal';
import NoOrder from '@app/components/NoOrder';

type Props = {};

const HomeScreen = (props: Props) => {
  const toast = useToast();
  const [signIn, setSignIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {checkIn, checkOut, state, resetOrderDetailsUpdated} = useAuth();
  const {checkInId, tempItem} = state;

  console.log(tempItem);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(orders, 'orders');

  const [reports, setReports] = useState([]);
  const [orderReportLoading, setOrderReportLoading] = useState(true);
  const [orderReportError, setOrderReportError] = useState(null);

  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  const handleDeliverySuccessModal = () => {
    resetOrderDetailsUpdated();
  };

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
      setOrders(data.data); // Store data in state
      setLoading(false);
    } catch (err) {
      setError('Failed to load orders');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderReports = async () => {
    try {
      const data = await orderReports(); // Call API
      setReports(data); // Store data in state
      setOrderReportLoading(false);
    } catch (err) {
      setOrderReportError('Failed to load orders');
      setOrderReportLoading(false);
    } finally {
      setOrderReportError(false);
      setOrderReportLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchOrderReports();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing
    try {
      await Promise.all([fetchOrders(), fetchOrderReports()]);
    } catch (err) {
      console.log('Refresh failed:', err);
    } finally {
      setRefreshing(false); // Stop refreshing
    }
  };

  const filterData = () => {
    if (!orders) return; // Guard against undefined (though initialized as [])

    if (tempItem.itemType === 'attempted') {
      const updatedOrders = orders.map((item: any) =>
        item.id === tempItem.itemId
          ? {...item, attempted_count: (item.attempted_count || 0) + 1}
          : item,
      );

      setOrders(updatedOrders);
    } else if (tempItem.itemType === 'delivered') {
      const data = orders.filter((item: any) => item.id !== tempItem.itemId);
      setOrders(data);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      filterData();
    }
  }, [tempItem]);

  return (
    <>
      <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
        <GestureHandlerRootView>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#4A90E2']} // Customize refresh indicator color
                progressBackgroundColor="#F5F7FA" // Background color of the refresh indicator
              />
            }>
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
            <CenterModalBox
              isVisible={state.orderDetailsUpdated}
              onBackButtonPress={handleDeliverySuccessModal}
              onBackdropPress={handleDeliverySuccessModal}
              children={
                <OrderDetailsUpdateModal
                  onPressFunction={handleDeliverySuccessModal}
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
              <SpotLight data={reports} name={state?.name || ''} />
            </View>
            <SigninButton
              // onSwipeComplete={handleCheckIn}
              showToast={handleCheckIn}
              setSignIn={setSignIn}
              signIn={checkInId ? true : false}
              setModalVisible={setModalVisible}
            />

            <TouchableOpacity
              style={styles.pharmacy}
              onPress={() => {
                navigate('PharmacyScreen', {});
              }}>
              <CardBoard />
              <Text style={styles.pharmacyText}>Pharmacy wise orders</Text>
              <View style={styles.arrowContainer}>
                <ArrowRight
                  width={SIZES.wp(18 / 4.2)}
                  height={SIZES.wp(18 / 4.2)}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.rowfullView}>
              <Text style={styles.titleText}>New Orders</Text>
              <View style={styles.rowView}>
                <TouchableOpacity
                  onPress={() => {
                    navigate('OrdersPage', {});
                  }}
                  style={[
                    styles.rowView,
                    {
                      height: SIZES.wp(32 / 4.2),
                      paddingHorizontal: SIZES.wp(12 / 4.2),
                      backgroundColor: '#fff',
                      borderRadius: SIZES.wp(8 / 4.2),
                    },
                  ]}>
                  <Text style={styles.buttonText}>View All</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
            style={[
              styles.rowView,
              {
                height: SIZES.wp(32 / 4.2),
                paddingHorizontal: SIZES.wp(12 / 4.2),
                backgroundColor: '#fff',
                borderRadius: SIZES.wp(8 / 4.2),
                marginLeft: SIZES.wp(8 / 4.2),
              },
            ]}>
            <FilterIcon />
          </TouchableOpacity> */}
              </View>
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : error ? (
              <Text style={styles.error}>{error}</Text>
            ) : orders.length === 0 ? (
              <View style={styles.noOrdersContainer}>
                <NoOrder message="No orders assigned yet, stay ready for the next delivery!" />
              </View>
            ) : (
              <OrdersList data={orders} />
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
  pharmacy: {
    height: SIZES.wp(60 / 4.2),
    paddingHorizontal: SIZES.wp(16 / 4.2),
    paddingVertical: SIZES.wp(10 / 4.2),
    marginHorizontal: SIZES.wp(20 / 4.2),
    marginBottom: SIZES.wp(16 / 4.2),
    borderRadius: SIZES.wp(16 / 4.2),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 4,
  },
  pharmacyText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    lineHeight: 17,
    color: '#0A0A0A',
    flex: 1,
  },
  arrowContainer: {
    backgroundColor: '#EEF0F1',
    padding: SIZES.wp(12 / 4.2),
    borderRadius: SIZES.wp(20 / 4.2),
  },
  rowfullView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SIZES.wp(20 / 4.2),
    paddingHorizontal: SIZES.wp(20 / 4.2),
  },
  titleText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(16 / 4.2),
    color: '#28292B',
  },
  buttonText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(12 / 4.2),
    color: COLORS.primary,
    marginRight: SIZES.wp(8 / 4.2),
  },
  noOrdersContainer: {
    paddingTop: SIZES.wp(20 / 4.2),
  },
});
