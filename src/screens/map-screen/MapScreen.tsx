import {StyleSheet, Text, View} from 'react-native';
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

type Props = {};

const accessToken =
  'pk.eyJ1Ijoic3lkLWFhbWlyIiwiYSI6ImNtMzlydG10cjE3NXQybHJ4cXJlOGR4dW0ifQ.ueSpn_8F4nz3cExguWjqEQ';

Mapbox.setAccessToken(accessToken);

const MapScreen = (props: Props) => {
  const [direction, setDirection] = useState();
  const [myLocation, setMyLocation] = useState<[number, number] | null>(null);
  const [moreInfoVisible, setMoreInfoVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cameraRef = useRef<Mapbox.Camera | null>(null);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [isDestinationReached, setDestinationReached] = useState(true);
  const [isOrderDetailsUpdated, setOrderDetailsUpdated] = useState(false);

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
  })
    .then(location => {
      // console.log(location);
      setMyLocation([location.longitude, location.latitude]);
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    });

  const points = [
    point([76.043933, 11.04665], {index: 0}),
    point([76.04809, 11.047694], {index: 1}),
    point([76.04012, 11.050703], {index: 2}),
    point([76.037935, 11.051412], {index: 3}),
    point([76.0365309, 11.0512277], {index: 4}),
    point([76.0416527, 11.0552815], {index: 5}),
    point([76.0506219, 11.0493513], {index: 6}),
    point([76.0408297, 11.0483076], {index: 7}),
    point([76.0427981, 11.0545892], {index: 8}),
    point([76.0422519, 11.0490314], {index: 9}),
  ];

  const locationPoints = featureCollection(points);

  const directionCoordinate = direction?.routes?.[0]?.geometry.coordinates;

  const onPointPress = async () => {
    const newDirection = await getDirections(
      myLocation,
      points[currentIndex].geometry.coordinates,
    );
    setDirection(newDirection);
  };

  useEffect(() => {
    if (cameraRef.current && points[currentIndex]) {
      const coordinates = points[currentIndex].geometry.coordinates;

      cameraRef.current?.setCamera({
        centerCoordinate: coordinates,
        zoomLevel: 15,
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMoreInfoVisible(false);
      setIsFollowingUser(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [moreInfoVisible]);

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

            <ShapeSource id="locationPin" shape={locationPoints}>
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
            <ShapeSource id="locationPin" shape={locationPoints}>
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
            {directionCoordinate && (
              <ShapeSource
                id="routeSource"
                lineMetrics
                shape={{
                  properties: {},
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: directionCoordinate,
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
            )}
          </MapView>
          <SwipableView
            points={points}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onSwipeEnd={() => setIsFollowingUser(false)}
            setDetailsModal={setDetailsModal}
          />
          <View>
            <BottomModal
              children={
                <RouteDetailsModal
                  setVisible={setDetailsModal}
                  onPressFunction={onPointPress}
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
                    // setDestinationReached(false);
                    navigate('DeliveryUpdate', {});
                  }}
                />
              }
            />
            <CenterModalBox
              isVisible={isOrderDetailsUpdated}
              backdropOpacity={0.3}
              onBackButtonPress={() => {
                setOrderDetailsUpdated(false);
              }}
              onBackdropPress={() => {
                setOrderDetailsUpdated(false);
              }}
              children={<OrderDetailsUpdateModal />}
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
});
