import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  View,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import {navigate, navigateBack} from '@app/services/navigationService';
import FilterIcon from '@app/assets/icons/filter_icon.svg';
import {FONTS, SIZES} from '@app/themes/themes';
import HistoryItemCard from '../report-screen/includes/HistoryItemCard';
import BottomModal from '@app/components/BottomModal';
import FilterModal from './inludes/FilterModal';
import {
  assignedOrders,
  pickupOrders,
  filteredOrder,
  orderHistory,
  attemptedOrders,
} from '@app/services/api';
import CenterModalBox from '@app/components/CenterModalBox';
import {useAuth} from '../../context/AuthContext';
import OrderDetailsUpdateModal from '../map-screen/includes/OrderDetailsUpdateModal';
import AttemptedModal from './inludes/AttemptedModal';
import NoOrder from '@app/components/NoOrder';

const {width: screenWidth} = Dimensions.get('window');

type Props = {};

const OrdersPage = (props: Props) => {
  const {state, resetOrderDetailsUpdated} = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const contentScrollRef = useRef<ScrollView>(null);
  const tabs = ['Pending', 'Picked', 'Attempted', 'Delivered'];
  const [selectItem, setSelectItem] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [attemptedModalVisible, setAttemptedModalVisible] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openToPickOrders, setOpenToPickOrders] = useState([]);
  const [openToPickLoading, setOpenToPickLoading] = useState(true);
  const [openToPickError, setOpenToPickError] = useState(null);

  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [deliveredLoading, setDeliveredLoading] = useState(true);
  const [deliveredError, setDeliveredError] = useState(null);

  const [attemptedOrder, setAttemptedOrder] = useState([]);
  const [attemptedLoading, setAttemptedLoading] = useState(true);
  const [attemptedError, setAttemptedError] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchPickupOrders();
    fetchDeliveredOrders();
    fetchAttemptedOrders();
  }, []);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    contentScrollRef.current?.scrollTo({
      x: screenWidth * index,
      animated: true,
    });
  };

  const handleContentScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setActiveTab(index);
  };

  const fetchOrders = async () => {
    try {
      const data = await assignedOrders(); // Call API
      setOrders(data.data); // Store data in state
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleAttemptedModal = () => {
    setAttemptedModalVisible(true);
  };

  const handleDeliverySuccessModal = () => {
    resetOrderDetailsUpdated();
  };

  const fetchPickupOrders = async () => {
    try {
      const data = await pickupOrders(); // Call API
      setOpenToPickOrders(data.data); // Store data in state
    } catch (err) {
      setOpenToPickError('Failed to load orders');
    } finally {
      setOpenToPickLoading(false);
    }
  };

  const fetchDeliveredOrders = async () => {
    try {
      const data = await orderHistory(); // Call API
      setDeliveredOrders(data.data); // Store data in state
    } catch (err) {
      setDeliveredError('Failed to load orders');
    } finally {
      setDeliveredLoading(false);
    }
  };

  const fetchAttemptedOrders = async () => {
    try {
      const data = await attemptedOrders(); // Call API
      setAttemptedOrder(data.data); // Store data in state
    } catch (err) {
      setAttemptedError('Failed to load orders');
    } finally {
      setAttemptedLoading(false);
    }
  };

  const filteredOrders = (
    pharmacy: string,
    order_status: string,
    delivery_type: string,
  ) => {
    console.log(
      activeTab === 0 ? 'assigned' : 'unassigned',
      pharmacy,
      order_status.toLowerCase(),
      delivery_type,
    );

    filteredOrder(
      activeTab === 0 ? 'assigned' : 'unassigned',
      pharmacy,
      order_status.toLowerCase(),
      delivery_type,
    )
      .then(res => {
        console.log(res, 'iiiiii');
        activeTab === 0 ? setOrders(res) : setOpenToPickOrders(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleAttemptPress = () => {
    navigate('DeliveryUpdate', {data: selectItem, type: 'attempted'});
    setAttemptedModalVisible(false);
  };

  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing
    try {
      await Promise.all([
        fetchOrders(),
        fetchPickupOrders(),
        fetchDeliveredOrders(),
        fetchAttemptedOrders(),
      ]);
    } catch (err) {
      console.log('Refresh failed:', err);
    } finally {
      setRefreshing(false); // Stop refreshing
    }
  };

  const filterData = () => {
    // Guard against undefined arrays
    const targetArray =
      activeTab === 0
        ? orders
        : activeTab === 1
        ? openToPickOrders
        : attemptedOrder;

    if (!targetArray) return;

    if (state.tempItem.itemType === 'attempted') {
      const updatedArray = targetArray.map((item: any) =>
        item.id === state.tempItem.itemId
          ? {...item, attempted_count: (item.attempted_count || 0) + 1}
          : item,
      );
      // Update the corresponding state based on activeTab
      activeTab === 0
        ? setOrders(updatedArray)
        : activeTab === 1
        ? setOpenToPickOrders(updatedArray)
        : setAttemptedOrder(updatedArray);
    } else {
      if (state.tempItem.itemStatus === 'delivery') {
        const filteredArray = targetArray.filter(
          (item: any) => item.id !== state.tempItem.itemId,
        );
        // Update the corresponding state based on activeTab
        activeTab === 0
          ? setOrders(filteredArray)
          : activeTab === 1
          ? setOpenToPickOrders(filteredArray)
          : setAttemptedOrder(filteredArray);
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    if (
      orders.length > 0 ||
      openToPickOrders.length > 0 ||
      attemptedOrder.length > 0
    ) {
      filterData();
    }
  }, [state.tempItem]);

  return (
    <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
      <CommonHeader
        headingText="Orders"
        backArrow={true}
        rightIcon={true}
        icon={<FilterIcon />}
        backPress={() => {
          navigateBack();
        }}
        additionIconFunction={() => setModalVisible(true)}
      />
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={tab}
                onPress={() => handleTabPress(index)}
                style={[
                  styles.tabButton,
                  activeTab === index && styles.activeTab,
                ]}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === index && styles.activeTabText,
                  ]}>
                  {tab} (
                  {index === 0
                    ? orders.length
                    : index === 1
                    ? openToPickOrders.length
                    : index === 2
                    ? attemptedOrder.length
                    : deliveredOrders.length}
                  )
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView
            style={styles.scrollContainer}
            ref={contentScrollRef}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleContentScroll}>
            {tabs.map((tab, index) => (
              <View key={tab} style={{width: screenWidth}}>
                <ScrollView
                  contentContainerStyle={styles.contentContainer}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      colors={['#4A90E2']} // Customize refresh indicator color
                      progressBackgroundColor="#F5F7FA" // Background color of the refresh indicator
                    />
                  }>
                  {index === 0 && // Pending tab
                    (loading ? (
                      <ActivityIndicator size="large" color="#4A4D4E" />
                    ) : error ? (
                      <Text style={styles.errorText}>{error}</Text>
                    ) : orders.length > 0 ? (
                      orders.map((item, idx) => (
                        <HistoryItemCard
                          key={idx}
                          item={item}
                          onAttemptPress={() => {
                            handleAttemptedModal();
                            setSelectItem(item);
                          }}
                        />
                      ))
                    ) : (
                      <View style={styles.noOrdersContainer}>
                        <NoOrder message="No orders assigned yet, stay ready for the next delivery!" />
                      </View>
                    ))}
                  {index === 1 && // Picked tab
                    (openToPickLoading ? (
                      <ActivityIndicator size="large" color="#4A4D4E" />
                    ) : openToPickError ? (
                      <Text style={styles.errorText}>{openToPickError}</Text>
                    ) : openToPickOrders.length > 0 ? (
                      openToPickOrders.map((item, idx) => (
                        <HistoryItemCard
                          key={idx}
                          item={item}
                          type={'pickup'}
                          onAttemptPress={() => {
                            handleAttemptedModal();
                            setSelectItem(item);
                          }}
                        />
                      ))
                    ) : (
                      <View style={styles.noOrdersContainer}>
                        <NoOrder message="No open-to-pick orders available" />
                      </View>
                    ))}
                  {index === 2 && // Attempted tab
                    (attemptedLoading ? (
                      <ActivityIndicator size="large" color="#4A4D4E" />
                    ) : attemptedError ? (
                      <Text style={styles.errorText}>{attemptedError}</Text>
                    ) : attemptedOrder.length > 0 ? (
                      attemptedOrder.map((item, idx) => (
                        <HistoryItemCard
                          key={idx}
                          item={item}
                          onAttemptPress={() => {
                            handleAttemptedModal();
                            setSelectItem(item);
                          }}
                          // type={'history'}
                        />
                      ))
                    ) : (
                      <View style={styles.noOrdersContainer}>
                        <NoOrder message="No attempted orders available" />
                      </View>
                    ))}
                  {index === 3 && // Delivered tab
                    (deliveredLoading ? (
                      <ActivityIndicator size="large" color="#4A4D4E" />
                    ) : deliveredError ? (
                      <Text style={styles.errorText}>{deliveredError}</Text>
                    ) : deliveredOrders.length > 0 ? (
                      deliveredOrders.map((item, idx) => (
                        <HistoryItemCard
                          key={idx}
                          item={item}
                          type={'history'}
                        />
                      ))
                    ) : (
                      <View style={styles.noOrdersContainer}>
                        <NoOrder message="No delivered orders available" />
                      </View>
                    ))}
                </ScrollView>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <View>
        <BottomModal
          children={
            <FilterModal
              isVisible={modalVisible}
              setVisible={setModalVisible}
              onPressFunction={filteredOrders}
              activeTab={activeTab}
            />
          }
          isVisible={modalVisible}
          setVisible={setModalVisible}
        />
        <CenterModalBox
          isVisible={attemptedModalVisible}
          backdropOpacity={0.3}
          onBackButtonPress={() => setAttemptedModalVisible(false)}
          onBackdropPress={() => setAttemptedModalVisible(false)}
          children={
            <AttemptedModal
              onPress={handleAttemptPress}
              setModalVisible={setAttemptedModalVisible}
              item={selectItem}
            />
          }
        />
        <CenterModalBox
          isVisible={state.orderDetailsUpdated}
          backdropOpacity={0.3}
          onBackButtonPress={handleDeliverySuccessModal}
          onBackdropPress={handleDeliverySuccessModal}
          children={
            <OrderDetailsUpdateModal
              onPressFunction={handleDeliverySuccessModal}
            />
          }
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default OrdersPage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // paddingHorizontal: SIZES.wp(20 / 4.2),
    // marginTop: SIZES.wp(16 / 4.2),
  },
  mainContainer: {
    // backgroundColor: '#fff',
    borderRadius: SIZES.wp(16 / 4.2),
    // padding: SIZES.wp(16 / 4.2),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    width: SIZES.wp(160 / 4.2),
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.wp(8 / 4.2),
    borderBottomWidth: SIZES.wp(1 / 4.2),
    borderBottomColor: '#ABABAB',
  },
  tabButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#4A4D4E',
    textAlign: 'center',
  },
  scrollContainer: {
    height: SIZES.hp('90%'),
    // marginTop: SIZES.wp(16 / 4.2),
    // paddingHorizontal: SIZES.wp(20 / 4.2),
  },
  tabsContainer: {
    // paddingHorizontal: 16,
    paddingVertical: 12,
    // backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: SIZES.wp(20 / 4.2),
    paddingTop: SIZES.wp(16 / 4.2),
    paddingBottom: SIZES.wp(80 / 4.2),
    // backgroundColor: '#fff',
    // flex: 1,
  },
  activeTab: {
    borderColor: '#666666',
  },
  tabText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#ABABAB',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#666666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noOrdersContainer: {
    height: '80%',
  },
});
