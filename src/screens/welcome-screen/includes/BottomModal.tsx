import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {SIZES} from '@app/themes/themes';

type Props = {
  children: React.ReactNode;
  isVisible: boolean;
  setVisible: (data: boolean) => void;
};

const BottomModal = (props: Props) => {
  const {children, isVisible, setVisible} = props;

  return (
    <Modal
      onBackButtonPress={() => {
        setVisible(false);
      }}
      onBackdropPress={() => {
        setVisible(false);
      }}
      isVisible={isVisible}
      backdropOpacity={0.1}
      style={{
        margin: 0,
        padding: 0,
      }}
      propagateSwipe={true}
      useNativeDriver={false}
      onSwipeComplete={() => setVisible(false)}
      swipeDirection={['down']}>
      <View style={styles.modalContainer}>{children}</View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: SIZES.wp(20 / 4.2),
    position: 'absolute',
    bottom: SIZES.wp(20 / 4.2),
    width: '95%',
    alignSelf: 'center',
    paddingHorizontal: SIZES.wp(16 / 4.2),
    paddingVertical: SIZES.wp(40 / 4.2),
  },
});
