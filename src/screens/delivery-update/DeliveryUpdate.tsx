import {ScrollView, StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SIZES, FONTS} from '@app/themes/themes';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import RecepientDetailsCard from './includes/RecepientDetailsCard';
import DeliveryDetailsCard from './includes/DeliveryDetailsCard';
import PaymentDetailsCard from './includes/PaymentDetailsCard';
import Button from '@app/components/Button';
import {navigateBack} from '@app/services/navigationService';
import {useRoute, useNavigation} from '@react-navigation/native'; // Import useNavigation
import * as ImagePicker from 'react-native-image-picker'; // For image picking
import {useAuth} from '../../context/AuthContext'; // Import useAuth (adjust the path)
import {
  submitAttemptedOrder,
  submitDeliveryUpdate,
  submitPickupOrder,
} from '@app/services/api';

type Props = {};

type RouteParams = {
  data: {
    address: string;
    delivery_day: string;
    from_time: string;
    id: string;
    latitude: number;
    longitude: number;
    order_type: string | null;
    recepient_name: string;
    recepient_phone: string;
    to_time: string;
    delivery_type: string;
    is_pickup: boolean;
    is_prepaid: boolean;
  };
  type: string;
  signature?: string; // Optional signature param for updates
};

const DeliveryUpdate = (props: Props) => {
  const route = useRoute();
  const {state, clearSignature, setOrderDetailsUpdated, updateTempItem} =
    useAuth(); // Use Auth context to get signature and clear it
  const [deliveryStatus, setDeliveryStatus] = useState('Delivered');
  const [orderData, setOrderData] = useState<RouteParams['data'] | null>(null);
  const [type, setType] = useState<RouteParams['type'] | string>('');
  const [images, setImages] = useState<string[]>([]); // Store image URIs
  const [notes, setNotes] = useState<string>(''); // Store notes
  const [isBulkOrder, setIsBulkOrder] = useState(false);
  const [amount, setAmount] = useState('0');
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  // Fetch initial data from navigation params
  useEffect(() => {
    if (route.params) {
      const params = route.params as RouteParams;
      console.log(params.data, 'params');

      setOrderData(params.data);
      setType(params.type);
    }
  }, [route.params]);

  const statusData = [
    {
      id: 1,
      status: 'Delivered',
    },
    {
      id: 2,
      status: 'Attempted',
    },
    // {
    //   id: 3,
    //   status: 'Picked Up',
    // },
  ];

  // Handle image selection (maximum 3 images from gallery/camera)
  const handleAddImages = () => {
    if (images.length >= 3) {
      Alert.alert('Limit Reached', 'You can only add up to 3 images.');
      return;
    }

    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo', // Only allow photos (not video), as per your design
        selectionLimit: 3, // Limit to 3 images maximum
        includeBase64: false, // Use URI instead of base64 for better performance
        includeExtra: false, // Exclude extra data to avoid permission issues
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          return;
        }
        if (response.errorCode) {
          console.error(
            'ImagePicker Error:',
            response.errorCode,
            response.errorMessage,
          );
          return;
        }
        if (response.assets) {
          const newImages = response.assets
            .map(asset => asset.uri || asset.originalPath || '')
            .slice(0, 3 - images.length); // Limit to remaining slots
          setImages(prevImages => [
            ...prevImages,
            ...newImages.filter(Boolean),
          ]);
        }
      },
    );
  };

  // Handle removing an image
  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!orderData) return;

    try {
      const response = await submitDeliveryUpdate(
        orderData.id, // Use order ID as orderId
        deliveryStatus,
        state.signature, // Use signature from Auth context
        false, // isBulk (set to false by default; update based on your state)
        notes,
        amount, // amount (hardcoded as per your Node.js example; update based on your state)
        paymentMethod, // payment_method (empty as per your Node.js example; update based on your state)
        images,
      );
      if (response.StatusCode === 6000 || response.success) {
        // Adjust based on your API response structure
        console.log('Delivery update submitted successfully');
        updateTempItem(
          orderData.id,
          'delivered',
          orderData.is_pickup ? 'pickup' : 'delivery',
        );
        clearSignature(); // Clear the signature from context after successful submission
        setOrderDetailsUpdated(true);
        navigateBack();
        // Alert.alert('Success', 'Delivery update submitted successfully.');
      }
    } catch (error) {
      console.log('Failed to submit delivery update:', error);
      Alert.alert(
        'Error',
        'Failed to submit delivery update. Please try again.',
      );
    }
  };

  const handleAttemptedSubmit = async () => {
    if (!orderData) return;

    try {
      const response = await submitAttemptedOrder(
        orderData.id,
        notes,
        orderData.is_pickup ? 'pickup' : 'delivery',
      );
      if (response.StatusCode === 6000 || response.success) {
        // Adjust based on your API response structure
        console.log('Attempted order submitted successfully');
        updateTempItem(orderData.id, 'attempted');
        setOrderDetailsUpdated(true);
        navigateBack();
        // Alert.alert('Success', 'Attempted order submitted successfully.');
      }
    } catch (error) {
      console.log('Failed to submit attempted order:', error);
      Alert.alert(
        'Error',
        'Failed to submit attempted order. Please try again.',
      );
    }
  };

  const handlePickupSubmit = async () => {
    if (!orderData) return;

    try {
      const response = await submitPickupOrder(
        orderData.id,
        notes,
        orderData.is_pickup ? 'pickup' : 'delivery',
      );
      if (response.StatusCode === 6000 || response.success) {
        // Adjust based on your API response structure
        console.log('Pickup order submitted successfully');
        updateTempItem(orderData.id, 'pickedup');
        setOrderDetailsUpdated(true);
        navigateBack();
        // Alert.alert('Success', 'Pickup order submitted successfully.');
      }
    } catch (error) {
      console.log('Failed to submit pickup order:', error);
      Alert.alert('Error', 'Failed to submit pickup order. Please try again.');
    }
  };

  return (
    <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
      <CommonHeader
        headingText="Delivery update"
        backArrow={true}
        backPress={() => {
          navigateBack();
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <RecepientDetailsCard data={orderData} />
        <DeliveryDetailsCard
          statusData={statusData}
          deliveryStatus={deliveryStatus}
          setDeliveryStatus={setDeliveryStatus}
          signature={state.signature}
          images={images}
          setImages={handleAddImages} // Pass function to add images
          removeImage={handleRemoveImage} // Pass function to remove images
          notes={notes}
          setNotes={setNotes} // Pass function to update notes
          setIsBulkOrder={setIsBulkOrder}
          isBulkOrder={isBulkOrder}
          order_status={type}
        />
        {type !== 'attempted' &&
          type !== 'pickup' &&
          deliveryStatus === 'Delivered' &&
          orderData?.is_prepaid !== true && (
            <PaymentDetailsCard
              setAmount={setAmount}
              amount={amount}
              setPaymentMethod={setPaymentMethod}
              paymentMethod={paymentMethod}
            />
          )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          label="Submit"
          onPressFunction={
            type === 'attempted'
              ? handleAttemptedSubmit
              : type === 'pickup'
              ? handlePickupSubmit
              : handleSubmit
          }
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default DeliveryUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.wp(20 / 4.2),
    marginBottom: SIZES.wp(120 / 4.2),
  },
  buttonContainer: {
    width: '100%',
    height: SIZES.wp(100 / 4.2),
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.wp(20 / 4.2),
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  buttonStyle: {
    marginTop: SIZES.wp(16 / 4.2),
  },
});
