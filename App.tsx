import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  AppState,
  Platform,
  Alert,
  Linking,
  AppStateStatus,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from '@app/navigations/Navigation';
import {navigationRef} from '@app/services/navigationService';
import {ToastProvider} from 'react-native-toast-notifications';

type Props = {};

const App = () => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
      }
      if (granted) {
        setAppState(nextAppState);
        setLocationPermission(granted);
      }
    };

    // Add the event listener
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // This function is returned by 'addEventListener' and can be called to unsubscribe
    return () => {
      subscription.remove(); // New method to remove the listener
    };
  }, [appState]);

  const checkAndRequestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          Alert.alert(
            'Location permission denied',
            'To use this feature, please grant location permission in your app settings.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
            ],
            {cancelable: true},
          );
        }
      } catch (error) {
        console.warn(error);
        return false;
      }
    }
  };

  const checkLocationPermissions = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (Platform.OS === 'android') {
      setLocationPermission(granted);
      if (!granted) {
        checkAndRequestLocationPermission();
      }
    }
  };

  useEffect(() => {
    checkLocationPermissions();

    return () => {};
  }, [locationPermission]);

  return (
    <ToastProvider
      duration={1000}
      renderToast={toastOptions => {
        const RenderToast = toastOptions.data.renderToast;

        return <RenderToast />;
      }}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <Navigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </ToastProvider>
  );
};

export default App;
