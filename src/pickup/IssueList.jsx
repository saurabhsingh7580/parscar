import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import { color, size, weight } from '../assets/theme/theme';
import { useNavigation } from '@react-navigation/native';

const IssueList = props => {
    const navigation = useNavigation()
    const { OrderId } = props.route.params;
    console.log(OrderId, 'OrderId');
    const back =() =>{
        navigation.goBack()
    }

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
        },
    });

    const ExButton = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                setState(prevState => ({
                    ...prevState,
                    ModalVisible: {
                        IsModal: true,
                        Title: item.P,
                    },

                }));
            }} style={styles.button}>
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
            <View style={styles.main}>
                <View style={styles.body}>
                    <Text style={styles.title}>Exterior</Text>
                    <ExButton item={state.Exterior.Ding} />
                    <ExButton item={state.Exterior.Dented} />
                </View>
            </View>

            <TouchableOpacity  onPress={() => navigation.navigate('Front', { OrderId: OrderId })} style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Exterior Inspact</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('InteriorInspact', { OrderId: OrderId })} style={styles.main}>
                <View style={styles.body}>
                    <Text style={styles.title}>Interior</Text>
                    <Text style={styles.text}>
                        Key/Fobs :3 , Toll Transponder :No, Key/Fobs :3 ,  Transponder :No
                        , Key/Fobs :3 , Key/Fobs :3 , Toll Transponder :No,
                        Key/Fobs :3 , Toll Transponder :No, Key/Fobs :3 , Toll Transponder :No
                        , Key/Fobs :3 , Toll Transponder :No, Key/Fobs :3 , Toll Transponder :No

                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Accessories', { OrderId: OrderId })} style={[styles.main, { marginTop: 10 }]}>
                <View style={styles.body}>
                    <Text style={styles.title}>Safety and Accessories</Text>
                    <Text style={styles.text}>
                        Air Conditioning:Non-working; Redio : Non-working,
                        Air Conditioning:Non-working;
                        Air Conditioning:Non-working; Redio : Non-working,
                        Redio : Non-working,
                    </Text>
                </View>
            </TouchableOpacity>

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

export default IssueList;

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
        paddingTop: 10,
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
        marginVertical: 10
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
        lineHeight: 20,
        textAlign: 'justify'
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
