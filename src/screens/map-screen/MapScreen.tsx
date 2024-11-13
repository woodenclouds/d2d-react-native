import {StyleSheet, View} from 'react-native';
import React from 'react';
import Mapbox, {
  MarkerView,
  MapView,
  Camera,
  LocationPuck,
  ShapeSource,
  SymbolLayer,
  Images,
  LineLayer,
} from '@rnmapbox/maps';
import {featureCollection, point} from '@turf/helpers';
import greenPin from '@app/assets/images/green_pin.png';
import directionResponse from './includes/direction.json';

type Props = {};

const MapScreen = (props: Props) => {
  const locationPoints = featureCollection([point([-122.0714058, 37.4116731])]);

  const directionCoordinate = directionResponse?.routes[0].geometry.coordinates;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        styleURL="mapbox://styles/mapbox/light-v11">
        <Camera followZoomLevel={13} followUserLocation />
        <LocationPuck
          pulsing={{isEnabled: true}}
          puckBearingEnabled
          puckBearing="heading"
        />
        <ShapeSource id="locationPin" shape={locationPoints}>
          <SymbolLayer
            id="symbolLocationSymbols"
            style={{
              iconImage: 'greenPin',
              iconAllowOverlap: true,
              iconSize: 0.2,
              iconAnchor: 'bottom',
            }}
          />
          <Images images={{greenPin}} />
        </ShapeSource>
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
                lineColor: '#42A2D9',
                lineCap: 'round',
                lineJoin: 'round',
                lineWidth: 7,
              }}
            />
          </ShapeSource>
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
