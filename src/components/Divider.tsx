import React from 'react';
import {View, StyleSheet} from 'react-native';

const Divider = ({
  color = '#000',
  height = 1,
  width = '100%',
  marginVertical = 10,
}) => {
  return (
    <View
      style={[
        styles.divider,
        {backgroundColor: color, height, width, marginVertical},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    alignSelf: 'center',
  },
});

export default Divider;
