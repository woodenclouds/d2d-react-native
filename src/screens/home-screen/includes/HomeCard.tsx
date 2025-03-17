import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FONTS, SIZES } from '@app/themes/themes';


const HomeCard = ({title, Icon, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.pharmacy}
            onPress={onPress}>
            <Icon />
            <Text style={styles.pharmacyText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default HomeCard

const styles = StyleSheet.create({
    pharmacy: {
        flex: 1,
        padding: SIZES.wp(16 / 4.2),
        borderRadius: SIZES.wp(16 / 4.2),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        rowGap: 8,
    },
    pharmacyText: {
        ...FONTS.regular,
        fontSize: SIZES.wp(14 / 4.2),
        lineHeight: 17,
        color: '#0A0A0A',
        flex: 1,
        textAlign: 'center',
    },
})