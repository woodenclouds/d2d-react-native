import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from '@app/navigations/Navigation';
import {navigationRef} from '@app/services/navigationService';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
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
