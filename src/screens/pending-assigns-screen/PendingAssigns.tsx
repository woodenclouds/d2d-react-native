import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
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
import CenterModalBox from '@app/components/CenterModalBox';

const PendingAssigns = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  // Pagination state
  const [pagination, setPagination] = useState({
    current_page: 1,
    next: null,
    page_size: 20,
    previous: null,
    total_items: 0,
    total_pages: 1
  });

  const fetchUnassignedOrders = async (page = 1, shouldAppend = false) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const data = await unassignedOrders(page);
      console.log(data, 'data');
      if (shouldAppend && page > 1) {
        setOrders(prevOrders => [...prevOrders, ...(data.data || [])]);
      } else {
        setOrders(data.data || []);
      }

      if (data.pagination) {
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUnassignedOrders();
    return () => { };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUnassignedOrders(1, false);
  }

  const loadMoreOrders = useCallback(() => {
    if (!loadingMore && pagination.next) {
      fetchUnassignedOrders(pagination.current_page + 1, true);
    }
  }, [loadingMore, pagination.next, pagination.current_page]);

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#007bff" />
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <PendingAssignCard
      data={item}
      key={index}
      setModalVisible={setModalVisible}
      setSelectedOrder={setSelectedOrder}
    />
  );

  const ListEmptyComponent = () => {
    if (loading) return null;

    return (
      <View style={styles.noOrdersContainer}>
        <NoOrder message="No orders assigned yet, stay ready for the next delivery!" />
      </View>
    );
  };


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

      {loading && !refreshing ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id || index}`}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={renderFooter}
          onEndReached={loadMoreOrders}
          onEndReachedThreshold={0.3}
          refreshing={refreshing}
          onRefresh={onRefresh}
          />
      )}
      <BottomModal
        isVisible={modalVisible}
        setVisible={setModalVisible}
        children={
          <AssignDriverModal
            orderId={selectedOrder?.id}
            setModalVisible={setModalVisible}
            fetchUnassignedOrders={fetchUnassignedOrders}
          />
        }
      />

    </SafeAreaWrapper>
  );
};

export default PendingAssigns;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: SIZES.wp(20 / 4.2),
    paddingVertical: SIZES.wp(11 / 4.2),
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.wp(20 / 4.2),
  },
  noOrdersContainer: {
    paddingTop: SIZES.wp(20 / 4.2),
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  footerLoader: {
    paddingVertical: SIZES.wp(20 / 4.2),
    alignItems: 'center',
  },
});
