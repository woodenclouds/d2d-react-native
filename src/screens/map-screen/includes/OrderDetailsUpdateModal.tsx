import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS} from '@app/themes/themes';
import Button from '@app/components/Button';

type Props = {};

const OrderDetailsUpdateModal = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContiner}>
        <Image
          source={require('@app/assets/images/success_tick.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.textStyle}>Order details updated successfully.</Text>
      <Button
        label="Navigate to next order"
        onPressFunction={() => {}}
        buttonStyle={{marginTop: SIZES.wp(32 / 4.2)}}
      />
    </View>
  );
};

export default OrderDetailsUpdateModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  imageContiner: {
    width: SIZES.wp(130 / 4.2),
    height: SIZES.wp(130 / 4.2),
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textStyle: {
    ...FONTS.regular,
    fontSize: SIZES.wp(16 / 4.2),
    color: '#1C1C1C',
    textAlign: 'center',
    // width: SIZES.wp(200 / 4.2),
    alignSelf: 'center',
    marginTop: SIZES.wp(20 / 4.2),
  },
});
