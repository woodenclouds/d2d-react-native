import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import BottomModal from '@app/components/BottomModal';
import Button from '@app/components/Button';
import InputBox from '@app/components/InputBox';
import {navigate} from '@app/services/navigationService';
import {useAuth} from '../../context/AuthContext';
import {CommonActions, useNavigation} from '@react-navigation/native';

type Props = {};

type ModalInnertProps = {
  setModalVisible: (value: boolean) => void;
};

const ModalInner = (props: ModalInnertProps) => {
  const navigation = useNavigation();
  const {setModalVisible} = props;
  const {login} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setIsLoading(true);
      const loginResult = await login(email, password); // Get the result
      // Validate the result (ensure it contains expected fields)
      if (!loginResult || !loginResult.access || !loginResult.userId) {
        throw new Error('Login failed: Invalid response from server');
      }
      setModalVisible(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'BottomNavigation'}],
        }),
      );
    } catch (error) {
      console.error('Login error in handleLogin:', error.message); // Debug log
      Alert.alert(
        'Login Failed',
        error.message || 'Invalid credentials or network error',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.headingText}>Sign In</Text>
      <Text style={styles.descriptionText}>
        Login to your account and explore the orders
      </Text>
      <InputBox
        label="Email / Mobile number*"
        placeholder="Enter Email id or mobile number"
        value={email}
        onChangeText={setEmail}
      />
      <InputBox
        label="Password"
        placeholder="Enter your password"
        password={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button label="Login" onPressFunction={handleLogin} loading={isLoading} />
    </View>
  );
};

const SignupScreen = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <SafeAreaWrapper backgroundColor="#fff" barStyle="dark-content">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('@app/assets/images/login_page.jpg')} />
        </View>
        <BottomModal
          children={<ModalInner setModalVisible={setModalVisible} />}
          isVisible={modalVisible}
          setVisible={setModalVisible}
          defaultClose={false}
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
