import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { color, size, weight } from '../../assets/theme/theme';
import BackHeader from '../../components/BackHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';

const Schedule = props => {
    const navigation = useNavigation();
    const { ScheduledPickupDate, ScheduledDeliveryDate, OrderId, Id } =
        props.route.params;
    const [state, setState] = useState({
        schedule: {
            pickupDate: '',
            pickupTime: '',
            deliveryDate: '',
            deliveryTime: '',
            currentDate: new Date(),
        },
        isDatePickerVisible: false,
        isTimePickerVisible: false,
        status: '',
    });

    // Date  Picker
    const showDatePicker = () => {
        setState(prevState => ({
            ...prevState,
            isDatePickerVisible: true,
        }));
    };
    const hideDatePicker = () => {
        setState(prevState => ({
            ...prevState,
            isDatePickerVisible: false,
        }));
    };
    const handleConfirm = date => {
        hideDatePicker();
        if (state.status === 'pickup') {
            setState(prevState => ({
                ...prevState,
                schedule: {
                    ...prevState.schedule,
                    pickupDate: date,
                },
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                schedule: {
                    ...prevState.schedule,
                    deliveryDate: date,
                },
            }));
        }
    };

    // Time Picker
    const showTimePicker = () => {
        setState(prevState => ({
            ...prevState,
            isTimePickerVisible: true,
        }));
    };
    const hideTimePicker = () => {
        setState(prevState => ({
            ...prevState,
            isTimePickerVisible: false,
        }));
    };
    const handleTimeConfirm = time => {
        hideTimePicker();
        if (state.status === 'pickup') {
            setState(prevState => ({
                ...prevState,
                schedule: {
                    ...prevState.schedule,
                    pickupTime: time,
                },
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                schedule: {
                    ...prevState.schedule,
                    deliveryTime: time,
                },
            }));
        }
    };

    const pickUpDate = state.schedule.pickupDate
        ? new Date(state.schedule.pickupDate).toDateString()
        : new Date(ScheduledPickupDate).toDateString();

    const deliveryDate = state.schedule.deliveryDate
        ? new Date(state.schedule.deliveryDate).toDateString()
        : new Date(ScheduledDeliveryDate).toDateString();

    // Time Data
    const pickUpTime = state.schedule.pickupTime
        ? new Date(state.schedule.pickupTime).toTimeString()
        : new Date(ScheduledPickupDate).toTimeString();

    const deliveryTime = state.schedule.deliveryTime
        ? new Date(state.schedule.deliveryTime).toTimeString()
        : new Date(ScheduledDeliveryDate).toTimeString();

    return (
        <View style={styles.container}>
            <BackHeader title="Add Note to Order " subTitle="" unique="" />
            <View style={styles.containerInner}>

                <View style={{ marginTop: 10, marginBottom: Platform.isPad ? 60 : 40 }}>
                    <Text style={styles.title}>Notes (Required)</Text>

                    <TextInput
                        placeholderTextColor={color.gray}
                        style={[styles.title, { color: color.black, marginLeft: -5}]}
                        placeholder=" Please provide additional note "
                        multiline={true}
                    />
                </View>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('DrawerNavigator', { OrderId: OrderId, Id: Id })
                    }
                    style={styles.button}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            'Information',
                            `Delivery date should in future. Now is ${new Date(
                                state.schedule.currentDate,
                            ).toLocaleString()} , you set ${new Date(
                                deliveryDate,
                            ).toLocaleString()}. Please verify!. `,
                        );
                    }}
                    style={[styles.button, { backgroundColor: '#7cc221' }]}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>

            <DateTimePickerModal
                isVisible={state.isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                backgroundColor={Platform.OS === 'ios' ? color.white : color.primary}
            />
            <DateTimePickerModal
                isVisible={state.isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
                backgroundColor={Platform.OS === 'ios' ? color.white : color.primary}
            />
        </View>
    );
};

export default Schedule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.secondary,
    },
    containerInner: {
        width: '90%',
        alignSelf: 'center',
    },
    title: {
        paddingTop: 20,
        color: color.primary,
        fontSize: Platform.isPad ? size.font12 : size.font14,
        fontFamily: 'ITCAvantGardeStd-Bk',
    },
    box: {
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    boxInner: {
        width: '50%',
        marginTop: 15,
    },
    text: {
        color: color.black,
        fontSize: Platform.isPad ? size.font12 : size.font14,
        fontFamily: 'ITCAvantGardeStd-Bk',
    },
    button: {
        width: '100%',
        height: '13.5%',
        backgroundColor: color.red,
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: color.white,
        fontSize: Platform.isPad ? size.font12 : size.font14,
        fontFamily: 'ITCAvantGardeStd-Bk',
        fontWeight: weight.regular,
    },
});
