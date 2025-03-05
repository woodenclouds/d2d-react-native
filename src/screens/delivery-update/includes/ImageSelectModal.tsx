import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS, SIZES} from '@app/themes/themes';
import CameraIcon from '@app/assets/icons/camera_icon.svg';
import GalleryIcon from '@app/assets/icons/gallery_icon.svg';

type Props = {
  onPressGallery: () => void;
  onPressCamera: () => void;
};

const ImageSelectModal = (props: Props) => {
  const {onPressGallery, onPressCamera} = props;

  return (
    <View style={styles.container}>
      <View style={styles.smallDash}></View>
      <View
        style={[
          styles.rowContainer,
          {width: '100%', marginTop: SIZES.wp(20 / 4.2)},
        ]}>
        <TouchableOpacity
          onPress={onPressCamera}
          style={[
            styles.rowContainer,
            {
              backgroundColor: '#EDF1F7',
              width: '48%',
              paddingVertical: SIZES.wp(28 / 4.2),
              justifyContent: 'center',
              borderRadius: SIZES.wp(12 / 4.2),
            },
          ]}>
          <View>
            <CameraIcon />
          </View>
          <Text style={styles.buttonText}>Take a picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressGallery}
          style={[
            styles.rowContainer,
            {
              backgroundColor: '#EDF1F7',
              width: '48%',
              paddingVertical: SIZES.wp(28 / 4.2),
              justifyContent: 'center',
              borderRadius: SIZES.wp(12 / 4.2),
            },
          ]}>
          <View>
            <GalleryIcon />
          </View>
          <Text style={styles.buttonText}>Add from gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageSelectModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  smallDash: {
    width: SIZES.wp(48 / 4.2),
    height: SIZES.wp(4 / 4.2),
    backgroundColor: '#7E7E7E',
    borderRadius: SIZES.wp(30 / 4.2),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#6B6B6B',
    marginLeft: SIZES.wp(8 / 4.2),
  },
});
