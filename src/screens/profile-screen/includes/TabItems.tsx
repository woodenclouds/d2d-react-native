import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';
import ItemCard from './ItemCard';

type Props = {};

const TabItems = (props: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  const personalData = [
    {id: 1, label: 'Phone number :', value: '+91 975 536 7244'},
    {id: 2, label: 'Email :', value: 'H6Zp5@example.com'},
    {id: 3, label: 'Driving license :', value: 'DL-123456'},
    {id: 4, label: 'Sin number :', value: 'SIN-123456'},
    {id: 5, label: 'Vehicle number :', value: 'MH-12-12345'},
  ];

  const attendanceData = [
    {id: 1, label: 'Oct 5, 2024', value: 'Present'},
    {id: 2, label: 'Oct 6, 2024', value: 'Present'},
    {id: 3, label: 'Oct 7, 2024', value: 'Absent'},
    {id: 4, label: 'Oct 8, 2024', value: 'Present'},
    {id: 5, label: 'Oct 9, 2024', value: 'Present'},
    {id: 6, label: 'Oct 10, 2024', value: 'Present'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.rowView}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              {borderBottomColor: activeTab === 0 ? '#4A4D4E' : '#ABABAB'},
            ]}
            onPress={() => setActiveTab(0)}>
            <Text
              style={[
                styles.tabButtonText,
                {color: activeTab === 0 ? '#4A4D4E' : '#ABABAB'},
              ]}>
              Personal details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              {borderBottomColor: activeTab === 1 ? '#4A4D4E' : '#ABABAB'},
            ]}
            onPress={() => setActiveTab(1)}>
            <Text
              style={[
                styles.tabButtonText,
                {color: activeTab === 1 ? '#4A4D4E' : '#ABABAB'},
              ]}>
              Attendance
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {activeTab === 0
            ? personalData.map(item => (
                <ItemCard label={item.label} valueText={item.value} />
              ))
            : attendanceData.map(item => (
                <ItemCard
                  label={item.label}
                  attendance={true}
                  valueText={item.value}
                  color={item.value === 'Absent' ? '#CE0003' : '#24AC33'}
                />
              ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TabItems;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: SIZES.wp(20 / 4.2),
    marginTop: SIZES.wp(16 / 4.2),
  },
  mainContainer: {
    backgroundColor: '#fff',
    borderRadius: SIZES.wp(16 / 4.2),
    padding: SIZES.wp(16 / 4.2),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.wp(8 / 4.2),
    borderBottomWidth: SIZES.wp(1 / 4.2),
    borderBottomColor: '#666666',
  },
  tabButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#4A4D4E',
    textAlign: 'center',
  },
  scrollContainer: {
    marginTop: SIZES.wp(16 / 4.2),
  },
});
