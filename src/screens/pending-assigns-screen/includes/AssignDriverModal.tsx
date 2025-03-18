import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, SIZES } from '@app/themes/themes'
import Divider from '@app/components/Divider'
import Button from '@app/components/Button'
import { Dropdown } from 'react-native-element-dropdown';
import { assignDriver, deliveryAgents } from '@app/services/api'
import { useToast } from 'react-native-toast-notifications';

interface AssignDriverModalProps {
    orderId: any;
    setModalVisible: (value: boolean) => void;
    fetchUnassignedOrders: () => void;
}

const AssignDriverModal = ({ orderId, setModalVisible, fetchUnassignedOrders }: AssignDriverModalProps) => {
    const toast = useToast();

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [deliveryAgentsData, setDeliveryAgentsData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDeliveryAgents = async () => {
        try {
            const data = await deliveryAgents();
            setDeliveryAgentsData(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDeliveryAgents();
    }, []);

    const handleAssign = async () => {
        if (!value) {
            return;
        }
        try {
            setLoading(true);
            const response = await assignDriver(value, orderId);
            if (response.StatusCode === 6000) {
                showToast();
                setValue(null);
                setModalVisible(false);
                fetchUnassignedOrders();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const CustomToast = () => {
        return (
            <View style={styles.customToast}>
                <Text style={styles.toastText}>Order assigned successfully</Text>
            </View>
        );
    };

    const showToast = () => {
        toast.show('', {
            data: { renderToast: () => CustomToast() },
        });
    };

    return (
        <View>
            <View style={styles.smallDash} />
            <View style={styles.container}>
                <View>
                    <Text style={styles.titleText}>Assign Driver</Text>
                </View>
                <Divider color='#DFDFDF' marginVertical={24} />
                <View style={styles.dropdownContainer}>
                    <Text style={styles.dropdownText}>Drivers</Text>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={deliveryAgentsData}
                        labelField="name"
                        valueField="id"
                        placeholder={!isFocus ? 'Select drivers' : '...'}
                        value={value}
                        onFocus={() => {
                            setIsFocus(true);
                            setIsOpen(true);
                        }}
                        onBlur={() => {
                            setIsFocus(false);
                            setIsOpen(false);
                        }}
                        onChange={item => {
                            setValue(item.id);
                            setIsFocus(false);
                            setIsOpen(false);
                        }}
                        dropdownPosition="auto"
                        maxHeight={200}
                    />
                </View>
                {/* Add spacer when dropdown is open */}
                {isOpen && <View style={{ height: SIZES.wp(200 / 4.2) }} />}
                <View>
                    <Button label='Assign' buttonStyle={{ marginTop: 0 }} onPressFunction={handleAssign} loading={loading}/>
                </View>
            </View>
        </View>
    )
}

export default AssignDriverModal

const styles = StyleSheet.create({
    smallDash: {
        width: SIZES.wp(70 / 4.2),
        height: SIZES.wp(6 / 4.2),
        backgroundColor: '#D4D4D4',
        borderRadius: SIZES.wp(30 / 4.2),
        alignSelf: 'center',
        marginBottom: SIZES.wp(12 / 4.2),
    },
    titleText: {
        ...FONTS.regular,
        fontSize: SIZES.wp(18 / 4.2),
        color: '#191919',
        lineHeight: 22,
    },
    dropdownText: {
        ...FONTS.medium,
        fontSize: SIZES.wp(14 / 4.2),
        color: '#676767',
        lineHeight: 18,
    },
    container: {
        // Add a minHeight to ensure content is visible
        // minHeight: SIZES.wp(180 / 4.2),
    },
    content: {
        // minHeight: SIZES.wp(180 / 4.2),


    },
    dropdown: {
        height: 50,
        borderColor: '#DBDCDF',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 8,
        zIndex: 1000,
    },
    placeholderStyle: {
        ...FONTS.regular,
        fontSize: SIZES.wp(14 / 4.2),
        color: '#B6B6B6',
        lineHeight: 24,
    },
    selectedTextStyle: {
        ...FONTS.regular,
        fontSize: SIZES.wp(14 / 4.2),
        lineHeight: 24,
        color: '#191919',
    },
    dropdownContainer: {
        marginBottom: SIZES.wp(50 / 4.2),
        rowGap: SIZES.wp(8 / 4.2),
        zIndex: 1000,
    },

    customToast: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: SIZES.wp(13 / 4.2),
        paddingHorizontal: SIZES.wp(25 / 4.2),
        borderRadius: SIZES.wp(34 / 4.2),
        bottom: SIZES.wp(100 / 4.2),
    },
    toastText: {
        ...FONTS.medium,
        fontSize: SIZES.wp(12 / 4.2),
        color: COLORS.primary,
    },
})