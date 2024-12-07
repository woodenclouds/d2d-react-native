import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SIZES, FONTS} from '@app/themes/themes';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import RecepientDetailsCard from './includes/RecepientDetailsCard';
import DeliveryDetailsCard from './includes/DeliveryDetailsCard';
import PaymentDetailsCard from './includes/PaymentDetailsCard';
import Button from '@app/components/Button';
import {navigateBack} from '@app/services/navigationService';

type Props = {};

const DeliveryUpdate = (props: Props) => {
  const statusData = [
    {
      id: 1,
      status: 'Delivered',
    },
    {
      id: 2,
      status: 'Attempted',
    },
  ];

  const [deliveryStatus, setDeliveryStatus] = useState('Delivered');

  return (
    <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
      <CommonHeader
        headingText="Delivery update"
        backArrow={true}
        backPress={() => {
          navigateBack();
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <RecepientDetailsCard />
        <DeliveryDetailsCard
          statusData={statusData}
          deliveryStatus={deliveryStatus}
          setDeliveryStatus={setDeliveryStatus}
        />
        <PaymentDetailsCard />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          label="Submit"
          onPressFunction={() => {}}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default DeliveryUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.wp(20 / 4.2),
    marginBottom: SIZES.wp(120 / 4.2),
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
