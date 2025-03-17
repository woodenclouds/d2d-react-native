import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {SIZES} from '@app/themes/themes';
import GetLocation from 'react-native-get-location';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import SwipableView from './includes/SwipableView';
import ReportIcon from '@app/assets/icons/report_icon_blue.svg';
import ReportIconGrey from '@app/assets/icons/report_icon_grey.svg';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {assignedOrders, getDirections, getPharmacies} from '@app/services/api';
import BottomModal from '@app/components/BottomModal';
import CenterModalBox from '@app/components/CenterModalBox';
import RouteDetailsModal from './includes/RouteDetailsModal';
import DestinationReachedModal from './includes/DestinationReachedModal';
import OrderDetailsUpdateModal from './includes/OrderDetailsUpdateModal';
import {navigate} from '@app/services/navigationService';
import {useAuth} from '../../context/AuthContext';
import greenPin from '@app/assets/images/green_pin.png';
import bluePin from '@app/assets/images/blue_pin.png';
import orangePin from '@app/assets/images/orange_pin.png';
import violetPin from '@app/assets/images/violet_pin.png';
import skybluePin from '@app/assets/images/skyblue_pin.png';
import violetBoxPin from '@app/assets/images/violet_box_pin.png';
import skyblueBoxPin from '@app/assets/images/skyblue_box_pin.png';
import selectedSkyblue from '@app/assets/images/selected_skyblue.png';
import selectedViolet from '@app/assets/images/selected_violet.png';
import selectedBlue from '@app/assets/images/selected_blue.png';
import blueCar from '@app/assets/images/blue_car.png';
import {distance} from '@turf/turf'; // Keep Turf for distance calculation
import {point} from '@turf/helpers';
import {openGoogleMapsNavigation} from '@app/utils/navigationUtils';
import MoreInfoContainer from './includes/MoreInfoContainer';

type Props = {};

type RouteParams = {
  data: {
    address: string;
    delivery_day: string;
    from_time: string;
    id: string;
    latitude: number;
    longitude: number;
    order_type: string | null;
    recepient_name: string;
    recepient_phone: string;
    to_time: string;
  };
};

const MapScreen = (props: Props) => {
  const route = useRoute();
  const {state, resetOrderDetailsUpdated} = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailsModal, setDetailsModal] = useState(false);
  const [isDestinationReached, setDestinationReached] = useState(false);
  const [myLocation, setMyLocation] = useState<[number, number] | null>(null);
  const [mapLoader, setMapLoader] = useState(true);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [moreInfoVisible, setMoreInfoVisible] = useState(true);
  const [direction, setDirection] = useState<any>(null);
  const [oderData, setOrderData] = useState<RouteParams['data'] | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const [pharmacyData, setPharmacyData] = useState([]);
  const [pharmacyLoader, setPharmacyLoader] = useState(true);
  const [pharmacyError, setPharmacyError] = useState(null);

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      const data = await getPharmacies(); // Call API
      // const companies = data.data.map(item => item.company_name);

      setPharmacyData(data.data);
      setPharmacyLoader(false);
    } catch (err) {
      console.log(err);
      setPharmacyError(err);
      setPharmacyLoader(false);
    }
  };

  // Get current location
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setMyLocation([location.longitude, location.latitude]);
        setMapLoader(false);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
        setMapLoader(false);
      });
  }, []);

  // Fetch orders and set loading state
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await assignedOrders();
      setOrders(data.data || []);
      if (data.data && data.data.length > 0) {
        setOrderData(data.data[0]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle route params
  useEffect(() => {
    if (route.params) {
      const params = route.params as RouteParams;
      setOrderData(params.data);
      setDetailsModal(true);
    }
  }, [route.params]);

  // Automatically focus on the first order and fetch directions when orders are loaded
  useEffect(() => {
    if (!isLoading && orders.length > 0 && myLocation && mapRef.current) {
      const firstOrderCoordinates = {
        latitude: orders[0].latitude,
        longitude: orders[0].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      mapRef.current.animateToRegion(firstOrderCoordinates, 1000);

      // Fetch directions from myLocation to the first order
      const fetchInitialDirections = async () => {
        try {
          const newDirection = await getDirections(myLocation, [
            orders[0].longitude,
            orders[0].latitude,
          ]);
          setDirection(newDirection);
          setCurrentIndex(0);
        } catch (error) {
          console.error('Failed to fetch initial directions:', error);
        }
      };
      fetchInitialDirections();
    }
  }, [isLoading, orders, myLocation]);

  // Focus camera on the current order when currentIndex changes
  useEffect(() => {
    if (orders[currentIndex] && mapRef.current) {
      const coordinates = {
        latitude: orders[currentIndex].latitude,
        longitude: orders[currentIndex].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      mapRef.current.animateToRegion(coordinates, 1000);
    }
  }, [currentIndex, orders]);

  // Check if current location reaches the destination
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkDistance = () => {
      if (myLocation && orders[currentIndex] && showRoute) {
        const currentOrderLocation = point([
          orders[currentIndex].longitude,
          orders[currentIndex].latitude,
        ]);
        const userLocation = point(myLocation);

        // Calculate distance in kilometers using Turf
        const dist = distance(userLocation, currentOrderLocation, {
          units: 'kilometers',
        });

        // If distance is less than 0.1 km (100 meters), consider it reached
        if (dist < 0.1) {
          setDestinationReached(true);
          clearInterval(intervalId);
        }
      }
    };

    intervalId = setInterval(checkDistance, 1000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [myLocation, orders, currentIndex, showRoute]);

  // Auto-hide moreInfoVisible after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMoreInfoVisible(false);
      setIsFollowingUser(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [moreInfoVisible]);

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, []),
  );

  const handleDeliverySuccessModal = () => {
    resetOrderDetailsUpdated();
  };

  const handleGoogleMapsNavigation = () => {
    openGoogleMapsNavigation(
      orders[currentIndex].latitude,
      orders[currentIndex].longitude,
    );
  };

  if ((isLoading && pharmacyLoader) || mapLoader) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaWrapper backgroundColor="#fff" barStyle="dark-content">
      <CommonHeader
        headingText="Map"
        rightIcon={true}
        icon={moreInfoVisible ? <ReportIcon /> : <ReportIconGrey />}
        additionIconFunction={() => {
          setMoreInfoVisible(true);
        }}
      />
      <GestureHandlerRootView style={styles.container}>
        <MoreInfoContainer isVisible={moreInfoVisible} />
        <MapView
          // provider={PROVIDER_GOOGLE} // Remove if not using Google Maps
          ref={mapRef}
          style={styles.map}
          mapType="terrain"
          initialRegion={{
            latitude: myLocation[1],
            longitude: myLocation[0],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true} // Show user location
          followsUserLocation={isFollowingUser} // Follow user location if enabled
          showsMyLocationButton={true} // Show button to center on user location
        >
          {/* User location marker */}
          {myLocation && (
            <Marker
              coordinate={{
                latitude: myLocation[1],
                longitude: myLocation[0],
              }}
              title="My Location">
              <Image
                source={blueCar}
                style={{width: SIZES.wp(40 / 4.2), height: SIZES.wp(40 / 4.2)}}
                resizeMode="contain"
              />
            </Marker>
          )}

          {/* Order markers */}
          {orders.map((order, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: order.latitude,
                longitude: order.longitude,
              }}
              title={order.recepient_name}>
              <Image
                source={
                  // order.is_pickup === true && order.next_action === 'pickup' ?
                  order.is_pickup === false
                    ? order.next_action === 'delivery'
                      ? skybluePin
                      : violetPin
                    : order.next_action === 'delivery'
                    ? skyblueBoxPin
                    : violetBoxPin
                }
                style={{
                  width: SIZES.wp(40 / 4.2),
                  height: SIZES.wp(40 / 4.2),
                }}
                resizeMode="contain"
              />

              {index === currentIndex && (
                <Image
                  source={
                    order.next_action === 'delivery'
                      ? selectedSkyblue
                      : selectedViolet
                  }
                  style={{
                    width: SIZES.wp(25 / 4.2),
                    height: SIZES.wp(25 / 4.2),
                    position: 'absolute',
                    top: SIZES.wp(15 / 4.2),
                    left: SIZES.wp(7.5 / 4.2),
                  }}
                  resizeMode="contain"
                />
              )}
            </Marker>
          ))}
          {pharmacyData.map((pharmacy, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: pharmacy?.location_data?.latitude,
                longitude: pharmacy.location_data?.longitude,
              }}
              title={pharmacy.name}>
              <Image
                source={bluePin}
                style={{
                  width: SIZES.wp(40 / 4.2),
                  height: SIZES.wp(40 / 4.2),
                }}
                resizeMode="contain"
              />
            </Marker>
          ))}

          {/* Draw route if available */}
          {/* {showRoute && direction?.routes?.[0]?.geometry?.coordinates && (
            <Polyline
              coordinates={direction.routes[0].geometry.coordinates.map(
                ([lng, lat]: [number, number]) => ({
                  latitude: lat,
                  longitude: lng,
                }),
              )}
              strokeColor="#0144FF"
              strokeWidth={7}
              lineCap="round"
              lineJoin="round"
            />
          )} */}
        </MapView>

        <SwipableView
          points={orders}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onSwipeEnd={() => {
            setIsFollowingUser(false);
            setShowRoute(false);
            setOrderData(orders[currentIndex]);
          }}
          setDetailsModal={setDetailsModal}
        />

        <View>
          <BottomModal
            children={
              <RouteDetailsModal
                setVisible={setDetailsModal}
                onPressFunction={handleGoogleMapsNavigation}
                data={oderData}
                navigate={navigate}
              />
            }
            isVisible={detailsModal}
            setVisible={setDetailsModal}
          />
        </View>

        <View>
          <CenterModalBox
            isVisible={isDestinationReached}
            backdropOpacity={0.3}
            onBackButtonPress={() => {
              setDestinationReached(false);
            }}
            onBackdropPress={() => {
              setDestinationReached(false);
            }}
            children={
              <DestinationReachedModal
                onPressFunction={() => {
                  setDestinationReached(false);
                  navigate('DeliveryUpdate', {
                    data: orders[currentIndex],
                    type: 'delivered',
                  });
                }}
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
      </GestureHandlerRootView>
    </SafeAreaWrapper>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
