import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS} from '@app/themes/themes';
import Button from '@app/components/Button';

type Props = {
  onPressFunction?: () => void;
};

const DestinationReachedModal = (props: Props) => {
  const {onPressFunction} = props;

  return (
    <View style={styles.container}>
      <View style={styles.imageContiner}>
        <Image
          source={require('@app/assets/images/destination_reached.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.textStyle}>Destination reached successfully</Text>
      <Button
        label="Continue"
        onPressFunction={onPressFunction}
        buttonStyle={{marginTop: SIZES.wp(32 / 4.2)}}
      />
    </View>
  );
};

export default DestinationReachedModal;

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
    width: SIZES.wp(200 / 4.2),
    alignSelf: 'center',
    marginTop: SIZES.wp(20 / 4.2),
  },
});
