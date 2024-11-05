import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';

import HomeActiveIcon from '@app/assets/icons/home_active_icon.svg';
import HomeInactiveIcon from '@app/assets/icons/home_inactive_icon.svg';

import MapActiveIcon from '@app/assets/icons/map_active_icon.svg';
import MapInactiveIcon from '@app/assets/icons/map_inactive_icon.svg';

import ReportActiveIcon from '@app/assets/icons/report_active_icon.svg';
import ReportInactiveIcon from '@app/assets/icons/report_inactive_icon.svg';

import ProfileActiveIcon from '@app/assets/icons/profile_active_icon.svg';
import ProfileInactiveIcon from '@app/assets/icons/profile_inactive_icon.svg';

import {FONTS, SIZES} from '@app/themes/themes';

type BottomType = {
  focused: boolean;
  tabName: string;
};

const CustomBottomTab = (props: BottomType) => {
  const {focused, tabName} = props;

  const renderIcon = useMemo(() => {
    switch (tabName) {
      case 'Home':
        return focused ? <HomeActiveIcon /> : <HomeInactiveIcon />;
      case 'Map':
        return focused ? <MapActiveIcon /> : <MapInactiveIcon />;
      case 'Report':
        return focused ? <ReportActiveIcon /> : <ReportInactiveIcon />;
      case 'Profile':
        return focused ? <ProfileActiveIcon /> : <ProfileInactiveIcon />;
    }
  }, [tabName, focused]);

  return (
    <View style={styles.container}>
      <View>{renderIcon}</View>
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderIconstyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    ...FONTS.regular,
    textAlign: 'center',
    fontSize: SIZES.wp(12 / 4.2),
    marginTop: SIZES.wp(5 / 4.2),
  },
});
