import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '@app/themes/themes';
import Divider from '@app/components/Divider';
import violetBoxPin from '@app/assets/images/violet_box_pin.png';
import violetPin from '@app/assets/images/violet_pin.png';
import Button from '@app/components/Button';

interface PendingAssignCardProps {
    pendingAssign: any;
}

const PendingAssignCard = ({ pendingAssign }: PendingAssignCardProps) => {

    return (
        <View style={styles.container}>
            <View style={styles.nameRow}>
                <Image source={violetPin} style={styles.icon} />
                <View>
                    <Text style={styles.titleText}>MediCare Express</Text>
                    <Text style={styles.idText}>1234 Waterloo Canada</Text>
                </View>
                <TouchableOpacity style={styles.assignButton}>
                    <Text style={styles.assignButtonText}>Assign Now</Text>
                </TouchableOpacity>                
            </View>
            <Divider color="#F5F7FA" marginVertical={0} />
            <View style={styles.ordersRow}>
                <Text style={styles.ordersText}>
                    Delivery Date: 15/02/2025
                </Text>
                <Text style={styles.ordersText}>2PM - 4PM</Text>
            </View>
        </View>
    );
};

export default PendingAssignCard;

const styles = StyleSheet.create({
    container: {
        padding: SIZES.wp(16 / 4.2),
        backgroundColor: '#FFFFFF',
        borderRadius: SIZES.wp(16 / 4.2),
        gap: SIZES.wp(12 / 4.2),
        marginBottom: SIZES.wp(10 / 4.2),
    },
    assignButton: {
        borderRadius: SIZES.wp(6 / 4.2),
        paddingHorizontal: SIZES.wp(7.5 / 4.2),
        paddingVertical: SIZES.wp(10 / 4.2),
        borderWidth: 1,
        borderColor: '#003FF0',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    assignButtonText: {
        ...FONTS.regular,
        fontSize: SIZES.wp(14 / 4.2),
        color: '#003FF0',
        lineHeight: 16,
    },
    iconContainer: {
        width: SIZES.wp(48 / 4.2),
        height: SIZES.wp(48 / 4.2),
        borderRadius: SIZES.wp(100 / 4.2),
        backgroundColor: '#F5F7FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // columnGap: SIZES.wp(12 / 4.2),
        justifyContent: 'space-between',
    },
    ordersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        ...FONTS.medium,
        fontSize: SIZES.wp(16 / 4.2),
        color: '#272727',
        lineHeight: 24,
        marginBottom: 4,
    },
    idText: {
        ...FONTS.regular,
        fontSize: SIZES.wp(14 / 4.2),
        color: '#676767',
        lineHeight: 20,
    },
    ordersText: {
        ...FONTS.regular,
        fontSize: SIZES.wp(14 / 4.2),
        color: '#4576E2',
        lineHeight: 20,
        marginRight: 4,
    },
    icon: {
        width: SIZES.wp(25 /4.2),
        height: SIZES.hp(25 / 4.2),
    },
});
