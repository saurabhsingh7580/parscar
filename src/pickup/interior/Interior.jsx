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
import { color, size, weight } from '../../assets/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import PDHeader from '../PDHeader';
const Interior = props => {
    const { OrderId } = props.route.params;
    const [state, setState] = useState({
        Status: false,
        ImageCollection: {
            Instrument: null,
            OrderId: null,
            InstrumentUpload: false,
            Mileage: null,
            Fuel: null,
            CheckoutStatus: false,
            Description: null,
        },
        ImageSideName: {
            InstrumentSide: 'Instrument Cluster',
        },
        ImageUrl: {
            InstrumentSideUrl: require('../../assets/icons/interior_dashboard.png'),
        },
        IconCollection: {
            CameraIcon: require('../../assets/icons/camera.png'),
            DeleteIcon: require('../../assets/icons/delete.png'),
        },
        StatusVisible: false,
        SelectedFuel: 'Empty',
        FuelVisible: false,
        Checkout: false,
        modalVisible: {
            PictureType: false,
            SideName: null,
        },
    });

    console.log(state.ImageCollection, 'ImageCollection');
    const toggleModal = () => {
        setState(prevState => ({
            ...prevState,
            FuelVisible: !state.FuelVisible,
        }));
    };
    const checkFunc = () => {
        setState(prevState => ({
            ...prevState,
            ImageCollection: {
                ...prevState.ImageCollection,
                CheckoutStatus: !state.ImageCollection.CheckoutStatus,
            },
        }));
    };
    const getImage = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(
                image.path,
                '**************** Image Url From Camera ***************',
            );
            setState(prevState => ({
                ...prevState,
                ImageCollection: {
                    ...prevState.ImageCollection,
                    Instrument: image.path,
                    OrderId: OrderId,
                    InstrumentUpload: true,
                },
            }));
        });
    };

    const deleteImage = () => {
        setState(prevState => ({
            ...prevState,
            ImageCollection: {
                ...prevState.ImageCollection,
                Instrument: null,
                OrderId: OrderId,
                InstrumentUpload: false,
            },
            Status: false,
        }));
    };

    const onCheck = () => {
        if (
            state.ImageCollection.Instrument &&
            state.ImageCollection.Mileage &&
            state.ImageCollection.Fuel
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
        state.ImageCollection.Instrument,
        state.ImageCollection.Mileage,
        state.ImageCollection.Fuel,
    ]);

    const setOject = async object => {
        try {
            const seri = JSON.stringify(object);
            await AsyncStorage.setItem('Interior' + OrderId, seri),
                console.log('Interior object store,successfully...');
        } catch (error) {
            console.log(error, ' Interior error ....');
        }
    };

    const getObject = async id => {
        try {
            const seri = await AsyncStorage.getItem('Interior' + id);
            if (seri !== null) {
                const parsedData = JSON.parse(seri);
                console.log('Retrived object dk', parsedData);
                setState(prevState => ({
                    ...prevState,
                    ImageCollection: {
                        ...prevState.ImageCollection,
                        Instrument: parsedData.Instrument,
                        InstrumentUpload: parsedData.InstrumentUpload,
                        Mileage: parsedData.Mileage,
                        Fuel: parsedData.Fuel,
                        OrderId: parsedData.OrderId,
                        Description: parsedData.Description,
                        CheckoutStatus: parsedData.CheckoutStatus,
                    },
                }));
            }
        } catch (error) {
            console.log(error, 'retrived');
        }
    };
    useEffect(() => {
        if (
            state.ImageCollection.Instrument ||
            state.ImageCollection.InstrumentUpload ||
            state.ImageCollection.Fuel ||
            state.ImageCollection.Mileage ||
            state.ImageCollection.OrderId ||
            state.ImageCollection.CheckoutStatus ||
            state.ImageCollection.Description
        ) {
            setOject(state.ImageCollection);
            return;
        }

    }, [
        state.ImageCollection.Instrument,
        state.ImageCollection.InstrumentUpload,
        state.ImageCollection.Fuel,
        state.ImageCollection.Mileage,
        state.ImageCollection.OrderId,
        state.ImageCollection.CheckoutStatus,
        state.ImageCollection.Description
    ]);

    useEffect(() => {
        getObject(OrderId);
    }, []);



    const ImageAdd = ({
        SideName,
        Upload,
        ImageUrl,
        UpdatedImageUrl,
        IconName,
        getImage,
        deleteImage,
    }) => {
        return (
            <View style={styles.body}>
                <View style={styles.sideNameStyle}>
                    <Text style={styles.textStyle}>{SideName}</Text>
                    <Text style={[styles.textStyle, { color: color.gray }]}>
                        {Upload === true ? 'Loaded' : null}
                    </Text>
                </View>
                {UpdatedImageUrl === null ? (
                    <TouchableOpacity
                        onPress={() => {
                            setState(prevState => ({
                                ...prevState,
                                modalVisible: {
                                    PictureType: true,
                                    SideName: SideName,
                                },
                            }));
                        }}>
                        <Image source={ImageUrl} style={styles.imageStyle} />
                    </TouchableOpacity>
                ) : (
                    <Image
                        source={{ uri: UpdatedImageUrl }}
                        style={[
                            styles.imageStyle,
                            {
                                marginBottom: 10,
                                width: '90%',
                                alignSelf: 'center',
                                resizeMode: 'contain',
                                height: 250,
                            },
                        ]}
                    />
                )}

                <TouchableOpacity
                    onPress={() => getImage(SideName)}
                    style={[styles.contentstyle, { elevation: 2 }]}>
                    <Text style={[styles.textStyle, { textTransform: 'none' }]}>
                        {' '}
                        Take a picture of the{' '}
                        <Text style={{ color: color.primary }}>{SideName}</Text>
                    </Text>
                </TouchableOpacity>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        onPress={() => deleteImage(SideName)}
                        style={styles.buttonStyle}>
                        <Image source={IconName.DeleteIcon} style={styles.iconStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => getImage(SideName)}
                        style={styles.buttonStyle}>
                        <Image source={IconName.CameraIcon} style={styles.iconStyle} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <PDHeader
                HeaderName={'Interior'}
                OrderId={OrderId}
                Screen={'Inspact'}
                InformationStatus={'Next'}
                Status={state.Status}
            />
            <ScrollView>
                <View style={styles.containerInner}>
                    <ImageAdd
                        SideName={state.ImageSideName.InstrumentSide}
                        Upload={state.ImageCollection.InstrumentUpload}
                        ImageUrl={state.ImageUrl.InstrumentSideUrl}
                        UpdatedImageUrl={state.ImageCollection.Instrument}
                        IconName={state.IconCollection}
                        getImage={getImage}
                        deleteImage={deleteImage}
                    />

                    <View style={styles.content}>
                        <View style={styles.contentInner}>
                            <Text style={[styles.textStyle, { color: color.primary }]}>
                                odometer
                            </Text>
                            <View style={styles.box}>
                                <Text style={[styles.textStyle, { color: color.primary }]}>
                                    Odo
                                </Text>
                                <TextInput
                                    onChangeText={text => {
                                        setState(prevState => ({
                                            ...prevState,
                                            ImageCollection: {
                                                ...prevState.ImageCollection,
                                                Mileage: text,
                                            },
                                        }));
                                    }}
                                    value={state.ImageCollection.Mileage}
                                    style={[
                                        styles.textStyle,
                                        {
                                            marginLeft: 10,
                                            width: '100%',
                                        },
                                    ]}
                                    keyboardType="number-pad"
                                    placeholder="Odometer"
                                />
                            </View>
                            <View
                                style={[
                                    styles.box,
                                    { borderBottomWidth: 0, justifyContent: 'space-between' },
                                ]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require('../../assets/icons/fuel.png')}
                                        style={[
                                            styles.iconStyle,
                                            {
                                                tintColor: color.primary,
                                                width: 20,
                                                height: 20,
                                            },
                                        ]}
                                    />
                                    <TouchableOpacity onPress={toggleModal}>
                                        <Text style={[styles.textStyle, { marginLeft: 10 }]}>
                                            {state.ImageCollection.Fuel}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={toggleModal}>
                                    <Text
                                        style={[
                                            styles.textStyle,
                                            { marginLeft: 10, color: color.gray },
                                        ]}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.contentInner}>
                            <View style={styles.lightView}>
                                <Text style={[styles.textStyle, { textTransform: 'capitalize' }]}>
                                    Service Lights
                                </Text>

                                <TouchableOpacity onPress={checkFunc} style={styles.check}>
                                    {state.ImageCollection.CheckoutStatus === true ? (
                                        <Image
                                            source={require('../../assets/icons/done.png')}
                                            style={styles.checkIcon}
                                        />
                                    ) : null}
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.detailsText}>Details</Text>
                            <TextInput
                                placeholder="Please provide Details"
                                style={[styles.detailsText, { marginTop: 0, color: color.black }]}
                                placeholderTextColor={color.gray}
                                onChangeText={text => {
                                    setState(prevState => ({
                                        ...prevState,
                                        ImageCollection: {
                                            ...prevState.ImageCollection,
                                            Description: text,
                                        },
                                    }));
                                }}
                                value={state.ImageCollection.Description}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Modal isVisible={state.FuelVisible}>
                <View style={styles.modal}>
                    <View style={styles.modalInner}>
                        <Text style={styles.text}>Fuel/Charge</Text>

                        <TouchableOpacity
                            onPress={() => {
                                toggleModal();
                                setState(prevState => ({
                                    ...prevState,
                                    ImageCollection: {
                                        ...prevState.ImageCollection,
                                        Fuel: 'Full',
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}>Full</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                toggleModal();
                                setState(prevState => ({
                                    ...prevState,
                                    ImageCollection: {
                                        ...prevState.ImageCollection,
                                        Fuel: '7/8',
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}>7/8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                toggleModal();
                                setState(prevState => ({
                                    ...prevState,
                                    ImageCollection: {
                                        ...prevState.ImageCollection,
                                        Fuel: '3/4',
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}>3/4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                toggleModal();
                                setState(prevState => ({
                                    ...prevState,
                                    ImageCollection: {
                                        ...prevState.ImageCollection,
                                        Fuel: '5/8',
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}>5/8</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                toggleModal();
                                setState(prevState => ({
                                    ...prevState,
                                    ImageCollection: {
                                        ...prevState.ImageCollection,
                                        Fuel: '1/2',
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}>1/2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                toggleModal();
                                setState(prevState => ({
                                    ...prevState,
                                    ImageCollection: {
                                        ...prevState.ImageCollection,
                                        Fuel: '3/8',
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}>3/8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                toggleModal();
                                setState(prevState => ({
                                    ...prevState,
                                    ImageCollection: {
                                        ...prevState.ImageCollection,
                                        Fuel: '1/4',
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}>1/4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                toggleModal();
                                setState(prevState => ({
                                    ...prevState,
                                    ImageCollection: {
                                        ...prevState.ImageCollection,
                                        Fuel: '1/8',
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}>1/8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                toggleModal();
                                setState(prevState => ({
                                    ...prevState,
                                    ImageCollection: {
                                        ...prevState.ImageCollection,
                                        Fuel: 'Empty',
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}>Empty</Text>
                        </TouchableOpacity>
                        <Text onPress={toggleModal} style={styles.cancel}>
                            Cancel
                        </Text>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={state.modalVisible.PictureType}>
                <View style={styles.modal}>
                    <View style={styles.modalInner}>
                        <TouchableOpacity
                            onPress={() => {
                                getImage(state.modalVisible.SideName);
                                setState(prevState => ({
                                    ...prevState,
                                    modalVisible: {
                                        PictureType: false,
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setState(prevState => ({
                                    ...prevState,
                                    modalVisible: {
                                        PictureType: false,
                                    },
                                }));
                            }}>
                            <Text style={styles.selectText}> Photo Library</Text>
                        </TouchableOpacity>
                        <Text
                            onPress={() => {
                                setState(prevState => ({
                                    ...prevState,
                                    modalVisible: {
                                        PictureType: false,
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

export default Interior;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    containerInner: {
        marginBottom: 10,
    },
    body: {
        width: '100%',
        elevation: 1,
        backgroundColor: color.white,
    },
    sideNameStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 15,
    },
    imageStyle: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    contentstyle: {
        backgroundColor: color.white,
        paddingHorizontal: 25,
        paddingVertical: 7,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 32,
    },
    textStyle: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        color: color.black,
        fontFamily: 'ITCAvantGardeStd-Bk',
        textTransform: 'uppercase',
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 15,
    },
    buttonStyle: {
        width: '50%',
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: color.gray,
    },
    iconStyle: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
        tintColor: color.gray,
    },
    content: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: color.white,
        marginTop: 10,
        elevation: 1,
    },
    contentInner: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 10,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        paddingVertical: Platform.isPad ? 20 : 10,
        borderColor: color.gray,
    },
    lightView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: color.gray,
        paddingBottom: Platform.isPad ? 20 : 20,
    },
    check: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: color.black,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        width: 20,
        height: 20,
    },
    detailsText: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        fontWeight: weight.low,
        fontFamily: 'ITCAvantGardeStd-Demi',
        color: color.gray,
        marginTop: 20,
    },
    modal: {
        width: '100%',
        alignSelf: 'center',
        height: '100%',
        // backgroundColor: '#000000aa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalInner: {
        width: '95%',
        backgroundColor: color.white,
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: 5,
        padding: Platform.isPad ? 40 : 20,
    },
    text: {
        fontSize: size.font18,
        fontWeight: weight.medium,
        fontFamily: 'ITCAvantGardeStd-Demi',
        color: color.black,
    },
    selectText: {
        fontSize: size.font14,
        fontWeight: weight.low,
        color: color.black,
        marginTop: 20,
        textTransform: 'uppercase',
        marginLeft: 10,
    },
    cancel: {
        fontSize: Platform.isPad ? size.font10 : size.font14,
        fontWeight: weight.low,
        fontFamily: 'ITCAvantGardeStd-Bk',
        color: color.primary,
        textAlign: 'right',
        textTransform: 'uppercase',
        marginTop: 10,
    },
});
