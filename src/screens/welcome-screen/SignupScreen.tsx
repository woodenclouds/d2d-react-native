import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import BottomModal from './includes/BottomModal';
import Button from '@app/components/Button';
import InputBox from '@app/components/InputBox';
// import {navigate, navigateBack} from '@app/services/navigationService';

type Props = {
  navigation: any;
};

const ModalInner = (props: Props) => {
  const {navigation} = props;
  return (
    <View>
      <Text style={styles.headingText}>Sign In</Text>
      <Text style={styles.descriptionText}>
        Login to your account and explore the orders
      </Text>
      <InputBox
        label="Email / Mobile number*"
        placeholder="Enter Email id or mobile number"
      />
      <InputBox
        label="Password"
        placeholder="Enter your password"
        password={true}
      />
      <Button
        label="Login"
        onPressFunction={() => {
          navigation.navigate('BottomNavigation');
        }}
      />
    </View>
  );
};

const SignupScreen = (props: Props) => {
  const {navigation} = props;
  return (
    <SafeAreaWrapper backgroundColor="#fff" barStyle="dark-content">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('@app/assets/images/login_page.jpg')} />
        </View>
        <BottomModal
          children={<ModalInner navigation={navigation} />}
          isVisible={true}
          setVisible={() => {}}
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: SIZES.wp(350 / 4.2),
    alignItems: 'center',
  },
  headingText: {
    fontSize: SIZES.wp(28 / 4.2),
    ...FONTS.medium,
    textAlign: 'center',
    color: COLORS.primary,
  },
  descriptionText: {
    fontSize: SIZES.wp(14 / 4.2),
    ...FONTS.medium,
    textAlign: 'center',
    color: COLORS.grey,
    marginTop: SIZES.hp(16 / 4.2),
    marginHorizontal: SIZES.wp(65 / 4.2),
    marginBottom: SIZES.wp(40 / 4.2),
  },
});
