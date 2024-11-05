import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {SIZES} from '@app/themes/themes';

type Props = {
  children: React.ReactNode;
  isVisible: boolean;
  onBackButtonPress: () => void;
  onBackdropPress: () => void;
};

const CenterModalBox = (props: Props) => {
  const {children, isVisible, onBackButtonPress, onBackdropPress} = props;

  return (
    <View>
      <Modal
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackdropPress}
        isVisible={isVisible}
        backdropOpacity={0.8}
        style={{
          margin: 0,
          padding: 0,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        // propagateSwipe={true}
        useNativeDriver={false}
        // onSwipeComplete={() => setVisible(false)}
        // swipeDirection={['down']}
      >
        <View style={styles.modalContainer}>{children}</View>
      </Modal>
    </View>
  );
};

export default CenterModalBox;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: SIZES.wp(20 / 4.2),
    width: '90%',
    // alignSelf: 'center',
    padding: SIZES.wp(24 / 4.2),
  },
});
