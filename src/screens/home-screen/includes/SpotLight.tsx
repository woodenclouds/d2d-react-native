import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '@app/themes/themes';

type Props = {
  data: any;
};

const SpotLight = (props: Props) => {
  const {data} = props;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('@app/assets/images/spotlight_image.png')} />
      </View>
      <Text style={styles.welcomeText}>👋 Welcome! Anooj Reji</Text>
      <View style={styles.higlihtView}>
        <Text style={styles.titleText}>Total deliveries</Text>
        <Text style={styles.titleCountText}>{data?.total_deliveries}</Text>
      </View>
      <View style={styles.rowView}>
        <View>
          <Text style={styles.countText}>{data?.pending_orders}</Text>
          <Text style={styles.labelText}>Pending</Text>
        </View>
        <View style={styles.dividerLine} />
        <View>
          <Text style={styles.countText}>{data?.total_orders}</Text>
          <Text style={styles.labelText}>Completed</Text>
        </View>
      </View>
    </View>
  );
};

export default SpotLight;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#1E2127',
    padding: SIZES.wp(24 / 4.2),
    borderRadius: SIZES.wp(24 / 4.2),
    position: 'absolute',
    alignSelf: 'center',
    top: SIZES.hp(40 / 4.2),
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    right: SIZES.wp(-70 / 4.2),
    top: SIZES.wp(0 / 4.2),
  },
  welcomeText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(16 / 4.2),
    color: '#FFFFFF',
  },
  higlihtView: {
    width: '100%',
    height: SIZES.wp(64 / 4.2),
    backgroundColor: '#ffffff18',
    marginVertical: SIZES.wp(24 / 4.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: SIZES.wp(16 / 4.2),
    paddingHorizontal: SIZES.wp(16 / 4.2),
  },
  titleText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#F1F1F1',
  },
  titleCountText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(24 / 4.2),
    color: '#41DD75',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLine: {
    width: SIZES.wp(1 / 4.2),
    height: SIZES.wp(24 / 4.2),
    backgroundColor: '#FFFFFF15',
    marginHorizontal: SIZES.wp(24 / 4.2),
  },
  countText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(20 / 4.2),
    color: '#FFFFFF',
    marginBottom: SIZES.wp(12 / 4.2),
  },
  labelText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#F1F1F1',
  },
});
