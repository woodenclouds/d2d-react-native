import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS} from '@app/themes/themes';
import MediCareIcon from '@app/assets/icons/medicare_icon.svg';
import DownArrow from '@app/assets/icons/down_arrow.svg';

type Props = {};

const PickupCard = (props: Props) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6}>
      <View style={styles.iconContainer}>
        <MediCareIcon />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>MediCare Express</Text>
        <Text style={styles.idText}>#124462825374</Text>
      </View>
      <View>
        <DownArrow />
      </View>
    </TouchableOpacity>
  );
};

export default PickupCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    marginVertical: SIZES.wp(20 / 4.2),
    padding: SIZES.wp(16 / 4.2),
    borderRadius: SIZES.wp(16 / 4.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: SIZES.wp(56 / 4.2),
    height: SIZES.wp(56 / 4.2),
    borderRadius: SIZES.wp(100 / 4.2),
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: SIZES.wp(250 / 4.2),
  },
  titleText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(18 / 4.2),
    marginBottom: SIZES.wp(4 / 4.2),
    color: '#272727',
  },
  idText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#676767',
  },
});
