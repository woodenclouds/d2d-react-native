import {StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SIZES} from '@app/themes/themes';
import Mapbox, {
  MarkerView,
  MapView,
  Camera,
  LocationPuck,
  ShapeSource,
  SymbolLayer,
  Images,
  LineLayer,
  UserLocation,
  CircleLayer,
} from '@rnmapbox/maps';
import {featureCollection, point} from '@turf/helpers';
import {distance} from '@turf/turf'; // Import distance function from Turf
import greenPin from '@app/assets/images/green_pin.png';
import blueCar from '@app/assets/images/blue_car.png';
import directionResponse from './includes/direction.json';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import ReportIcon from '@app/assets/icons/report_icon_blue.svg';
import ReportIconGrey from '@app/assets/icons/report_icon_grey.svg';
import MoreInfoContainer from './includes/MoreInfoContainer';
import SwipableView from './includes/SwipableView';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {getDirections} from '@app/services/api';
import BottomModal from '@app/components/BottomModal';
import CenterModalBox from '@app/components/CenterModalBox';
import RouteDetailsModal from './includes/RouteDetailsModal';
import GetLocation from 'react-native-get-location';
import DestinationReachedModal from './includes/DestinationReachedModal';
import OrderDetailsUpdateModal from './includes/OrderDetailsUpdateModal';
import {navigate} from '@app/services/navigationService';
import {assignedOrders} from '@app/services/api';
import {useAuth} from '../../context/AuthContext';
import {useRoute} from '@react-navigation/native';
import {Linking} from 'react-native';
import {openGoogleMapsNavigation} from '@app/utils/navigationUtils'; // Import the new function name (adjust path)

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

const accessToken =
  'pk.eyJ1Ijoic3lkLWFhbWlyIiwiYSI6ImNtMzlydG10cjE3NXQybHJ4cXJlOGR4dW0ifQ.ueSpn_8F4nz3cExguWjqEQ';

Mapbox.setAccessToken(accessToken);

const MapScreen = (props: Props) => {
  const route = useRoute();
  const [direction, setDirection] = useState<any>(null);
  const [myLocation, setMyLocation] = useState<[number, number] | null>(null);
  const [moreInfoVisible, setMoreInfoVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cameraRef = useRef<Mapbox.Camera | null>(null);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [isDestinationReached, setDestinationReached] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRoute, setShowRoute] = useState(false);
  const {state, resetOrderDetailsUpdated} = useAuth();
  const [isOrderDetailsUpdated, setOrderDetailsUpdated] = useState(
    state.orderDetailsUpdated,
  );

  const [oderData, setOrderData] = useState<RouteParams['data'] | null>(null);

  useEffect(() => {
    if (route.params) {
      const params = route.params as RouteParams;
      setOrderData(params.data);
      setDetailsModal(true);
    }
  }, [route.params]);

  // Get current location
  useEffect(() => {
    const locationSubscription = GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setMyLocation([location.longitude, location.latitude]);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });

    // Clean up location subscription if needed
    return () => {
      // Note: GetLocation doesn't provide a clear method in its current form, but you can handle cleanup if using a different method
    };
  }, []);

  // Fetch orders and set loading state
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const data = await assignedOrders();
        setOrders(data.data);
        setOrderData(data.data[0]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Automatically point to the first order and fetch directions when orders are loaded
  useEffect(() => {
    if (!isLoading && orders.length > 0 && myLocation) {
      // Set the camera to focus on the first order's location
      const firstOrderCoordinates = [orders[0].longitude, orders[0].latitude];
      if (cameraRef.current) {
        cameraRef.current.setCamera({
          centerCoordinate: firstOrderCoordinates,
          zoomLevel: 15,
        });
      }

      // Fetch directions from myLocation to the first order
      const fetchInitialDirections = async () => {
        try {
          const newDirection = await getDirections(
            myLocation,
            firstOrderCoordinates,
          );
          setDirection(newDirection);
          setCurrentIndex(0); // Set the initial currentIndex to 0 for the first order
        } catch (error) {
          console.error('Failed to fetch initial directions:', error);
        }
      };
      fetchInitialDirections();
    }
  }, [isLoading, orders, myLocation]);

  // Create GeoJSON points from orders
  const orderPoints = featureCollection(
    orders.map((order, index) =>
      point([order.longitude, order.latitude], {index}),
    ),
  );

  const handleDeliverySuccessModal = () => {
    setOrderDetailsUpdated(true);
    resetOrderDetailsUpdated();
  };

  const handleGoogleMapsNavigation = () => {
    if (!myLocation || !orders[currentIndex]) return;
    openGoogleMapsNavigation(
      orders[currentIndex].latitude,
      orders[currentIndex].longitude,
    ); // Call with destination coordinates
  };

  // const onPointPress = async () => {
  //   // if (!myLocation || !orders[currentIndex]) return;
  //   // const newDirection = await getDirections(myLocation, [
  //   //   orders[currentIndex].longitude,
  //   //   orders[currentIndex].latitude,
  //   // ]);
  //   // setDirection(newDirection);
  //   // setShowRoute(true);

  //   if (!myLocation || !orders[currentIndex]) return;

  //   // Construct Google Maps URL with current location and destination
  //   const destinationLat = orders[currentIndex].latitude;
  //   const destinationLng = orders[currentIndex].longitude;
  //   const sourceLat = myLocation[1]; // Latitude is the second element in [longitude, latitude]
  //   const sourceLng = myLocation[0]; // Longitude is the first element in [longitude, latitude]

  //   // Google Maps URL for navigation (walking mode, as per your getDirections)
  //   const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${sourceLat},${sourceLng}&destination=${destinationLat},${destinationLng}&travelmode=walking`;

  //   try {
  //     // Attempt to open the Google Maps app
  //     const supported = await Linking.canOpenURL(googleMapsUrl);
  //     if (supported) {
  //       await Linking.openURL(googleMapsUrl);
  //     } else {
  //       console.log(
  //         'Google Maps app is not installed. Falling back to browser.',
  //       );
  //       // Optionally open in a web browser if the app isn’t installed
  //       await Linking.openURL(googleMapsUrl);
  //     }
  //   } catch (error) {
  //     console.error('Failed to open Google Maps:', error);
  //     Alert.alert(
  //       'Error',
  //       'Could not open Google Maps. Please ensure the app is installed.',
  //     );
  //   }
  // };

  useEffect(() => {
    if (cameraRef.current && orders[currentIndex]) {
      const coordinates = [
        orders[currentIndex].longitude,
        orders[currentIndex].latitude,
      ];

      cameraRef.current?.setCamera({
        centerCoordinate: coordinates,
        zoomLevel: 15,
      });
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
          // Adjust threshold as needed (e.g., 0.05 km for 50 meters)
          setDestinationReached(true);
          clearInterval(intervalId); // Stop checking once destination is reached
        }
      }
    };

    // Start checking every second
    intervalId = setInterval(checkDistance, 1000);

    // Cleanup interval on unmount or when dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [myLocation, orders, currentIndex, showRoute]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMoreInfoVisible(false);
      setIsFollowingUser(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [moreInfoVisible]);

  if (isLoading) {
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
      <GestureHandlerRootView>
        <View style={styles.container}>
          <MoreInfoContainer isVisible={moreInfoVisible} />
          <MapView
            style={styles.container}
            styleURL="mapbox://styles/mapbox/light-v11">
            <Camera
              ref={cameraRef}
              followZoomLevel={15}
              followUserLocation={isFollowingUser}
            />
            <LocationPuck
              pulsing={{isEnabled: true}}
              puckBearingEnabled
              puckBearing="heading"
              topImage="blueCar"
              scale={['interpolate', ['linear'], ['zoom'], 10, 1.0, 20, 4.0]}
            />

            <ShapeSource id="locationPin" shape={orderPoints}>
              <CircleLayer
                id="circleHalo"
                style={{
                  circleRadius: [
                    'case',
                    ['==', ['get', 'index'], currentIndex],
                    30,
                    0,
                  ],
                  circleColor: '#93E68F',
                  circleBlur: 1,
                  circleTranslate: [0, -10],
                  circleRadiusTransition: {
                    duration: 300,
                    delay: 0,
                  },
                }}
              />
            </ShapeSource>
            <ShapeSource id="locationPin" shape={orderPoints}>
              <SymbolLayer
                id="locationSymbol"
                style={{
                  iconImage: 'greenPin',
                  iconAllowOverlap: true,
                  iconSize: 0.2,
                  iconAnchor: 'bottom',
                }}
              />
            </ShapeSource>
            <Images images={{blueCar}} />
            <Images images={{greenPin}} />
            {/* {showRoute && direction?.routes?.[0]?.geometry.coordinates && (
              <ShapeSource
                id="routeSource"
                lineMetrics
                shape={{
                  properties: {},
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: direction.routes[0].geometry.coordinates,
                  },
                }}>
                <LineLayer
                  id="exampleLineLayer"
                  style={{
                    lineColor: '#0144FF',
                    lineCap: 'round',
                    lineJoin: 'round',
                    lineWidth: 7,
                  }}
                />
              </ShapeSource>
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
                    navigate('DeliveryUpdate', {data: orders[currentIndex]});
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
