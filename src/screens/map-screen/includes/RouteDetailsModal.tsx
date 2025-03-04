import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import Button from '@app/components/Button';
import DeliveryHistoryIcon from '@app/assets/icons/delivery_history_icon.svg';
import NavigateArrow from '@app/assets/icons/navigate_arrow.svg';

type Props = {
  setVisible: (data: boolean) => void;
  onPressFunction?: () => void;
  data: any;
  navigate: any;
};

const RouteDetailsModal = (props: Props) => {
  const {setVisible, onPressFunction, data, navigate} = props;

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
      <View style={styles.greyContainer}>
        <View style={[styles.rowContainer, {marginBottom: SIZES.wp(10 / 4.2)}]}>
          <Text style={styles.detailsLabel}>Order id</Text>
          <Text style={styles.detailsText}>#f098098</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.detailsLabel}>Order type</Text>
          <Text style={styles.detailsText}>{data?.order_type}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Order type</Text>
        <Text style={styles.detailsText}>{data?.order_type}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Recipient name</Text>
        <Text style={styles.detailsText}>{data?.recepient_name}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Phone number</Text>
        <Text style={styles.detailsText}>{data?.recepient_phone}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Delivery time</Text>
        <Text style={styles.detailsText}>
          Between {data?.from_time} & {data?.to_time}
        </Text>
      </View>

      <View style={[styles.detailsContainer, {alignItems: 'flex-start'}]}>
        <Text style={styles.detailsLabel}>Address</Text>
        <Text style={[styles.detailsText, {textAlign: 'right'}]}>
          {data?.address}
        </Text>
      </View>

      <View style={styles.DashLine}></View>
      <View
        style={[
          styles.rowContainer,
          {
            marginBottom: SIZES.wp(8 / 4.2),
          },
        ]}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigate('DeliveryUpdate', {data: data});
            setVisible(false);
          }}>
          <Text style={styles.buttonText}>Delivered</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContainer, {borderColor: '#FF8A3C'}]}>
          <Text style={[styles.buttonText, {color: '#FF8A3C'}]}>
            {data.attempted_count} Attempted
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        label="Navigate to delivery location"
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
  greyContainer: {
    width: '100%',
    padding: SIZES.wp(20 / 4.2),
    backgroundColor: '#F5F7FA',
    borderRadius: SIZES.wp(6 / 4.2),
    marginBottom: SIZES.wp(20 / 4.2),
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '48%',
    borderColor: '#003FF0',
    borderWidth: SIZES.wp(1 / 4.2),
    borderRadius: SIZES.wp(6 / 4.2),
    paddingVertical: SIZES.wp(15 / 4.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#003FF0',
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
