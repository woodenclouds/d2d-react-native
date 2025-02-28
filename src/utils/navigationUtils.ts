import {Linking, Alert} from 'react-native';
import GetLocation from 'react-native-get-location'; // Use the same library as in MapScreen

// Define the openGoogleMapsNavigation function as a globally accessible utility
export const openGoogleMapsNavigation = async (
  destinationLat: number,
  destinationLng: number,
) => {
  try {
    // Get the user's current location
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000, // Increased timeout for better accuracy
    });

    const sourceLat = location.latitude;
    const sourceLng = location.longitude;

    // Construct Google Maps URL with current location and destination
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${sourceLat},${sourceLng}&destination=${destinationLat},${destinationLng}&travelmode=walking`;

    // Attempt to open the Google Maps app
    const supported = await Linking.canOpenURL(googleMapsUrl);
    if (supported) {
      await Linking.openURL(googleMapsUrl);
    } else {
      console.log('Google Maps app is not installed. Falling back to browser.');
      // Optionally open in a web browser if the app isn’t installed
      await Linking.openURL(googleMapsUrl);
    }
  } catch (error) {
    console.error('Failed to open Google Maps or get location:', error);
    if (error.code === 'UNAVAILABLE' || error.code === 'TIMEOUT') {
      Alert.alert(
        'Location Error',
        'Could not determine your current location. Please enable location services.',
      );
    } else {
      Alert.alert(
        'Error',
        'Could not open Google Maps. Please ensure the app is installed.',
      );
    }
  }
};
