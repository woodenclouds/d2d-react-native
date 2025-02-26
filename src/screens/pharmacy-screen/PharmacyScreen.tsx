import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SafeAreaWrapper from '@app/components/SafeAreaWrapper'
import CommonHeader from '@app/components/CommonHeader'
import SearchIcon from '@app/assets/icons/search_icon.svg';
import { navigate, navigateBack } from '@app/services/navigationService';
import PharmacyCard from './includes/PharmacyCard';
import { SIZES } from '@app/themes/themes';

const pharmacyData = [
    {
        id: '#124462825374',
        name: 'MediCare Express',
        orders: 10,
        initial: 'M'
    },
    {
        id: '#987654321012',
        name: 'HealthPlus Pharmacy',
        orders: 15,
        initial: 'H'
    },
    {
        id: '#456789012345',
        name: 'City Drug Store',
        orders: 8,
        initial: 'C'
    },
    {
        id: '#234567890123',
        name: 'Wellness Pharma',
        orders: 12,
        initial: 'W'
    }
];

const PharmacyScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
            <CommonHeader
                headingText="Pharmacy"
                backArrow={true}
                rightIcon={true}
                icon={<SearchIcon width={20} height={20} />}
                backPress={() => {
                    navigateBack();
                }}
                additionIconFunction={() => setModalVisible(true)}
            />
            <View style={styles.container}>
                {pharmacyData.map((pharmacy) => (
                    <TouchableOpacity
                        onPress={() => navigate('PharmacyWiseOrder', { pharmacy })}
                        key={pharmacy.id}
                    >
                        <PharmacyCard
                            pharmacy={pharmacy}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaWrapper>
    )
}

export default PharmacyScreen

const styles = StyleSheet.create({
    container: {
        padding: SIZES.wp(20 / 4.2),
        gap: SIZES.wp(10 / 4.2)
    }
})