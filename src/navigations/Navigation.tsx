import React from 'react';
import {RootStackType} from '@app/navigations/NavigationType';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '@app/screens/welcome-screen/WelcomeScreen';
import SignupScreen from '@app/screens/welcome-screen/SignupScreen';
import NotificationScreen from '@app/screens/notification-screen/NotificationScreen';
import BottomNavigation from './BottomNavigation';
import DeliveryUpdate from '@app/screens/delivery-update/DeliveryUpdate';
import SignatureScreens from '@app/screens/signature-screen/SignatureScreens';
import PickupUpdate from '@app/screens/pickup-update/PickupUpdate';

const Navigation = () => {
  const Stack = createNativeStackNavigator<RootStackType>();

  return (
    <React.Fragment>
      <Stack.Navigator
        initialRouteName={'BottomNavigation'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'WelcomeScreen'} component={WelcomeScreen} />
        <Stack.Screen name={'SignupScreen'} component={SignupScreen} />
        <Stack.Screen name={'BottomNavigation'} component={BottomNavigation} />
        <Stack.Screen
          name={'NotificationScreen'}
          component={NotificationScreen}
        />
        <Stack.Screen name={'DeliveryUpdate'} component={DeliveryUpdate} />
        <Stack.Screen name={'SignatureScreens'} component={SignatureScreens} />
        <Stack.Screen name={'PickupUpdate'} component={PickupUpdate} />
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default Navigation;
