import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeAreaWrapper from '@app/components/SafeAreaWrapper'
import { navigateBack } from '@app/services/navigationService'
import CommonHeader from '@app/components/CommonHeader'
import SearchIcon from '@app/assets/icons/search_icon.svg'
import PendingAssignCard from './includes/PendingAssignCard'
import { SIZES } from '@app/themes/themes'

const PendingAssigns = () => {
    return (
        <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
            <CommonHeader
                headingText="Pending Assigns"
                backArrow={true}
                rightIcon={true}
                // icon={<SearchIcon width={20} height={20} />}
                backPress={() => {
                    navigateBack();
                }}
                // additionIconFunction={handleSearchToggle}
            />
            <ScrollView style={styles.container}>
                <PendingAssignCard />
                <PendingAssignCard />
                <PendingAssignCard />
                <PendingAssignCard />
                <PendingAssignCard />
            </ScrollView>
        </SafeAreaWrapper>
    )
}

export default PendingAssigns

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZES.wp(20 / 4.2),
        paddingVertical: SIZES.wp(11 / 4.2),
    },
})