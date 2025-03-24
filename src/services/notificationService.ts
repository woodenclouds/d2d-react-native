import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from './navigationService'; // Adjust the path to your navigation service

// Request permission for notifications and get FCM token
export const setupNotifications = async () => {
  try {
    // Request permission for notifications
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted.');

      // Get the FCM token
      const fcmToken = await messaging().getToken();
      console.log('FCM Token:', fcmToken);

      // Send the FCM token to the Django backend
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        await fetch('https://your-django-backend/api/register-device/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ fcm_token: fcmToken }),
        });
      }

      // Create a notification channel for Android
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'default', // Optional: Add a custom sound
        vibration: true, // Enable vibration
      });
    } else {
      console.log('Notification permission denied.');
    }
  } catch (error) {
    console.error('Error setting up notifications:', error);
  }
};

// Handle foreground notifications
export const handleForegroundNotifications = () => {
  return messaging().onMessage(async remoteMessage => {
    console.log('Foreground notification received:', remoteMessage);

    // Display the notification using Notifee
    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'New Notification',
      body: remoteMessage.notification?.body || 'You have a new message.',
      data: remoteMessage.data, // Pass the data payload
      android: {
        channelId: 'default',
        smallIcon: 'ic_notification', // Ensure this icon exists in android/app/src/main/res/drawable
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: 'default',
      },
    });
  });
};

// Handle background and quit state notifications
export const handleBackgroundNotifications = () => {
  // When the app is opened from a quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('App opened from quit state:', remoteMessage);
        handleNotificationNavigation(remoteMessage);
      }
    });

  // When the app is in the background
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('App opened from background state:', remoteMessage);
    handleNotificationNavigation(remoteMessage);
  });

  // Handle Notifee events (e.g., when the user taps the notification)
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      console.log('Notification pressed:', detail.notification);
      handleNotificationNavigation(detail.notification);
    }
  });
};

// Handle navigation based on notification data
const handleNotificationNavigation = (message: any) => {
  const data = message?.data;
  if (data?.order_id) {
    // Navigate to a screen with the order details
    navigate('MapScreen', { order_id: data.order_id });
  } else {
    // Default navigation if no specific data
    navigate('MapScreen', {});
  }
};

// Set up background handler
export const setupBackgroundHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

    // Display the notification using Notifee
    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'New Notification',
      body: remoteMessage.notification?.body || 'You have a new message.',
      data: remoteMessage.data,
      android: {
        channelId: 'default',
        smallIcon: 'ic_notification',
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: 'default',
      },
    });
  });
};
