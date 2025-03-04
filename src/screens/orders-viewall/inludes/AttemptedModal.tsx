import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// import SignoutIcon from '@app/assets/icons/signout_icon.svg';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';

type Props = {
  setModalVisible: (value: boolean) => void;
  onPress: () => void;
  item: any;
};

const AttemptedModal = (props: Props) => {
  const {setModalVisible, onPress, item} = props;

  return (
    <View style={styles.container}>
      <View style={styles.rowView}>
        {/* <View>
          <SignoutIcon />
        </View> */}
        <Text style={styles.titleText}>Attempt Confirmation</Text>
      </View>
      <View style={styles.lineView} />
      <Text style={styles.exitText}>Are you sure that you attemted?</Text>
      <View style={styles.rowViewWidth}>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => {
            setModalVisible(false);
          }}>
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonView, styles.colorButton]}
          onPress={onPress}>
          <Text style={[styles.buttonText, {color: '#FAFAFA'}]}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AttemptedModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(18 / 4.2),
    color: '#FF8A3C',
    marginLeft: SIZES.wp(6 / 4.2),
  },
  lineView: {
    height: SIZES.wp(1 / 4.2),
    backgroundColor: '#F5F7FA',
    marginVertical: SIZES.wp(14 / 4.2),
  },
  exitText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#6B6B6B',
  },
  rowViewWidth: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: SIZES.wp(24 / 4.2),
  },
  buttonView: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: SIZES.wp(1 / 4.2),
    borderRadius: SIZES.wp(6 / 4.2),
    borderColor: '#3E3E3E',
    paddingVertical: SIZES.wp(12 / 4.2),
  },
  buttonText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#3E3E3E',
  },
  colorButton: {
    backgroundColor: '#FF8A3C',
    borderColor: '#FF8A3C',
  },
});
