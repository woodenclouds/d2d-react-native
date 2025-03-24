/**
 * @format
 */

import { AppRegistry, Text, TextInput } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  setupNotifications,
  setupBackgroundHandler,
} from './src/services/notificationService';

// Set up background handler for notifications
setupBackgroundHandler();

// Set up notifications (request permission, create channel, etc.)
setupNotifications();

AppRegistry.registerComponent(appName, () => App);

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
