import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTS, SIZES} from '@app/themes/themes';
import Button from '@app/components/Button';
import FilterIcon from '@app/assets/icons/filter_icon.svg';
import SelectBox from '@app/components/SelectBox';
import CommonRadioButton from '@app/components/CommonRadioButton';
import {getPharmacies} from '@app/services/api';

type Props = {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  onPressFunction?: (
    pharmacy: string,
    order_status: string,
    delivery_type: string,
  ) => void;
  activeTab?: number;
};

const FilterModal = (props: Props) => {
  const {setVisible, isVisible, onPressFunction, activeTab} = props;
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState('Normal');
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmacy, setPharmacy] = useState('');

  const [orderStatus, setOrderStatus] = useState('');

  const fetchPharmacies = async () => {
    try {
      const data = await getPharmacies(); // Call API
      const companies = data.data.map(item => item.company_name);
      setPharmacy(data.data);
      setPharmacies(companies);
    } catch (err) {
      console.log(err);
    }
  };

  const applyFilter = () => {
    onPressFunction('', orderStatus, deliveryType);

    setVisible(false);
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const deliveryTypes = [
    {
      id: 1,
      type: 'Normal',
    },
    {
      id: 2,
      type: 'Express',
    },
    {
      id: 3,
      type: 'Bulk',
    },
  ];

  return (
    <View style={[styles.container]}>
      <View style={styles.smallDash}></View>
      <View style={[styles.rowViewSpace, {justifyContent: 'flex-start'}]}>
        <FilterIcon />
        <Text style={styles.filterHeading}>Filter</Text>
      </View>
      <View style={styles.DashLine}></View>
      <SelectBox
        label="Pharmacy"
        options={pharmacies}
        placeholder="Select Pharmacy"
      />
      <SelectBox
        label="Order Status"
        options={[
          'Pending',
          'Dispatched',
          'Attempted',
          'Delivered',
          'Cancelled',
        ]}
        placeholder="Choose Order Status"
        selected={setOrderStatus}
      />
      <View>
        <Text style={styles.labelText}>Delivery type</Text>
        <View style={styles.radioConainerStyle}>
          {deliveryTypes.map((item, index) => (
            <CommonRadioButton
              containerStyle={styles.radioButtonStyle}
              label={item.type}
              selected={deliveryType === item.type}
              onPressFunction={() => {
                setDeliveryType(item.type);
              }}
            />
          ))}
        </View>
      </View>
      <View style={styles.DashLine}></View>
      <View style={[styles.rowViewSpace]}>
        <Button
          onPressFunction={() => {
            setVisible(false);
          }}
          label="Cancel"
          buttonStyle={styles.whiteButton}
          buttonTextStyle={styles.whiteButtonText}
        />
        <Button
          onPressFunction={() => {
            setVisible(false);
            applyFilter();
          }}
          label={'Apply filter'}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

export default FilterModal;

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
  DashLine: {
    width: '100%',
    height: SIZES.wp(1 / 4.2),
    backgroundColor: '#F5F7FA',
    marginBottom: SIZES.wp(20 / 4.2),
  },
  rowViewSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SIZES.wp(23 / 4.2),
  },
  filterHeading: {
    fontSize: SIZES.wp(16 / 4.2),
    color: '#474747',
    ...FONTS.medium,
    marginLeft: SIZES.wp(12 / 4.2),
  },
  buttonStyle: {
    width: '48%',
    marginTop: SIZES.wp(24 / 4.2),
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  whiteButton: {
    backgroundColor: '#fff',
    width: '48%',
    marginTop: SIZES.wp(24 / 4.2),
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  whiteButtonText: {
    color: COLORS.primary,
  },
  labelText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#747474',
    marginBottom: SIZES.wp(8 / 4.2),
  },
  radioConainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.wp(16 / 4.2),
  },
  radioButtonStyle: {
    width: '32%',
  },
});
