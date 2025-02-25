import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import NotificationItem from './includes/NotificationItem';
import {navigateBack} from '@app/services/navigationService';
import {getNotifications} from '@app/services/api';
import {FONTS, SIZES} from '@app/themes/themes';

type Props = {};

const NotificationScreen = (props: Props) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications(); // Call AP
      if (data.data.length === 0) {
        setError('No notifications available');
        return;
      }
      setNotifications(data.data); // Store data in state
    } catch (err) {
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <SafeAreaWrapper backgroundColor="#fff" barStyle="dark-content">
      <CommonHeader
        headingText="Notifications"
        backArrow={true}
        backPress={() => navigateBack()}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#4A4D4E" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={({item}) => <NotificationItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaWrapper>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  errorText: {
    fontSize: SIZES.wp(14 / 4.2),
    color: '#4A4D4E',
    textAlign: 'center',
    marginTop: SIZES.hp(40 / 4.2),
    ...FONTS.medium,
  },
});
