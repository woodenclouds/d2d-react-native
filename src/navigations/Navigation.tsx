import React from 'react';
import {RootStackType} from '@app/navigations/NavigationType';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '@app/screens/welcome-screen/WelcomeScreen';
import SignupScreen from '@app/screens/welcome-screen/SignupScreen';
import NotificationScreen from '@app/screens/notification-screen/NotificationScreen';
import BottomNavigation from './BottomNavigation';

const Navigation = () => {
  const Stack = createNativeStackNavigator<RootStackType>();

  return (
    <React.Fragment>
      <Stack.Navigator
        initialRouteName={'WelcomeScreen'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'WelcomeScreen'} component={WelcomeScreen} />
        <Stack.Screen name={'SignupScreen'} component={SignupScreen} />
        <Stack.Screen name={'BottomNavigation'} component={BottomNavigation} />
        <Stack.Screen
          name={'NotificationScreen'}
          component={NotificationScreen}
        />
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default Navigation;
