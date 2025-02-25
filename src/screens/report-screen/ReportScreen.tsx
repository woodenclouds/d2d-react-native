import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import TopCardItem from '../report-screen/includes/TopCardItem';
import HistoryItemCard from './includes/HistoryItemCard';
import {SIZES, FONTS} from '@app/themes/themes';
import ReportIcon from '@app/assets/icons/report_icon_blue.svg';
import DollarIcon from '@app/assets/icons/dollar_icon.svg';
import SearchIcon from '@app/assets/icons/search_icon.svg';
import {assignedOrders, orderHistory, orderReports} from '@app/services/api';
import {useAuth} from '../../context/AuthContext';

type Props = {};

const ReportScreen = (props: Props) => {
  const {checkIn, checkOut, state} = useAuth();
  const {checkInId} = state;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reports, setReports] = useState([]);
  const [reportLoading, setReportLoading] = useState(true);
  const [reportError, setReportError] = useState(null);

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await orderReports(); // Call API
        setReports(data); // Store data in state
      } catch (err) {
        setError('Failed to load reports');
      } finally {
        setReportLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderHistory(); // Call API
        setOrders(data); // Store data in state
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <SafeAreaWrapper backgroundColor="#fff" barStyle="dark-content">
      <CommonHeader headingText="Reports" rightIcon={false} />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.topCardsView}>
          <TopCardItem
            data={reports?.order_type_counts}
            totalDeliveries={reports?.total_deliveries}
            containerStyle={styles.containerStyle}
            label={'Total Deliveries'}
          />
          <TopCardItem
            data={reports?.payment_breakdown}
            totalDeliveries={reports?.total_deliveries}
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
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : orders.length === 0 ? (
          <Text style={styles.noOrders}>No assigned orders</Text>
        ) : (
          orders.data.map((item, index) => (
            <HistoryItemCard item={item} key={index} type={'history'} />
          ))
        )}
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
    marginBottom: SIZES.wp(100 / 4.2),
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
  error: {
    color: 'red',
    fontSize: 16,
  },
  noOrders: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: SIZES.wp(40 / 4.2),
  },
});
