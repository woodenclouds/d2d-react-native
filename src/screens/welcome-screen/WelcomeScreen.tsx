import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '@app/themes/themes';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import BottomModal from '@app/components/BottomModal';
import Button from '@app/components/Button';
import {navigate} from '@app/services/navigationService';

type Props = {};

type WelcomeComponentProps = {
  setModalVisible: (value: boolean) => void;
};

const WelcomeComponent = (props: WelcomeComponentProps) => {
  const {setModalVisible} = props;

  return (
    <View>
      <Text style={styles.colorText}>Fast & Reliable</Text>
      <Text style={styles.welcomeText}>Pharmacy Delivery</Text>
      <Button
        label="Get Started"
        onPressFunction={() => {
          setModalVisible(false);
          navigate('SignupScreen', {});
        }}
      />
    </View>
  );
};

const WelcomeScreen = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <SafeAreaWrapper backgroundColor="#fff" barStyle="dark-content">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('@app/assets/images/welcome_image.jpg')} />
        </View>
        <BottomModal
          children={<WelcomeComponent setModalVisible={setModalVisible} />}
          isVisible={modalVisible}
          setVisible={setModalVisible}
          defaultClose={false}
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
    fontSize: SIZES.wp(24 / 4.2),
    ...FONTS.semiBold,
    textAlign: 'center',
  },
});
