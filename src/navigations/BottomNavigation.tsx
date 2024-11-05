import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ReportScreen from '@app/screens/report-screen/ReportScreen';

import {SIZES} from '@app/themes/themes';
import CustomBottomTab from '@app/components/CustomBottomTabs';
import HomeScreen from '@app/screens/home-screen/HomeScreen';
import ProfileScreen from '@app/screens/profile-screen/ProfileScreen';
import MapScreen from '@app/screens/map-screen/MapScreen';

type Props = {};

const BottomNavigation = (props: Props) => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabStyle,
      }}>
      <Tabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomBottomTab tabName="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomBottomTab tabName="Map" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomBottomTab tabName="Report" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomBottomTab tabName="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  tabStyle: {
    height: Platform.OS === 'ios' ? SIZES.wp(80 / 4.2) : SIZES.wp(70 / 4.2),
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? SIZES.wp(20 / 4.2) : 0,
    paddingHorizontal: Platform.OS === 'ios' ? SIZES.wp(10 / 4.2) : 0,
    width: SIZES.wp(378 / 4.2),
    position: 'absolute',
    alignSelf: 'center',
    left: SIZES.wp(20 / 4.2),
    bottom: SIZES.wp(20 / 4.2),
    borderRadius: SIZES.wp(24 / 4.2),
  },
});
