import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS} from '@app/themes/themes';
import CommonRadioButton from '@app/components/CommonRadioButton';

type Props = {};

const PaymentDetailsCard = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Payment Details</Text>
      <View style={styles.boxContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Amount</Text>
          <TextInput style={styles.inputStyle} placeholder="$" value="$420" />
        </View>
        <View>
          <Text style={styles.labelText}>Payment method</Text>
          <CommonRadioButton
            containerStyle={styles.radioButtonStyle}
            selected={true}
            label="Cash"
          />
          <CommonRadioButton
            containerStyle={styles.radioButtonStyle}
            label="Card"
          />
          <CommonRadioButton
            containerStyle={styles.radioButtonStyle}
            label="Cheque"
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentDetailsCard;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.wp(16 / 4.2),
    width: '100%',
  },
  headingText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(16 / 4.2),
    color: '#28292B',
  },
  boxContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: SIZES.wp(16 / 4.2),
    padding: SIZES.wp(20 / 4.2),
    marginTop: SIZES.wp(12 / 4.2),
  },
  labelText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#747474',
    marginBottom: SIZES.wp(8 / 4.2),
  },
  inputContainer: {
    marginBottom: SIZES.wp(16 / 4.2),
  },
  inputStyle: {
    width: '100%',
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: '#747474',
    borderRadius: SIZES.wp(8 / 4.2),
    paddingHorizontal: SIZES.wp(20 / 4.2),
    paddingVertical: SIZES.wp(16 / 4.2),
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#28292B',
  },
  radioButtonStyle: {
    marginBottom: SIZES.wp(8 / 4.2),
  },
});