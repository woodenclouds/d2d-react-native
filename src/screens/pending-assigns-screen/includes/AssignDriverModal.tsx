import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, FONTS, SIZES } from '@app/themes/themes';
import Divider from '@app/components/Divider';
import Button from '@app/components/Button';
import { Dropdown } from 'react-native-element-dropdown';
import { assignDriver, deliveryAgents } from '@app/services/api';
import { useToast } from 'react-native-toast-notifications';
import SelectBox from '@app/components/SelectBox';

interface AssignDriverModalProps {
  orderId: any;
  setModalVisible: (value: boolean) => void;
  fetchUnassignedOrders: () => void;
}

const AssignDriverModal = ({
  orderId,
  setModalVisible,
  fetchUnassignedOrders,
}: AssignDriverModalProps) => {
  const toast = useToast();

  const [value, setValue] = useState(null);
  const [deliveryAgentsData, setDeliveryAgentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDeliveryAgents = async (
    page: number = 1,
    append: boolean = false,
    query: string = searchQuery,
  ) => {
    try {
      const data = await deliveryAgents(page, query);
      const drivers = data.data.map(item => ({ name: item.name, id: item.id }));
      //   console.log(data.data);

      if (append) {
        setDeliveryAgentsData(prev => {
          const existingIds = new Set(prev.map(item => item.id));
          const newDrivers = drivers.filter(
            driver => !existingIds.has(driver.id),
          );
          return [...prev, ...newDrivers];
        });
      } else {
        setDeliveryAgentsData(drivers);
      }

      // Check if there are more pages
      setHasMore(data.pagination.next !== null);
      setCurrentPage(page);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDeliveryAgents();
  }, []);

  const handleLoadMore = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    await fetchDeliveryAgents(currentPage + 1, true, searchQuery);
    setLoadingMore(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset pagination when search query changes
    fetchDeliveryAgents(1, false, query); // Fetch first page with new query
  };

  const CustomToast = () => {
    return (
      <View style={styles.customToast}>
        <Text style={styles.toastText}>Order assigned successfully</Text>
      </View>
    );
  };

  const showToast = () => {
    toast.show('', {
      data: { renderToast: () => CustomToast() },
    });
  };

  const handleAssign = async () => {
    if (!value) {
      Alert.alert('Alert', 'Please select a driver');
      return;
    }
    try {
      setLoading(true);
      const response = await assignDriver(value, orderId);
      if (response.StatusCode === 6000) {
        showToast();
        setValue(null);
        setModalVisible(false);
        fetchUnassignedOrders();
      } else {
        Alert.alert('Alert', 'Failed to assign driver');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <View style={styles.smallDash} />
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>Assign Driver</Text>
        </View>
        <Divider color="#DFDFDF" />

        <View style={[styles.dropdownContainer]}>
          <SelectBox
            label="Drivers"
            options={deliveryAgentsData}
            placeholder="Select drivers"
            boxType="withSearch"
            selected={setValue}
            onEndReached={handleLoadMore}
            hasMore={hasMore}
            loadingMore={loadingMore}
            onSearch={handleSearch}
          />
        </View>
        <Button
          label="Assign"
          buttonStyle={{ marginTop: 0 }}
          onPressFunction={handleAssign}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default AssignDriverModal;

const styles = StyleSheet.create({
  smallDash: {
    width: SIZES.wp(70 / 4.2),
    height: SIZES.wp(6 / 4.2),
    backgroundColor: '#D4D4D4',
    borderRadius: SIZES.wp(30 / 4.2),
    alignSelf: 'center',
    marginBottom: SIZES.wp(12 / 4.2),
  },
  titleText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(18 / 4.2),
    color: '#191919',
    lineHeight: 22,
  },
  dropdownText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#676767',
    lineHeight: 18,
    marginBottom: SIZES.wp(12 / 4.2),
  },
  container: {
    // Add a minHeight to ensure content is visible
    // minHeight: SIZES.wp(180 / 4.2),
    // flex: 1,
    // height: SIZES.wp(300 / 4.2),
    // justifyContent: 'space-between',
  },
  content: {
    // minHeight: SIZES.wp(180 / 4.2)
  },
  dropdown: {
    height: 50,
    borderColor: '#DBDCDF',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    zIndex: 1000,
  },
  placeholderStyle: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#B6B6B6',
    lineHeight: 24,
  },
  selectedTextStyle: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    lineHeight: 24,
    color: '#191919',
  },
  dropdownContainer: {
    marginBottom: SIZES.wp(50 / 4.2),
    zIndex: 1000,
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
  toastText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(12 / 4.2),
    color: COLORS.primary,
  },
});
