import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS} from '@app/themes/themes';
import CommonRadioButton from '@app/components/CommonRadioButton';
import CommonDashedButton from '@app/components/CommonDashedButton';
import {navigate} from '@app/services/navigationService';

type Props = {
  statusData: Array<any>;
  deliveryStatus: string;
  setDeliveryStatus: (value: string) => void;
};

const DeliveryDetailsCard = (props: Props) => {
  const {statusData, deliveryStatus, setDeliveryStatus} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Delivery Details</Text>
      <View style={styles.boxContainer}>
        <View>
          <Text style={styles.labelText}>Status</Text>
          <View style={styles.radioConainerStyle}>
            {statusData.map((item, index) => (
              <CommonRadioButton
                containerStyle={styles.radioButtonStyle}
                label={item.status}
                selected={deliveryStatus === item.status}
                onPressFunction={() => {
                  setDeliveryStatus(item.status);
                }}
              />
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.labelText}>Signature</Text>
          <CommonDashedButton
            label={'Add Signature'}
            onPressFunction={() => {
              navigate('SignatureScreens', {});
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.labelText}>Image</Text>
          <CommonDashedButton label={'Add Image'} />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.labelText}>Notes</Text>
          <CommonDashedButton label={'Add Notes'} />
        </View>
        <TouchableOpacity style={styles.checkBoxContainer} activeOpacity={0.6}>
          <View style={styles.checkBoxStyle}></View>
          <Text style={styles.checkBoxText}>
            Bulk order (large / heavy orders)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeliveryDetailsCard;

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
  radioConainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.wp(16 / 4.2),
  },
  radioButtonStyle: {
    width: '49%',
  },
  buttonContainer: {
    marginBottom: SIZES.wp(16 / 4.2),
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxStyle: {
    width: SIZES.wp(20 / 4.2),
    height: SIZES.wp(20 / 4.2),
    borderRadius: SIZES.wp(6 / 4.2),
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: '#6A7683',
    marginRight: SIZES.wp(8 / 4.2),
  },
  checkBoxText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#212529',
  },
});
