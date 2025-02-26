import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import VioletRoundIcon from '@app/assets/icons/violet_round_icon.svg';
import GreenRoundIcon from '@app/assets/icons/green_round_icon.svg';
import OrangeRoundIcon from '@app/assets/icons/orange_round_icon.svg';
import BlueRoundIcon from '@app/assets/icons/blue_round_icon.svg';

const LABELS = [
  {
    label: 'Pending',
    icon: <VioletRoundIcon />,
  },
  {
    label: 'Picked up',
    icon: <GreenRoundIcon />,
  },
  {
    label: 'Attempted',
    icon: <OrangeRoundIcon />,
  },
  {
    label: 'Pharmacy',
    icon: <BlueRoundIcon />,
  },
];

type Props = {
  isVisible?: boolean;
};

const MoreInfoContainer = (props: Props) => {
  const {isVisible} = props;

  return (
    <View style={[styles.container, {display: isVisible ? 'flex' : 'none'}]}>
      {LABELS.map((item, index) => (
        <View
          key={index}
          style={[styles.itemView, {marginBottom: SIZES.wp(17 / 4.2)}]}>
          {item.icon}
          <Text style={styles.labelText}>{item.label}</Text>
        </View>
      ))}
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
