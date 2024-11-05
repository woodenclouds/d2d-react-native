import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import TopCardItem from '../report-screen/includes/TopCardItem';
import HistoryItemCard from './includes/HistoryItemCard';
import {SIZES, FONTS} from '@app/themes/themes';
import ReportIcon from '@app/assets/icons/report_icon_blue.svg';
import DollarIcon from '@app/assets/icons/dollar_icon.svg';
import SearchIcon from '@app/assets/icons/search_icon.svg';

type Props = {};

const ReportScreen = (props: Props) => {
  return (
    <SafeAreaWrapper backgroundColor="#fff" barStyle="dark-content">
      <CommonHeader
        headingText="Reports"
        rightIcon={true}
        icon={<ReportIcon />}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.topCardsView}>
          <TopCardItem
            containerStyle={styles.containerStyle}
            label={'Total Deliveries'}
          />
          <TopCardItem
            containerStyle={{
              ...styles.containerStyle,
              ...{backgroundColor: '#F5E2C4'},
            }}
            label={'Payments collected'}
            icon={<DollarIcon />}
          />
        </View>
        <View style={styles.fullWidthRowView}>
          <Text style={styles.historyHeading}>History</Text>
          <TouchableOpacity style={styles.rowView}>
            <View>
              <SearchIcon />
            </View>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        {Array(10)
          .fill(10)
          .map((item, index) => (
            <HistoryItemCard />
          ))}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#F5F7FA',
    paddingHorizontal: SIZES.wp(20 / 4.2),
    paddingTop: SIZES.wp(20 / 4.2),
  },
  topCardsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerStyle: {
    width: SIZES.wp(185 / 4.2),
  },
  fullWidthRowView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SIZES.wp(25 / 4.2),
    marginBottom: SIZES.wp(16 / 4.2),
  },
  historyHeading: {
    ...FONTS.regular,
    color: '#0A0A0A',
    fontSize: SIZES.wp(16 / 4.2),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    ...FONTS.regular,
    color: '#3E3E3E',
    fontSize: SIZES.wp(14 / 4.2),
    marginLeft: SIZES.wp(6 / 4.2),
  },
});
