import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  TextInput,
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
  const [pharmacyData, setPharmacyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      const data = await getPharmacies(
        searchText ? {search: searchText} : searchText,
      ); // Call API
      // const companies = data.data.map(item => item.company_name);

      setPharmacyData(data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  // Filter pharmacies based on search text
  const filteredPharmacies = pharmacyData.filter(item =>
    item.company_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
    // Clear search text when closing search
    if (searchVisible) setSearchText('');
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
        additionIconFunction={handleSearchToggle}
      />
      {searchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search pharmacies..."
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true}
            returnKeyType="search"
          />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text>{error.message || 'Failed to load pharmacies'}</Text>
        ) : filteredPharmacies.length > 0 ? (
          filteredPharmacies.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigate('PharmacyWiseOrder', {pharmacy: item})}
              key={index}>
              <PharmacyCard pharmacy={item} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResultsText}>
            No pharmacies found matching "{searchText}"
          </Text>
        )}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default PharmacyScreen;

const styles = StyleSheet.create({
  container: {
    padding: SIZES.wp(20 / 4.2),
    paddingBottom: SIZES.wp(10 / 4.2),
  },
  searchContainer: {
    padding: SIZES.wp(20 / 4.2),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  noResultsText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});
