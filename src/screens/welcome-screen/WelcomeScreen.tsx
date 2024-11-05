import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '@app/themes/themes';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import BottomModal from './includes/BottomModal';
import Button from '@app/components/Button';
import {navigate} from '@app/services/navigationService';

type Props = {};

const WelcomeComponent = (props: Props) => {
  return (
    <View>
      <Text style={styles.welcomeText}>
        Improving <Text style={styles.colorText}>patient care</Text> with{' '}
        <Text style={styles.colorText}>top notch</Text> operational{' '}
        <Text style={styles.colorText}>solutions.</Text>
      </Text>
      <Button
        label="Get Started"
        onPressFunction={() => {
          navigate('SignupScreen', {});
        }}
      />
    </View>
  );
};

const WelcomeScreen = (props: Props) => {
  return (
    <SafeAreaWrapper backgroundColor="#fff" barStyle="dark-content">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('@app/assets/images/welcome_image.jpg')} />
        </View>
        <BottomModal
          children={<WelcomeComponent />}
          isVisible={true}
          setVisible={() => {}}
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: SIZES.wp(350 / 4.2),
    marginTop: SIZES.wp(120 / 4.2),
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: SIZES.wp(24 / 4.2),
    ...FONTS.semiBold,
    textAlign: 'center',
    marginHorizontal: SIZES.wp(4 / 4.2),
  },
  colorText: {
    color: COLORS.primary,
  },
});
