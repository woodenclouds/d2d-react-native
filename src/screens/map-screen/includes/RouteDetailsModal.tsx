import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import Button from '@app/components/Button';
import DeliveryHistoryIcon from '@app/assets/icons/delivery_history_icon.svg';
import NavigateArrow from '@app/assets/icons/navigate_arrow.svg';

type Props = {
  setVisible: (data: boolean) => void;
  onPressFunction?: () => void;
};

const RouteDetailsModal = (props: Props) => {
  const {setVisible, onPressFunction} = props;

  const navigateFunction = () => {
    onPressFunction && onPressFunction();
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.smallDash}></View>
      <View style={styles.titleContainer}>
        <DeliveryHistoryIcon />
        <Text style={styles.titleText}>Order details</Text>
      </View>
      <View style={styles.DashLine}></View>
      <View style={styles.imageContiner}></View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Order type</Text>
        <Text style={styles.detailsText}>Delivery</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Recipient name</Text>
        <Text style={styles.detailsText}>David Abraham</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Phone number</Text>
        <Text style={styles.detailsText}>+1 604-555-1234</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Delivery time</Text>
        <Text style={styles.detailsText}>Between 10:00 am & 05:00 pm</Text>
      </View>

      <View style={[styles.detailsContainer, {alignItems: 'flex-start'}]}>
        <Text style={styles.detailsLabel}>Address</Text>
        <Text style={[styles.detailsText, {textAlign: 'right'}]}>
          2900 Ritter Street, Huntsville, 124 street, Toronto.
        </Text>
      </View>

      <View style={styles.DashLine}></View>
      <Button
        label="Navigate now"
        LeftIcon={<NavigateArrow />}
        onPressFunction={navigateFunction}
        buttonStyle={{marginTop: 0}}
      />
    </View>
  );
};

export default RouteDetailsModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  smallDash: {
    width: SIZES.wp(48 / 4.2),
    height: SIZES.wp(4 / 4.2),
    backgroundColor: '#7E7E7E',
    borderRadius: SIZES.wp(30 / 4.2),
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.wp(20 / 4.2),
    marginBottom: SIZES.wp(16 / 4.2),
  },
  titleText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(16 / 4.2),
    color: '#474747',
    marginLeft: SIZES.wp(12 / 4.2),
  },
  DashLine: {
    width: '100%',
    height: SIZES.wp(1 / 4.2),
    backgroundColor: '#F5F7FA',
    marginBottom: SIZES.wp(20 / 4.2),
  },
  imageContiner: {
    width: '100%',
    height: SIZES.wp(140 / 4.2),
    backgroundColor: '#F5F7FA',
    borderRadius: SIZES.wp(6 / 4.2),
    marginBottom: SIZES.wp(20 / 4.2),
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.wp(20 / 4.2),
  },
  detailsLabel: {
    ...FONTS.regular,
    fontSize: SIZES.wp(13 / 4.2),
    color: '#7F7F7F',
  },
  detailsText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(13 / 4.2),
    color: '#212529',
    maxWidth: SIZES.wp(180 / 4.2),
  },
});
