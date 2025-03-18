import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import { navigateBack } from '@app/services/navigationService';
import CommonHeader from '@app/components/CommonHeader';
import SearchIcon from '@app/assets/icons/search_icon.svg';
import PendingAssignCard from './includes/PendingAssignCard';
import { SIZES } from '@app/themes/themes';

import { unassignedOrders } from '@app/services/api';
import NoOrder from '@app/components/NoOrder';
import BottomModal from '@app/components/BottomModal';
import AssignDriverModal from './includes/AssignDriverModal';

const PendingAssigns = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchUnassignedOrders = async () => {
    try {
      const data = await unassignedOrders();
      setOrders(data.data || []);
      setLoading(false);
    } catch (err) {
      //   console.log(err);
      setError('Failed to load orders');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUnassignedOrders();

    return () => { };
  }, []);

  return (
    <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
      <CommonHeader
        headingText="Pending Assigns"
        backArrow={true}
        rightIcon={true}
        // icon={<SearchIcon width={20} height={20} />}
        backPress={() => {
          navigateBack();
        }}
      // additionIconFunction={handleSearchToggle}
      />
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : orders.length === 0 ? (
          <View style={styles.noOrdersContainer}>
            <NoOrder message="No orders assigned yet, stay ready for the next delivery!" />
          </View>
        ) : (
          orders.map((order, index) => (
            <PendingAssignCard data={order} key={index} setModalVisible={setModalVisible} setSelectedOrder={setSelectedOrder}/>
          ))
        )}
      </ScrollView>
      <BottomModal isVisible={modalVisible} setVisible={setModalVisible} children={<AssignDriverModal orderId={selectedOrder?.id} setModalVisible={setModalVisible} fetchUnassignedOrders={fetchUnassignedOrders}/>} />

    </SafeAreaWrapper>
  );
};

export default PendingAssigns;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.wp(20 / 4.2),
    paddingVertical: SIZES.wp(11 / 4.2),
  },
  noOrdersContainer: {
    paddingTop: SIZES.wp(20 / 4.2),
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
