import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoteRemove from '@app/assets/icons/note_remove.svg'
import { FONTS, SIZES } from '@app/themes/themes'

const NoOrder = ({message}) => {
    console.log("NoOrder component rendered");
    return (
        <View style={styles.noOrdersContainer}>
            <NoteRemove />
            <Text style={styles.noOrders}>{message}</Text>
        </View>
    )
}

export default NoOrder;

const styles = StyleSheet.create({
    noOrdersContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        flex: 1,
    },
    noOrders: {
        ...FONTS.regular,
        fontSize: SIZES.wp(14 / 4.2),
        color: '#1C48C4',
        textAlign: 'center',
        width: 220,
        lineHeight: 20
    }
})