import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaWrapper from '@app/components/SafeAreaWrapper'
import CommonHeader from '@app/components/CommonHeader'
import FilterIcon from '@app/assets/icons/filter_icon.svg';
import { navigateBack } from '@app/services/navigationService';
import { FONTS, SIZE, SIZES } from '@app/themes/themes';
import PharmacyCard from './includes/PharmacyCard';
import HistoryItemCard from '../report-screen/includes/HistoryItemCard';
import { assignedOrders } from '@app/services/api';

const PharmacyWiseOrder = ({ route }) => {
    const pharmacy = route.params?.pharmacy;

    const [modalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const data = await assignedOrders(); // Call API
            setOrders(data.data); // Store data in state
        } catch (err) {
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
            <CommonHeader
                headingText="Pharmacy wise order"
                backArrow={true}
                rightIcon={true}
                icon={<FilterIcon width={24} height={24} />}
                backPress={() => {
                    navigateBack();
                }}
                additionIconFunction={() => setModalVisible(true)}
            />
            <View style={styles.container}>
                <PharmacyCard pharmacy={pharmacy} />
                <View style={styles.rowView}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 0 && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab(0)}>
                        <Text
                            style={[
                                styles.tabButtonText,
                                activeTab === 0 && styles.activeTabText,
                            ]}>
                            Pending
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 1 && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab(1)}>
                        <Text
                            style={[
                                styles.tabButtonText,
                                activeTab === 1 && styles.activeTabText,
                            ]}>
                            Picked
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 2 && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab(2)}>
                        <Text
                            style={[
                                styles.tabButtonText,
                                activeTab === 2 && styles.activeTabText,
                            ]}>
                            Attempted
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{paddingVertical: 16,}}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#007bff" />
                    ) : error ? (
                        <Text style={styles.error}>{error}</Text>
                    ) : orders?.length === 0 ? (
                        <Text style={styles.noOrders}>No orders</Text>
                    ) : (
                        <>
                            {orders?.map((item: any, index: number) => (
                                <HistoryItemCard item={item} key={index} type={activeTab === 0 ? 'pending' : activeTab === 1 ? 'picked' : 'attempted'} />
                            ))}
                        </>
                    )}
                </ScrollView>
            </View>
        </SafeAreaWrapper>

    )
}

export default PharmacyWiseOrder

const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F5F7FA",
    },
    tabButton: {
        width: SIZE.width / 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: SIZES.wp(20 / 4.2),
        paddingBottom: SIZES.wp(12 / 4.2),
        borderBottomWidth: SIZES.wp(1 / 4.2),
        borderBottomColor: '#ABABAB',
    },
    tabButtonText: {
        ...FONTS.regular,
        lineHeight: 20,
        fontSize: SIZES.wp(14 / 4.2),
        color: '#ABABAB',
        textAlign: 'center',
    },
    activeTab: {
        borderBottomColor: '#666666',
        borderBottomWidth: SIZES.wp(2 / 4.2),
    },
    activeTabText: {
        color: '#4A4D4E',
    },
    container: {
        padding: SIZES.wp(20 / 4.2),
        flex: 1,
    },
    error: {
        color: 'red',
        fontSize: 16,
    },
    noOrders: {
        fontSize: 16,
        fontStyle: 'italic',
    },
})