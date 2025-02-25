import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES, FONTS} from '@app/themes/themes';
import CommonRadioButton from '@app/components/CommonRadioButton';
import CommonDashedButton from '@app/components/CommonDashedButton';
import {navigate} from '@app/services/navigationService';
import CloseIcon from '@app/assets/icons/close_icon.svg';
import WhiteTick from '@app/assets/icons/white_tick.svg';

type Props = {
  statusData: Array<any>;
  deliveryStatus: string;
  setDeliveryStatus: (value: string) => void;
  signature?: string | null; // Optional signature (base64 or URI)
  images: string[]; // Array of image URIs or base64
  setImages: () => void; // Function to add images
  removeImage: (index: number) => void; // Function to remove images
  notes: string; // Notes text
  setNotes: (text: string) => void; // Function to update notes
  setIsBulkOrder: (value: boolean) => void;
  isBulkOrder: boolean;
};

const DeliveryDetailsCard = (props: Props) => {
  const {
    statusData,
    deliveryStatus,
    setDeliveryStatus,
    signature,
    images,
    setImages,
    removeImage,
    notes,
    setNotes,
    isBulkOrder,
    setIsBulkOrder,
  } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Delivery Details</Text>
      <View style={styles.boxContainer}>
        <View>
          <Text style={styles.labelText}>Status</Text>
          <View style={styles.radioConainerStyle}>
            {statusData.map((item, index) => (
              <CommonRadioButton
                containerStyle={styles.radioButtonStyle}
                label={item.status}
                selected={deliveryStatus === item.status}
                customtextStyle={{
                  fontSize: SIZES.wp(14 / 4.2),
                }}
                onPressFunction={() => {
                  setDeliveryStatus(item.status);
                }}
              />
            ))}
          </View>
        </View>
        {deliveryStatus === 'Delivered' && (
          <View style={styles.buttonContainer}>
            <Text style={styles.labelText}>Signature</Text>
            {signature ? (
              <TouchableOpacity
                style={styles.signatureContainer}
                onPress={() => {
                  // Optionally navigate to view or edit signature
                }}>
                <Image
                  source={{uri: `${signature}`}}
                  style={styles.signatureImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : (
              <CommonDashedButton
                label={'Add Signature'}
                onPressFunction={() => {
                  navigate('SignatureScreens', {});
                }}
              />
            )}
          </View>
        )}

        {deliveryStatus === 'Delivered' && (
          <View style={styles.buttonContainer}>
            <Text style={styles.labelText}>Image</Text>
            {images.length > 0 ? (
              <View style={styles.imagesContainer}>
                {images.map((image, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeImage(index)}>
                      <CloseIcon />
                    </TouchableOpacity>
                    <Image
                      source={{uri: image}}
                      style={styles.imageThumbnail}
                      resizeMode="cover"
                    />
                  </View>
                ))}
                {images.length < 3 && (
                  <CommonDashedButton
                    label={'Add Images'}
                    onPressFunction={setImages}
                  />
                )}
              </View>
            ) : (
              <CommonDashedButton
                label={'Add Images'}
                onPressFunction={setImages}
              />
            )}
          </View>
        )}
        <View style={styles.buttonContainer}>
          <Text style={styles.labelText}>Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Enter notes here..."
            value={notes}
            onChangeText={setNotes}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <TouchableOpacity
          style={styles.checkBoxContainer}
          activeOpacity={0.6}
          onPress={() => setIsBulkOrder(!isBulkOrder)}>
          <View
            style={[
              styles.checkBoxStyle,
              isBulkOrder && {
                backgroundColor: '#0144FF',
                borderColor: '#0144FF',
              },
            ]}>
            <View
              style={{width: SIZES.wp(12 / 4.2), height: SIZES.wp(12 / 4.2)}}>
              <WhiteTick />
            </View>
          </View>
          <Text style={styles.checkBoxText}>
            Bulk order (large / heavy orders)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeliveryDetailsCard;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.wp(16 / 4.2),
    width: '100%',
  },
  headingText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(16 / 4.2),
    color: '#28292B',
  },
  boxContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: SIZES.wp(16 / 4.2),
    padding: SIZES.wp(20 / 4.2),
    marginTop: SIZES.wp(12 / 4.2),
  },
  labelText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#747474',
    marginBottom: SIZES.wp(8 / 4.2),
  },
  radioConainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.wp(16 / 4.2),
  },
  radioButtonStyle: {
    width: '49%',
    // paddingHorizontal: SIZES.wp(10 / 4.2),
  },
  buttonContainer: {
    marginBottom: SIZES.wp(16 / 4.2),
  },
  signatureContainer: {
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: '#E0E0E0',
    borderRadius: SIZES.wp(8 / 4.2),
    padding: SIZES.wp(12 / 4.2),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  signatureImage: {
    width: '100%',
    height: SIZES.wp(100 / 4.2),
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SIZES.wp(8 / 4.2),
  },
  imageWrapper: {
    position: 'relative',
    marginRight: SIZES.wp(8 / 4.2),
    marginBottom: SIZES.wp(8 / 4.2),
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  imageThumbnail: {
    width: SIZES.wp(80 / 4.2),
    height: SIZES.wp(80 / 4.2),
    borderRadius: SIZES.wp(8 / 4.2),
  },
  notesInput: {
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: '#E0E0E0',
    borderRadius: SIZES.wp(8 / 4.2),
    padding: SIZES.wp(12 / 4.2),
    fontSize: SIZES.wp(14 / 4.2),
    backgroundColor: '#FFFFFF',
    height: SIZES.wp(100 / 4.2),
    textAlignVertical: 'top',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxStyle: {
    width: SIZES.wp(24 / 4.2),
    height: SIZES.wp(24 / 4.2),
    borderRadius: SIZES.wp(6 / 4.2),
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: '#6A7683',
    marginRight: SIZES.wp(8 / 4.2),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  checkBoxText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#212529',
  },
});
