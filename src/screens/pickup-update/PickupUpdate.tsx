import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import {SIZES, FONTS} from '@app/themes/themes';
import PickupCard from './includes/PickupCard';
import Button from '@app/components/Button';
import FilterIcon from '@app/assets/icons/filter_icon.svg';
import DeliveryCards from './includes/DeliveryCards';

type Props = {};

const PickupUpdate = (props: Props) => {
  return (
    <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
      <CommonHeader headingText="Pickup Update" backArrow={true} />
      <View style={styles.container}>
        <ScrollView
          style={styles.ScrollContainer}
          showsVerticalScrollIndicator={false}>
          <PickupCard />
          <View style={styles.spacedRowContainer}>
            <Text style={styles.headingText}>Deliveries (11)</Text>
            <View style={styles.rowContainer}>
              <FilterIcon />
              <Text style={styles.filterText}>Filter</Text>
            </View>
          </View>
          <View style={styles.whiteContainer}>
            {Array(10)
              .fill(10)
              .map((_, index) => (
                <DeliveryCards />
              ))}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            label="Pickup"
            onPressFunction={() => {}}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default PickupUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScrollContainer: {
    width: '100%',
    paddingHorizontal: SIZES.wp(20 / 4.2),
  },
  buttonContainer: {
    width: '100%',
    height: SIZES.wp(100 / 4.2),
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.wp(20 / 4.2),
    position: 'absolute',
    bottom: 0,
  },
  buttonStyle: {
    marginTop: SIZES.wp(16 / 4.2),
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
  headingText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(16 / 4.2),
    color: '#28292B',
  },
  filterText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#1C1C1C',
    marginLeft: SIZES.wp(8 / 4.2),
  },
  whiteContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.wp(16 / 4.2),
    paddingBottom: SIZES.wp(20 / 4.2),
    marginTop: SIZES.wp(12 / 4.2),
    borderRadius: SIZES.wp(16 / 4.2),
  },
});
