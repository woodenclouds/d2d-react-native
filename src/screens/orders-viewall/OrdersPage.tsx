import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import {navigateBack} from '@app/services/navigationService';
import FilterIcon from '@app/assets/icons/filter_icon.svg';
import {FONTS, SIZES} from '@app/themes/themes';
import HistoryItemCard from '../report-screen/includes/HistoryItemCard';
import BottomModal from '@app/components/BottomModal';
import FilterModal from './inludes/FilterModal';
import {
  assignedOrders,
  unassignedOrders,
  filteredOrder,
} from '@app/services/api';
import CenterModalBox from '@app/components/CenterModalBox';
import {useAuth} from '../../context/AuthContext';
import OrderDetailsUpdateModal from '../map-screen/includes/OrderDetailsUpdateModal';

type Props = {};

const OrdersPage = (props: Props) => {
  const {state, resetOrderDetailsUpdated} = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openToPickOrders, setOpenToPickOrders] = useState([]);
  const [openToPickLoading, setOpenToPickLoading] = useState(true);
  const [openToPickError, setOpenToPickError] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchUnassignedOrders();
  }, []);

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

  const handleDeliverySuccessModal = () => {
    resetOrderDetailsUpdated();
  };

  const fetchUnassignedOrders = async () => {
    try {
      const data = await unassignedOrders(); // Call API
      setOpenToPickOrders(data); // Store data in state
    } catch (err) {
      setOpenToPickError('Failed to load orders');
    } finally {
      setOpenToPickLoading(false);
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
          <View style={styles.rowView}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                {borderBottomColor: activeTab === 0 ? '#4A4D4E' : '#ABABAB'},
              ]}
              onPress={() => setActiveTab(0)}>
              <Text
                style={[
                  styles.tabButtonText,
                  {color: activeTab === 0 ? '#4A4D4E' : '#ABABAB'},
                ]}>
                Assigned
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                {borderBottomColor: activeTab === 1 ? '#4A4D4E' : '#ABABAB'},
              ]}
              onPress={() => setActiveTab(1)}>
              <Text
                style={[
                  styles.tabButtonText,
                  {color: activeTab === 1 ? '#4A4D4E' : '#ABABAB'},
                ]}>
                Open to pick
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollContainer}>
            {activeTab === 0 ? (
              loading ? (
                <ActivityIndicator size="large" color="#4A4D4E" />
              ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : orders?.data?.length > 0 ? (
                orders?.data?.map((item, index) => (
                  <HistoryItemCard item={item} key={index} />
                ))
              ) : (
                <Text style={styles.errorText}>
                  No assigned orders available
                </Text>
              )
            ) : openToPickLoading ? (
              <ActivityIndicator size="large" color="#4A4D4E" />
            ) : openToPickError ? (
              <Text style={styles.errorText}>{openToPickError}</Text>
            ) : openToPickOrders?.data?.length > 0 ? (
              openToPickOrders?.data?.map((item, index) => (
                <HistoryItemCard item={item} key={index} type={'pickup'} />
              ))
            ) : (
              <Text style={styles.errorText}>
                No open-to-pick orders available
              </Text>
            )}
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
    paddingHorizontal: SIZES.wp(20 / 4.2),
    marginTop: SIZES.wp(16 / 4.2),
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
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.wp(8 / 4.2),
    borderBottomWidth: SIZES.wp(1 / 4.2),
    borderBottomColor: '#666666',
  },
  tabButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#4A4D4E',
    textAlign: 'center',
  },
  scrollContainer: {
    marginTop: SIZES.wp(16 / 4.2),
  },
});
