import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import SearchIcon from '@app/assets/icons/search_icon.svg';
import {navigate, navigateBack} from '@app/services/navigationService';
import PharmacyCard from './includes/PharmacyCard';
import {SIZES} from '@app/themes/themes';
import {getPharmacies} from '@app/services/api';

const PharmacyScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pharmacyData, setPharmacyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      const data = await getPharmacies(); // Call API
      // const companies = data.data.map(item => item.company_name);

      setPharmacyData(data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
      <CommonHeader
        headingText="Pharmacy"
        backArrow={true}
        rightIcon={true}
        icon={<SearchIcon width={20} height={20} />}
        backPress={() => {
          navigateBack();
        }}
        additionIconFunction={() => setModalVisible(true)}
      />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          pharmacyData.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigate('PharmacyWiseOrder', {pharmacy: item})}
              key={index}>
              <PharmacyCard pharmacy={item} />
            </TouchableOpacity>
          )) || <Text>{error}</Text>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

export default PharmacyScreen;

const styles = StyleSheet.create({
  container: {
    padding: SIZES.wp(20 / 4.2),
    gap: SIZES.wp(10 / 4.2),
  },
});
