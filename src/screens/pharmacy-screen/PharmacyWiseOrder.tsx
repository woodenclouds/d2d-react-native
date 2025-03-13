import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import FilterIcon from '@app/assets/icons/filter_icon.svg';
import {navigate, navigateBack} from '@app/services/navigationService';
import {FONTS, SIZE, SIZES} from '@app/themes/themes';
import PharmacyCard from './includes/PharmacyCard';
import HistoryItemCard from '../report-screen/includes/HistoryItemCard';
import {assignedOrders, PharmacyWiseOrders} from '@app/services/api';
import NoOrder from '@app/components/NoOrder';

const {width: screenWidth} = Dimensions.get('window');

const PharmacyWiseOrder = ({route}) => {
  const tabs = ['Pending', 'Picked', 'Attempted'];
  const [activeTab, setActiveTab] = useState(0);
  const contentScrollRef = useRef<ScrollView>(null);

  const pharmacy = route.params?.pharmacy;

  const [modalVisible, setModalVisible] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pickupOrders, setPickupOrders] = useState([]);
  const [pickupLoading, setPickupLoading] = useState(true);
  const [pickupError, setPickupError] = useState(null);

  const [attemptedOrders, setAttemptedOrders] = useState([]);
  const [attemptedLoading, setAttemptedLoading] = useState(true);
  const [attemptedError, setAttemptedError] = useState(null);

  const fetchPendingOrders = async () => {
    try {
      const data = await PharmacyWiseOrders(pharmacy.id, 'ready_to_dispatch'); // Call API

      setOrders(data.data); // Store data in state
      setLoading(false);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchPickupOrders = async () => {
    try {
      const data = await PharmacyWiseOrders(pharmacy.id, 'in_transit'); // Call API

      setPickupOrders(data.data); // Store data in state
      setPickupLoading(false);
    } catch (err) {
      setPickupError('Failed to load orders');
    } finally {
      setPickupLoading(false);
    }
  };

  const fetchAttemptedOrders = async () => {
    try {
      const data = await PharmacyWiseOrders(pharmacy.id, 'attempted'); // Call API

      setAttemptedOrders(data.data); // Store data in state
      setAttemptedLoading(false);
    } catch (err) {
      setAttemptedError('Failed to load orders');
    } finally {
      setAttemptedLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
    fetchPickupOrders();
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

  return (
    <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
      <CommonHeader
        headingText="Pharmacy wise order"
        backArrow={true}
        rightIcon={true}
        icon={<FilterIcon width={24} height={24} />}
        backPress={() => {
          navigateBack();
        }}
        additionIconFunction={() => setModalVisible(true)}
      />
      <ScrollView style={styles.container}>
        <PharmacyCard pharmacy={pharmacy} />
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
                    {tab}
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
                  <ScrollView contentContainerStyle={styles.contentContainer}>
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
                              navigate('DeliveryUpdate', {
                                data: item,
                                type: 'attempted',
                              });
                            }}
                          />
                        ))
                      ) : (
                        <View style={styles.noOrdersContainer}>
                          <NoOrder message="No orders assigned yet, stay ready for the next delivery!" />
                        </View>
                      ))}
                    {index === 1 && // Pickup tab
                      (pickupLoading ? (
                        <ActivityIndicator size="large" color="#4A4D4E" />
                      ) : pickupError ? (
                        <Text style={styles.errorText}>{pickupError}</Text>
                      ) : pickupOrders.length > 0 ? (
                        pickupOrders.map((item, idx) => (
                          <HistoryItemCard
                            key={idx}
                            item={item}
                            onAttemptPress={() => {
                              navigate('DeliveryUpdate', {
                                data: item,
                                type: 'attempted',
                              });
                            }}
                          />
                        ))
                      ) : (
                        <View style={styles.noOrdersContainer}>
                          <NoOrder message="No pickup orders available" />
                        </View>
                      ))}
                    {index === 2 && // Attempted tab
                      (attemptedLoading ? (
                        <ActivityIndicator size="large" color="#4A4D4E" />
                      ) : attemptedError ? (
                        <Text style={styles.errorText}>{attemptedError}</Text>
                      ) : attemptedOrders.length > 0 ? (
                        attemptedOrders.map((item, idx) => (
                          <HistoryItemCard
                            key={idx}
                            item={item}
                            onAttemptPress={() => {
                              navigate('DeliveryUpdate', {
                                data: item,
                                type: 'attempted',
                              });
                            }}
                          />
                        ))
                      ) : (
                        <View style={styles.noOrdersContainer}>
                          <NoOrder message="No attempted orders available" />
                        </View>
                      ))}
                    {/* {index === 3 && ( // Delivered tab
                      <Text>Delivered</Text>
                    )} */}
                  </ScrollView>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default PharmacyWiseOrder;

const styles = StyleSheet.create({
  //   rowView: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     backgroundColor: '#F5F7FA',
  //   },
  //   tabButton: {
  //     width: SIZE.width / 3,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     paddingTop: SIZES.wp(20 / 4.2),
  //     paddingBottom: SIZES.wp(12 / 4.2),
  //     borderBottomWidth: SIZES.wp(1 / 4.2),
  //     borderBottomColor: '#ABABAB',
  //   },
  //   tabButtonText: {
  //     ...FONTS.regular,
  //     lineHeight: 20,
  //     fontSize: SIZES.wp(14 / 4.2),
  //     color: '#ABABAB',
  //     textAlign: 'center',
  //   },
  //   activeTab: {
  //     borderBottomColor: '#666666',
  //     borderBottomWidth: SIZES.wp(2 / 4.2),
  //   },
  //   activeTabText: {
  //     color: '#4A4D4E',
  //   },
  //   container: {
  //     padding: SIZES.wp(20 / 4.2),
  //     flex: 1,
  //   },
  error: {
    color: 'red',
    fontSize: 16,
  },
  noOrders: {
    fontSize: 16,
    fontStyle: 'italic',
  },

  container: {
    width: '100%',
    // paddingHorizontal: SIZES.wp(20 / 4.2),
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
    width: SIZES.wp(`${100 / 3}%`),
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
    minHeight: SIZES.hp('90%'),
    // marginTop: SIZES.wp(16 / 4.2),
    // paddingHorizontal: SIZES.wp(20 / 4.2),
  },
  tabsContainer: {
    // paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: SIZES.wp(20 / 4.2),
    paddingTop: SIZES.wp(16 / 4.2),
    // backgroundColor: '#fff',
    flex: 1,
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
    height: '60%',
  },
});
