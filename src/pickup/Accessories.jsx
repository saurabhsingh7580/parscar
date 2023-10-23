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
import { color, size, weight } from '../assets/theme/theme';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import PDHeader from './PDHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Accessories = props => {
    const navigation = useNavigation();
    const { OrderId, value } = props.route.params;
    const [state, setState] = useState({
        Status: false,
        ModalVisible: {
            IsModal: false,
            Title: null,
            List: [],
            UpdatedStatus: null,
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
            Description: null
        },
       
        ListKey: {
            Air: {
                Key: 'Air Conditioning',
                Value: ['Non-working', 'Working'],
            },
            Radio: {
                Key: 'Radio',
                Value: ['Non-working', 'Working'],
            },
            Heater: {
                Key: 'Heater',
                Value: ['Non-working', 'Working'],
            },
            Horn: {
                Key: 'Horn',
                Value: ['Non-working', 'Working'],
            },
            Wipers: {
                Key: 'Wipers',
                Value: ['Non-working', 'Working'],
            },
            TurnSignals: {
                Key: 'Tern Signals',
                Value: ['Non-working', 'Working'],
            },
            BreakLights: {
                Key: 'Brake Lights',
                Value: ['Non-working', 'Working'],
            },
            HeadLights: {
                Key: 'Headlights',
                Value: ['Non-working', 'Working'],
            },
            Tires: {
                Key: 'Tires',
                Value: ['Good', 'Fair', 'Poor'],
            },
        },
    });
    const getValue = ({ item, data }) => {
        if (data === state.ListKey.Air.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Air: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.Radio.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Radio: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.Heater.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Heater: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.Horn.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Horn: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.Wipers.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Wipers: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.TurnSignals.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    TurnSignals: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.BreakLights.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    BreakLights: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.HeadLights.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    HeadLights: item,
                },
            }));
            return;
        }

        if (data === state.ListKey.Tires.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Tires: item,
                },
            }));
            return;
        }
    };
    const GeneralList = ({ title, modalValues, status, page }) => {
        console.log('modalvalues', modalValues);
        return (
            <TouchableOpacity
                onPress={() => {
                    setState(prevState => ({
                        ...prevState,
                        ModalVisible: {
                            IsModal: true,
                            Title: title,
                            List: modalValues,
                        },
                    }));
                }}
                style={styles.list}>
                <Text style={[styles.heading, { color: color.black }]}>{title}</Text>
                <View style={styles.listInner}>
                    <Text style={styles.heading}>{status}</Text>
                    <Image
                        source={require('../assets/icons/arrow.png')}
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
        );
    };



    const onCheck = () => {
        if (
            state.UpdatedModalstatus.Air &&
            state.UpdatedModalstatus.Radio &&
            state.UpdatedModalstatus.Heater &&
            state.UpdatedModalstatus.Horn &&
            state.UpdatedModalstatus.Wipers &&
            state.UpdatedModalstatus.TurnSignals &&
            state.UpdatedModalstatus.BreakLights &&
            state.UpdatedModalstatus.HeadLights &&
            state.UpdatedModalstatus.Tires
        ) {
            setState(prevState => ({
                ...prevState,
                Status: true,
            }));
        }
    };

    useEffect(() => {
        onCheck();
    }, [
        state.UpdatedModalstatus.Air,
        state.UpdatedModalstatus.Radio,
        state.UpdatedModalstatus.Heater,
        state.UpdatedModalstatus.Horn,
        state.UpdatedModalstatus.Wipers,
        state.UpdatedModalstatus.TurnSignals,
        state.UpdatedModalstatus.BreakLights,
        state.UpdatedModalstatus.HeadLights,
        state.UpdatedModalstatus.Tires,
        state.UpdatedModalstatus.InputData,
    ]);


    const setOject = async object => {
        try {
            const seri = JSON.stringify(object);
            await AsyncStorage.setItem('Accessories' + OrderId, seri),
                console.log('Accessories object store,successfully...');
        } catch (error) {
            console.log(error, ' Accessories error ....');
        }
    };

    const getObject = async id => {
        try {
            const seri = await AsyncStorage.getItem('Accessories' + id);
            if (seri !== null) {
                const parsedData = JSON.parse(seri);
                console.log('Retrived object dk', parsedData);
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
        getObject(OrderId);
      }, []);


      const setDoneStatus = async object => {
        try {
            const seri = JSON.stringify(object);
            await AsyncStorage.setItem('AccessoriesStatus' + OrderId, seri),
                console.log('AccessoriesStatus object store,successfully...');
        } catch (error) {
            console.log(error, ' AccessoriesStatus error ....');
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <PDHeader
                HeaderName={'Safely And Accessories'}
                OrderId={OrderId}
                Screen={'PickupReport'}
                InformationStatus={'Done'}
                Status={state.Status}
                CallBackFunction ={setOject}
                CallBackFuncValue={state.UpdatedModalstatus}
            />
            <ScrollView>
                <View style={styles.containerInner}>
                    <View style={styles.body}>
                        <GeneralList
                            title={state.ListKey.Air.Key}
                            modalValues={state.ListKey.Air.Value}
                            status={state.UpdatedModalstatus.Air}
                        />
                        <GeneralList
                            title={state.ListKey.Radio.Key}
                            modalValues={state.ListKey.Radio.Value}
                            status={state.UpdatedModalstatus.Radio}
                        />

                        <GeneralList
                            title={state.ListKey.Heater.Key}
                            modalValues={state.ListKey.Heater.Value}
                            status={state.UpdatedModalstatus.Heater}
                        />

                        <GeneralList
                            title={state.ListKey.Horn.Key}
                            modalValues={state.ListKey.Horn.Value}
                            status={state.UpdatedModalstatus.Horn}
                        />
                        <GeneralList
                            title={state.ListKey.Wipers.Key}
                            modalValues={state.ListKey.Wipers.Value}
                            status={state.UpdatedModalstatus.Wipers}
                        />
                        <GeneralList
                            title={state.ListKey.TurnSignals.Key}
                            modalValues={state.ListKey.TurnSignals.Value}
                            status={state.UpdatedModalstatus.TurnSignals}
                        />
                        <GeneralList
                            title={state.ListKey.BreakLights.Key}
                            modalValues={state.ListKey.BreakLights.Value}
                            status={state.UpdatedModalstatus.BreakLights}
                        />
                        <GeneralList
                            title={state.ListKey.HeadLights.Key}
                            modalValues={state.ListKey.HeadLights.Value}
                            status={state.UpdatedModalstatus.HeadLights}
                        />
                        <GeneralList
                            title={state.ListKey.Tires.Key}
                            modalValues={state.ListKey.Tires.Value}
                            status={state.UpdatedModalstatus.Tires}
                        />
                    </View>
                </View>
                <View style={styles.containerInner}>
                    <View
                        style={[
                            styles.body,
                            {
                                marginBottom: 40,
                            },
                        ]}>
                        <Text
                            style={[
                                styles.heading,
                                {
                                    textTransform: 'uppercase',
                                },
                            ]}>
                            Other Issues
                        </Text>
                        <TextInput
                            placeholder="Please provide other Issues"
                            style={styles.input}
                            placeholderTextColor={color.gray}
                            multiline={true}
                            onChangeText={text => {
                                setState(prevState => ({
                                    ...prevState,
                                    UpdatedModalstatus: {
                                        ...prevState.UpdatedModalstatus,
                                        InputData: text,
                                    },
                                }));
                            }}
                            value={state.UpdatedModalstatus.InputData}
                        />
                    </View>
                </View>
            </ScrollView>
            <Modal isVisible={state.ModalVisible.IsModal}>
                <View style={styles.modal}>
                    <View style={styles.modalInner}>
                        <Text style={styles.textDesign}>{state.ModalVisible.Title}</Text>
                        {state.ModalVisible.List !== [] &&
                            state.ModalVisible.List.map(item => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setState(prevState => ({
                                            ...prevState,
                                            ModalVisible: {
                                                ...prevState.ModalVisible,
                                                IsModal: false,
                                            },
                                        }));
                                        const data = state.ModalVisible.Title;
                                        getValue({ item, data });
                                    }}>
                                    <Text style={styles.selectText}>{item}</Text>
                                </TouchableOpacity>
                            ))}

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

export default Accessories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.secondary,
    },
    containerInner: {
        width: '100%',
        alignSelf: 'center',
        elevation: 1,
        backgroundColor: color.white,
        marginBottom: 5,
    },
    body: {
        width: '90%',
        alignSelf: 'center',
        elevation: 1,
    },
    heading: {
        fontSize: Platform.isPad ? size.font12 : size.font16,
        color: color.primary,
        marginVertical: 10,
        fontFamily: 'ITCAvantGardeStd-Bk',
    },
    list: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: color.gray,
        paddingBottom: 10,
    },
    listInner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: 20,
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
        fontFamily: 'ITCAvantGardeStd-Demi',
        color: color.black,
    },
    selectText: {
        fontSize: Platform.isPad ? size.font10 : size.font12,
        fontWeight: weight.low,
        fontFamily: 'ITCAvantGardeStd-Bk',
        color: color.black,
        marginTop: Platform.isPad ? 40 : 20,
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
    input: {
        fontSize: Platform.isPad ? size.font10 : size.font12,
        fontWeight: weight.low,
        fontFamily: 'ITCAvantGardeStd-Bk',
        color: color.black,
    },
});
