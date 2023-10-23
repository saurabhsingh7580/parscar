import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import { color, size, weight } from '../assets/theme/theme';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sign = props => {
    const navigation = useNavigation();
    const { OrderId } = props.route.params;
    console.log(OrderId, 'OrderId');
    const back = () => {
        navigation.goBack();
    };

    const [state, setState] = useState({
        ModalVisible: {
            IsModal: false,
            Title: null,
        },
        Exterior: {
            Ding: {
                Key: 'Ding',
                Value: ['Edit', 'Delete'],
                P: 'P1',
            },
            Dented: {
                Key: 'Dented',
                Value: ['Edit', 'Delete'],
                P: 'P2',
            },
            UpdatedModalstatus: {
                Air: null,
                Radio: null,
                Heater: null,
                Horn: null,
                Wipers: null,
                TurnSignals: null,
                BreakLights: null,
                HeadLights: null,
                Tires: null,
                InputData: null,
                Description: null,
            },
            getInteriorData: {
                FobsCombined: null,
                Keys: null,
                KeyFobs: null,
                Windshield: null,
                Telematics: null,
                Toll: null,
                Odor: null,
                Smoke: null,
                Pet: null,
            },
        },
    });

    const getAccessories = async id => {
        try {
            const seri = await AsyncStorage.getItem('Accessories' + id);
            if (seri !== null) {
                const parsedData = JSON.parse(seri);
                console.log('Retrived Sign object dk', parsedData);
                setState(prevState => ({
                    ...prevState,
                    UpdatedModalstatus: {
                        ...prevState.UpdatedModalstatus,
                        Air: parsedData.Air,
                        Radio: parsedData.Radio,
                        Heater: parsedData.Heater,
                        Horn: parsedData.Horn,
                        OrderId: parsedData.OrderId,
                        Wipers: parsedData.Wipers,
                        TurnSignals: parsedData.TurnSignals,
                        BreakLights: parsedData.BreakLights,
                        HeadLights: parsedData.HeadLights,
                        Tires: parsedData.Tires,
                    },
                }));
            }
        } catch (error) {
            console.log(error, 'retrived');
        }
    };

    useEffect(() => {
        getAccessories(OrderId);
        getInteriorInspact(OrderId);
    }, []);

    const ExButton = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setState(prevState => ({
                        ...prevState,
                        ModalVisible: {
                            IsModal: true,
                            Title: item.P,
                        },
                    }));
                }}
                style={styles.button}>
                <View style={styles.buttonInner}>
                    <Text style={styles.buttonText}>{item.P}</Text>
                    <Text
                        style={[styles.buttonText, { marginLeft: 15, color: color.black }]}>
                        {item.Key}
                    </Text>
                </View>
                <Image
                    source={require('../assets/icons/arrow.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        );
    };

    const getInteriorInspact = async id => {
        try {
            const seri = await AsyncStorage.getItem('InteriorInspact' + id);
            if (seri !== null) {
                const parsedData = JSON.parse(seri);
                console.log('Retrived  kxnvkv object dk', parsedData);
                setState(prevState => ({
                    ...prevState,
                    getInteriorData: {
                        ...prevState.getInteriorData,
                        FobsCombined: parsedData.FobsCombined,
                        Keys: parsedData.Keys,
                        KeyFobs: parsedData.KeyFobs,
                        Windshield: parsedData.Windshield,
                        Telematics: parsedData.Telematics,
                        OrderId: parsedData.OrderId,
                        Toll: parsedData.Toll,
                        Odor: parsedData.Odor,
                        Smoke: parsedData.Smoke,
                        Pet: parsedData.Pet,
                    },
                }));
            }
        } catch (error) {
            console.log(error, 'retrived');
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerInner}>
                    <Icon
                        name="arrow-back-outline"
                        size={Platform.isPad ? size.font18 : size.font24}
                        color={color.white}
                        onPress={back}
                    />
                    <View style={styles.headerStyle}>
                        <Text style={styles.headerTitle}>PARS Drivers</Text>
                        <Text style={styles.headerSubTitle}>{OrderId}</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={styles.main}>
                    <View style={styles.body}>
                        <Text style={styles.title}>Exterior</Text>
                        <ExButton item={state.Exterior.Ding} />
                        <ExButton item={state.Exterior.Dented} />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Front', { OrderId: OrderId })}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>Exterior Inspact</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('InteriorInspact', { OrderId: OrderId })
                    }
                    style={styles.main}>
                    <View style={styles.body}>
                        <Text style={styles.title}>Interior</Text>
                        {state.getInteriorData ? (
                            <Text style={styles.text}>
                                {state.getInteriorData.FobsCombined === 'No'
                                    ? 'Keys/Fobs Combined:' + state.getInteriorData.Air + ','
                                    : null}
                                {state.getInteriorData.KeyFobs
                                    ? ' Key Fobs:' + state.getInteriorData.KeyFobs + ','
                                    : null}
                                {state.getInteriorData.Heater === 'Non-working'
                                    ? ' Heater:' + state.getInteriorData.Heater + ','
                                    : null}
                                {state.getInteriorData.Horn === 'Non-working'
                                    ? ' Horn:' + state.getInteriorData.Horn + ','
                                    : null}
                                {state.getInteriorData.Wipers === 'Non-working'
                                    ? ' Wipers:' + state.getInteriorData.Wipers + ','
                                    : null}
                                {state.getInteriorData.TurnSignals === 'Non-working'
                                    ? ' Turn Signals:' + state.getInteriorData.TurnSignals + ','
                                    : null}
                                {state.getInteriorData.BreakLights === 'Non-working'
                                    ? ' Break Lights:' + state.getInteriorData.BreakLights + ','
                                    : null}
                                {state.getInteriorData.HeadLights === 'Non-working'
                                    ? ' HeadLights:' + state.getInteriorData.HeadLights + ','
                                    : null}
                            </Text>
                        ) : null}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Accessories', { OrderId: OrderId })}
                    style={[styles.main, { marginTop: 10 }]}>
                    <View style={styles.body}>
                        <Text style={styles.title}>Safety and Accessories</Text>
                        {state.UpdatedModalstatus ? (
                            <Text style={styles.text}>
                                {state.UpdatedModalstatus.Air === 'Non-working'
                                    ? 'Air Conditioning:' + state.UpdatedModalstatus.Air + ','
                                    : null}
                                {state.UpdatedModalstatus.Radio === 'Non-working'
                                    ? 'Radio:' + state.UpdatedModalstatus.Radio + ','
                                    : null}
                                {state.UpdatedModalstatus.Heater === 'Non-working'
                                    ? 'Heater:' + state.UpdatedModalstatus.Heater + ','
                                    : null}
                                {state.UpdatedModalstatus.Horn === 'Non-working'
                                    ? 'Horn:' + state.UpdatedModalstatus.Horn + ','
                                    : null}
                                {state.UpdatedModalstatus.Wipers === 'Non-working'
                                    ? 'Wipers:' + state.UpdatedModalstatus.Wipers + ','
                                    : null}
                                {state.UpdatedModalstatus.TurnSignals === 'Non-working'
                                    ? 'Turn Signals:' +
                                    state.UpdatedModalstatus.TurnSignals +
                                    ','
                                    : null}
                                {state.UpdatedModalstatus.BreakLights === 'Non-working'
                                    ? 'Break Lights:' +
                                    state.UpdatedModalstatus.BreakLights +
                                    ','
                                    : null}
                                {state.UpdatedModalstatus.HeadLights === 'Non-working'
                                    ? 'HeadLights:' + state.UpdatedModalstatus.HeadLights + ','
                                    : null}
                                {state.UpdatedModalstatus.Tires !== 'Good'
                                    ? 'Tires:' + state.UpdatedModalstatus.Tires + ','
                                    : null}
                            </Text>
                        ) : null}
                    </View>
                </TouchableOpacity>

                <View style={[styles.main, { marginTop: 10 }]}>
                    <View style={styles.body}>
                        <Text style={styles.title}>Pickup Report</Text>
                        <View style={styles.inputStyle}>
                            <Text style={[styles.buttonText, { marginTop: 15 }]}>*Name</Text>
                            <View style={styles.input}>
                                <Image
                                    source={require('../assets/icons/email.png')}
                                    style={styles.iconStyle}
                                />
                                <TextInput
                                    placeholder="name"
                                    value="Katherine Williford"
                                    style={styles.inputText}
                                />
                            </View>
                        </View>
                        <View style={[styles.inputStyle, { borderColor: color.primary }]}>
                            <Text style={[styles.buttonText, { marginTop: 10 }]}>*Email</Text>
                            <View style={styles.input}>
                                <Image
                                    source={require('../assets/icons/email.png')}
                                    style={styles.iconStyle}
                                />
                                <TextInput
                                    placeholder="name"
                                    value="Katherine.illiford@vanigent.com"
                                    style={styles.inputText}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Signature', { OrderId: OrderId })
                            }
                            style={[
                                styles.buttonStyle,
                                {
                                    width: '100%',
                                },
                            ]}>
                            <Text style={styles.buttonTextStyle}>Sign</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        height: 40,
                        marginVertical: 10,
                    }}>
                    <TouchableOpacity
                        style={{
                            borderRightWidth: 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '50%',
                            height: 40,
                        }}>
                        <Text
                            style={[
                                styles.selectText,
                                {
                                    color: color.red,
                                    marginTop: 0,
                                },
                            ]}>
                            Refuse
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderRightWidth: 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '50%',
                            height: 40,
                        }}>
                        <Text
                            style={[
                                styles.selectText,
                                {
                                    color: color.gray,
                                    marginTop: 0,
                                },
                            ]}>
                            Not Available
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal isVisible={state.ModalVisible.IsModal}>
                <View style={styles.modal}>
                    <View style={styles.modalInner}>
                        <Text style={styles.textDesign}>{state.ModalVisible.Title}</Text>

                        <TouchableOpacity
                            onPress={() => {
                                setState(prevState => ({
                                    ...prevState,
                                    ModalVisible: {
                                        ...prevState.ModalVisible,
                                        IsModal: false,
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setState(prevState => ({
                                    ...prevState,
                                    ModalVisible: {
                                        ...prevState.ModalVisible,
                                        IsModal: false,
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}>Delete</Text>
                        </TouchableOpacity>

                        <Text
                            onPress={() => {
                                setState(prevState => ({
                                    ...prevState,
                                    ModalVisible: {
                                        ...prevState.ModalVisible,
                                        IsModal: false,
                                    },
                                }));
                            }}
                            style={styles.cancel}>
                            Cancel
                        </Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Sign;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.secondary,
    },
    header: {
        width: '100%',
        height: Platform.isPad ? 70 : 50,
        backgroundColor: color.primary,
    },
    headerInner: {
        width: '90%',
        backgroundColor: color.primary,
        alignSelf: 'center',
        height: Platform.isPad ? 70 : 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerStyle: {
        marginLeft: 20,
    },
    headerTitle: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        color: color.white,
        fontFamily: 'ITCAvantGardeStd-Bk',
    },
    headerSubTitle: {
        fontSize: Platform.isPad ? size.font12 : size.font12,
        color: color.white,
        fontFamily: 'ITCAvantGardeStd-Bk',
        opacity: 0.7,
        elevation: 3,
    },
    main: {
        width: '100%',
        paddingTop: 20,
        backgroundColor: color.white,
    },
    body: {
        width: '90%',
        alignSelf: 'center',
    },
    title: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        color: color.primary,
        fontFamily: 'ITCAvantGardeStd-Bk',
    },
    button: {
        borderBottomWidth: 0.5,
        borderColor: color.gray,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonInner: {
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        color: color.gray,
        fontFamily: 'ITCAvantGardeStd-Bk',
        lineHeight: 20,
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    buttonStyle: {
        width: '90%',
        alignSelf: 'center',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primary,
        borderRadius: 4,
        marginVertical: 10,
    },
    buttonTextStyle: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        fontWeight: weight.low,
        fontFamily: 'ITCAvantGardeStd-Bk',
        color: color.white,
        textTransform: 'uppercase',
    },
    text: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        fontWeight: weight.low,
        fontFamily: 'ITCAvantGardeStd-Bk',
        color: color.black,
        paddingVertical: 10,
        lineHeight: 25,
        // textAlign: 'justify',
    },
    inputStyle: {
        borderBottomWidth: 0.5,
        borderColor: color.gray,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        width: Platform.isPad ? 40 : 20,
        height: Platform.isPad ? 40 : 20,
        resizeMode: 'contain',
        tintColor: color.black,
        marginRight: 20,
    },
    inputText: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        fontWeight: weight.medium,
        fontFamily: 'ITCAvantGardeStd-Bk',
        color: color.black,
        width: '100%',
    },
    modal: {
        width: '100%',
        alignSelf: 'center',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalInner: {
        width: '95%',
        backgroundColor: color.white,
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: 5,
        padding: 20,
    },
    textDesign: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        fontWeight: weight.medium,
        fontFamily: 'ITCAvantGardeStd-Bk',
        color: color.black,
    },
    selectText: {
        fontSize: Platform.isPad ? size.font10 : size.font12,
        fontWeight: weight.low,
        fontFamily: 'ITCAvantGardeStd-Bk',
        color: color.black,
        marginTop: Platform.isPad ? 40 : 20,
        textTransform: 'uppercase',
    },
    cancel: {
        fontSize: Platform.isPad ? size.font10 : size.font12,
        fontWeight: weight.low,
        fontFamily: 'ITCAvantGardeStd-Bk',
        color: color.primary,
        textAlign: 'right',
        textTransform: 'uppercase',
        marginTop: 10,
    },
});
