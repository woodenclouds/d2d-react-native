import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import ThreeDots from '@app/assets/icons/three_dots.svg';
import {COLORS, SIZES, FONTS} from '@app/themes/themes';
import TabItems from './includes/TabItems';

type Props = {};

const ProfileScreen = (props: Props) => {
  return (
    <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
      <CommonHeader
        headingText="Profile"
        rightIcon={true}
        icon={<ThreeDots />}
      />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}></View>
          <Text style={styles.nameText}>Dennis Callis</Text>
          <Text style={styles.idText}>ID : 97528</Text>
        </View>
      </View>
      <TabItems />
    </SafeAreaWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: SIZES.wp(20 / 4.2),
    marginTop: SIZES.wp(20 / 4.2),
  },
  topContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.wp(32 / 4.2),
    borderRadius: SIZES.wp(16 / 4.2),
  },
  imageContainer: {
    width: SIZES.wp(88 / 4.2),
    height: SIZES.wp(88 / 4.2),
    borderRadius: SIZES.wp(100 / 4.2),
    backgroundColor: '#F5F7FA',
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: COLORS.primary,
  },
  nameText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(18 / 4.2),
    color: '#272727',
    marginTop: SIZES.wp(16 / 4.2),
    marginBottom: SIZES.wp(8 / 4.2),
  },
  idText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#676767',
  },
});
