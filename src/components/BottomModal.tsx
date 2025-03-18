import {Pressable, StyleSheet, View, BackHandler, Platform} from 'react-native';
import React, {useEffect, useCallback} from 'react';
import Modal from 'react-native-modal';
import {SIZES} from '@app/themes/themes';

type Props = {
  children: React.ReactNode;
  isVisible: boolean;
  setVisible: (data: boolean) => void;
  defaultClose?: boolean;
};

const BottomModal = (props: Props) => {
  const {children, isVisible, setVisible, defaultClose = true} = props;

  const handleBackPress = useCallback(() => {
    if (isVisible && !defaultClose) {
      console.log('Exiting app due to defaultClose=false');
      if (Platform.OS === 'android') {
        BackHandler.exitApp();
      } else {
        setVisible(false);
      }
      return true;
    }
    return false;
  }, [isVisible, defaultClose, setVisible]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, [handleBackPress]);

  return (
    <Modal
      onBackButtonPress={() => {
        if (defaultClose) {
          setVisible(false);
        } else {
          handleBackPress();
        }
      }}
      onBackdropPress={() => {
        if (defaultClose) {
          setVisible(false);
        }
      }}
      isVisible={isVisible}
      backdropOpacity={0.1}
      style={{
        margin: 0,
        padding: 0,
      }}
      propagateSwipe={true}
      useNativeDriver={false}
      onSwipeComplete={() => defaultClose && setVisible(false)}
      swipeDirection={defaultClose ? ['down'] : []}>
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
    paddingVertical: SIZES.wp(20 / 4.2),
  },
});
