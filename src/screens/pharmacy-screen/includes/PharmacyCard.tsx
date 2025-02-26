import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '@app/themes/themes'
import LocationIcon from '@app/assets/icons/location.svg'
import Divider from '@app/components/Divider'
import { navigate } from '@app/services/navigationService'

interface PharmacyCardProps {
  pharmacy: {
    id: string;
    name: string;
    orders: number;
    initial: string;
  }
}

const PharmacyCard = ({ pharmacy }: PharmacyCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameRow}>
        <View style={styles.iconContainer}>
          <Text>{pharmacy.initial}</Text>
        </View>
        <View>
          <Text style={styles.titleText}>{pharmacy.name}</Text>
          <Text style={styles.idText}>{pharmacy.id}</Text>
        </View>
      </View>
      <Divider color='#F5F7FA' marginVertical={0} />
      <View style={styles.ordersRow}>
        <Text style={styles.ordersText}>Orders: {pharmacy.orders}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.ordersText}>Get direction</Text>
          <LocationIcon />
        </View>
      </View>
    </View>
  )
}

export default PharmacyCard

const styles = StyleSheet.create({
  container: {
    padding: SIZES.wp(16 / 4.2),
    backgroundColor: "#FFFFFF",
    borderRadius: SIZES.wp(16 / 4.2),
    gap: SIZES.wp(12 / 4.2)
  },
  iconContainer: {
    width: SIZES.wp(48 / 4.2),
    height: SIZES.wp(48 / 4.2),
    borderRadius: SIZES.wp(100 / 4.2),
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.wp(12 / 4.2)
  },
  ordersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(18 / 4.2),
    color: "#272727",
    lineHeight: 24,
    marginBottom: 4,
  },
  idText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: "#676767",
    lineHeight: 20,
  },
  ordersText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: "#4576E2",
    lineHeight: 20,
    marginRight: 4,
  },
})