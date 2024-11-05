import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import NotificationItem from './includes/NotificationItem';
import {navigateBack} from '@app/services/navigationService';

type Props = {};

const NotificationScreen = (props: Props) => {
  return (
    <SafeAreaWrapper backgroundColor="#fff" barStyle="dark-content">
      <CommonHeader
        headingText="Notifications"
        backArrow={true}
        backPress={() => navigateBack()}
      />

      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={() => <NotificationItem />}
      />
    </SafeAreaWrapper>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
