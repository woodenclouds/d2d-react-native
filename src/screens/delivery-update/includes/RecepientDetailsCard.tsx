import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS} from '@app/themes/themes';
import ProfileIcon from '@app/assets/icons/profile_icon.svg';
import PhoneIcon from '@app/assets/icons/phone_icon.svg';

type Props = {};

const RecepientDetailsCard = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}></View>
      <View style={styles.spacedRowContainer}>
        <View style={styles.rowContainer}>
          <ProfileIcon />
          <Text style={styles.labelText}>Recipient name</Text>
        </View>
        <Text style={styles.detailText}>David Abraham</Text>
      </View>
      <View
        style={[styles.spacedRowContainer, {marginTop: SIZES.wp(12 / 4.2)}]}>
        <View style={styles.rowContainer}>
          <PhoneIcon />
          <Text style={styles.labelText}>Phone number</Text>
        </View>
        <Text style={styles.detailText}>+1 123 456 789</Text>
      </View>
    </View>
  );
};

export default RecepientDetailsCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: SIZES.wp(20 / 4.2),
    padding: SIZES.wp(20 / 4.2),
    borderRadius: SIZES.wp(16 / 4.2),
  },
  imageContainer: {
    backgroundColor: '#e4e6e9',
    width: '100%',
    height: SIZES.wp(120 / 4.2),
    borderRadius: SIZES.wp(6 / 4.2),
    marginBottom: SIZES.wp(20 / 4.2),
  },
  spacedRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#7F7F7F',
    marginLeft: SIZES.wp(12 / 4.2),
  },
  detailText: {
    ...FONTS.regular,
    color: '#212529',
    fontSize: SIZES.wp(14 / 4.2),
  },
});