import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import {SIZES, COLORS, FONTS} from '@app/themes/themes';
import SignatureScreen from 'react-native-signature-canvas';
import Button from '@app/components/Button';
import {navigateBack} from '@app/services/navigationService';

type Props = {};

const SignatureScreens = (props: Props) => {
  const signatureRef = useRef<SignatureScreen | null>(null);

  const clearSignature = () => {
    signatureRef.current?.clearSignature();
  };

  const style = `
  .m-signature-pad--footer {
    display: none; 
    margin: 0px;
  } 
  .m-signature-pad {
    font-size: 10px;
    width: 100%;
    height: 100vh;
    background-color: #fff;
  }`;

  return (
    <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
      <CommonHeader
        headingText="Signature"
        backArrow={true}
        backPress={() => navigateBack()}
      />
      <View style={styles.container}>
        <View style={styles.signatureScreen}>
          <TouchableOpacity style={styles.clearButton} onPress={clearSignature}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
          <SignatureScreen
            ref={signatureRef}
            webStyle={style}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label="Submit"
          onPressFunction={() => {
            navigateBack();
          }}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default SignatureScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.wp(20 / 4.2),
  },
  signatureScreen: {
    backgroundColor: '#fff',
    borderRadius: SIZES.wp(16 / 4.2),
    width: '100%',
    height: SIZES.hp(300 / 4.2),
    marginTop: SIZES.wp(20 / 4.2),
    overflow: 'hidden',
  },
  clearButton: {
    position: 'absolute',
    paddingHorizontal: SIZES.wp(16 / 4.2),
    paddingVertical: SIZES.wp(8 / 4.2),
    borderRadius: SIZES.wp(8 / 4.2),
    backgroundColor: '#fff',
    top: SIZES.wp(20 / 4.2),
    left: SIZES.wp(20 / 4.2),
    zIndex: 1,
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: '#6A7683',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    ...FONTS.medium,
    color: '#6A7683',
    fontSize: SIZES.wp(12 / 4.2),
  },
  buttonContainer: {
    width: '100%',
    height: SIZES.wp(100 / 4.2),
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.wp(20 / 4.2),
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  buttonStyle: {
    marginTop: SIZES.wp(16 / 4.2),
  },
});
