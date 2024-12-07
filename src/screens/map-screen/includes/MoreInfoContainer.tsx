import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import GreenRoundIcon from '@app/assets/icons/green_round_icon.svg';
import RedRoundIcon from '@app/assets/icons/red_round_icon.svg';
import OrangeRoundIcon from '@app/assets/icons/orange_round_icon.svg';
import BlueRoundIcon from '@app/assets/icons/blue_round_icon.svg';
import SkyBlueRoundIcon from '@app/assets/icons/skyblue_round_icon.svg';

type Props = {
  isVisible?: boolean;
};

const MoreInfoContainer = (props: Props) => {
  const {isVisible} = props;

  return (
    <View style={[styles.container, {display: isVisible ? 'flex' : 'none'}]}>
      <View style={[styles.itemView, {marginBottom: SIZES.wp(17 / 4.2)}]}>
        <GreenRoundIcon />
        <Text style={styles.labelText}>Picked up</Text>
      </View>
      <View style={[styles.itemView, {marginBottom: SIZES.wp(17 / 4.2)}]}>
        <SkyBlueRoundIcon />
        <Text style={styles.labelText}>Pickup</Text>
      </View>
      <View style={[styles.itemView, {marginBottom: SIZES.wp(17 / 4.2)}]}>
        <OrangeRoundIcon />
        <Text style={styles.labelText}>Pending</Text>
      </View>
      <View style={styles.itemView}>
        <RedRoundIcon />
        <Text style={styles.labelText}>Upcoming</Text>
      </View>
      <View style={styles.itemView}>
        <BlueRoundIcon />
        <Text style={styles.labelText}>Pharmacy</Text>
      </View>
    </View>
  );
};

export default MoreInfoContainer;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: SIZES.wp(20 / 4.2),
    padding: SIZES.wp(20 / 4.2),
    flexWrap: 'wrap',
    flexDirection: 'row',
    position: 'absolute',
    top: SIZES.hp(7 / 4.2),
    zIndex: 1,
    alignSelf: 'center',
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.wp(17 / 4.2),
  },
  labelText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(13 / 4.2),
    color: '#212529',
    marginLeft: SIZES.wp(8 / 4.2),
  },
});
