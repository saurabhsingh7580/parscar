// import {
//     Image,
//     Platform,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import React, { useState } from 'react';
// import Header from '../../components/PartInfection/Header';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { color, size, weight } from '../../assets/theme/theme';
// import Modal from 'react-native-modal';
// const InteriorInspact = props => {
//     const { OrderId } = props.route.params;
//     const HeaderName = 'Interior Inspact ';
//     const Status = 'Done';

//     const [state, setState] = useState({
//         StatusVisible: false,
//         ModalVisible: {
//             IsModal: false,
//             Title: null,
//             List: [],
//         },
//         UpdatedModalstatus: {
//             FobsCombined: null,
//             Key: null,
//         },
//         ListKey : {
//             Fobs : ''
//         }
//     });

//     console.log('state', state.ModalVisible.List);
//     const general = {
//         'Keys/Fobs Combined': ['Yes', 'No'],
//         Keys: [1, 2, 3, 4],
//         Windshield: ['OK', 'Pitted', 'Cracked', 'Star(s)'],
//         'Toll transponder': ['Yes', 'No'],
//         Odor: ['Ok', 'Bad'],
//         'Smoke Smell': ['Yes', 'No'],
//         'Pet Hair': ['Yes', 'No'],
//     };

//     const Globbox = {
//         'Registration Card': ['No', 'Yes', 'N/A'],
//         'Registration Expiration': ['No', 'Yes', 'N/A'],
//         'Insurance Card': ['No', 'Yes'],
//         'Insurance Expiration': ['No', 'Yes'],
//         'State Inspection': ['No', 'Yes', 'N/A'],
//         'State Inspection Expiration ': ['No', 'Yes'],
//         'Insp. State/Province': ['Ok', 'Bad'],
//         'Fuel card': ['No', 'Yes'],
//         'Maintenance Card': ['No', 'Yes'],
//         "Owner's Manual": ['No', 'Yes'],
//     };

//     // {Keys : 2,Windshield: }

//     console.log(state.ModalVisible.List);
//     const GeneralList = ({ Title, ModalVisible, modalValues, key }) => {
//         console.log('modalvalues', modalValues);
//         return (
//             <TouchableOpacity
//                 key={key}
//                 onPress={() => {
//                     setState(prevState => ({
//                         ...prevState,
//                         ModalVisible: {
//                             IsModal: true,
//                             Title: Title,
//                             List: modalValues,
//                         },
//                     }));
//                 }}
//                 style={styles.list}>
//                 <Text style={[styles.heading, { color: color.black }]}>{Title}</Text>
//                 <View style={styles.listInner}>
//                     <Text style={styles.heading}>a</Text>
//                     <Image
//                         source={require('../../assets/icons/arrow.png')}
//                         style={styles.icon}
//                     />
//                 </View>
//             </TouchableOpacity>
//         );
//     };
//     return (
//         <SafeAreaView style={styles.container}>
//             <Header
//                 HeaderName={HeaderName}
//                 OrderId={OrderId}
//                 Status={Status}
//                 StatusVisible={state.StatusVisible}
//                 Screen={'InteriorInspact'}
//             />
//             <ScrollView>
//                 <View style={styles.containerInner}>
//                     <View style={styles.body}>
//                         <Text style={styles.heading}>General</Text>
//                         {Object.keys(general).map(key => (
//                             <GeneralList
//                                 Title={key}
//                                 modalValues={general[key]}
//                                 key={key}
//                             />
//                         ))}
//                     </View>
//                 </View>

//                 <View style={styles.containerInner}>
//                     <View style={styles.body}>
//                         <Text style={styles.heading}>Glovebox</Text>
//                         {Object.keys(Globbox).map(key => (
//                             <GeneralList
//                                 Title={key}
//                                 modalValues={Globbox[key]}
//                                 key={key}
//                                 Status={state.UpdatedModalstatus.FobsCombined}
//                             />
//                         ))}
//                     </View>
//                 </View>
//             </ScrollView>
//             <Modal isVisible={state.ModalVisible.IsModal}>
//                 <View style={styles.modal}>
//                     <View style={styles.modalInner}>
//                         <Text style={styles.textDesign}>{state.ModalVisible.Title}</Text>
//                         {state.ModalVisible.List !== [] &&
//                             state.ModalVisible.List.map(item => (
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         if (state.ModalVisible.Title === 'Keys/Fabs Combined') {
//                                             setState(prevState => ({
//                                                 ...prevState,
//                                                 UpdatedModalstatus: {
//                                                     ...prevState.UpdatedModalstatus,
//                                                     FobsCombined: item,
//                                                 },
//                                                 ModalVisible: {
//                                                     ...prevState.ModalVisible,
//                                                     IsModal: false,
//                                                 },
//                                             }));
//                                         }
//                                     }}>
//                                     <Text style={styles.selectText}>{item}</Text>
//                                 </TouchableOpacity>
//                             ))}

//                         <Text
//                             onPress={() => {
//                                 setState(prevState => ({
//                                     ...prevState,
//                                     ModalVisible: {
//                                         ...prevState.ModalVisible,
//                                         IsModal: false,
//                                     },
//                                 }));
//                             }}
//                             style={styles.cancel}>
//                             Cancel
//                         </Text>
//                     </View>
//                 </View>
//             </Modal>
//         </SafeAreaView>
//     );
// };

// export default InteriorInspact;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: color.secondary,
//     },
//     containerInner: {
//         width: '100%',
//         alignSelf: 'center',
//         elevation: 1,
//         backgroundColor: color.white,
//         marginBottom: 5,

//     },
//     body: {
//         width: '90%',
//         alignSelf: 'center',
//         elevation: 1,
//     },
//     heading: {
//         fontSize: Platform.isPad ? size.font12 : size.font16,
//         color: color.primary,
//         marginVertical: 10,
//         fontFamily: 'ITCAvantGardeStd-Bk',
//     },
//     list: {
//         width: '100%',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         borderBottomWidth: 0.5,
//         borderColor: color.gray,
//         paddingBottom: 10,
//     },
//     listInner: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     icon: {
//         width: 20,
//         height: 20,
//         resizeMode: 'contain',
//         marginLeft: 20,
//     },
//     modal: {
//         width: '100%',
//         alignSelf: 'center',
//         height: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     modalInner: {
//         width: '95%',
//         backgroundColor: color.white,
//         alignSelf: 'center',
//         position: 'absolute',
//         borderRadius: 5,
//         padding: 20,
//     },
//     textDesign: {
//         fontSize: Platform.isPad ? size.font12 : size.font14,
//         fontWeight: weight.medium,
//         fontFamily: 'ITCAvantGardeStd-Demi',
//         color: color.black,
//     },
//     selectText: {
//         fontSize: Platform.isPad ? size.font10 : size.font12,
//         fontWeight: weight.low,
//         fontFamily: 'ITCAvantGardeStd-Bk',
//         color: color.black,
//         marginTop: Platform.isPad ? 40 : 20,
//         textTransform: 'uppercase',
//         marginLeft: 10,
//     },
//     cancel: {
//         fontSize: Platform.isPad ? size.font10 : size.font12,
//         fontWeight: weight.low,
//         fontFamily: 'ITCAvantGardeStd-Bk',
//         color: color.primary,
//         textAlign: 'right',
//         textTransform: 'uppercase',
//         marginTop: 10,
//     },
// });

import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/PartInfection/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, size, weight } from '../../assets/theme/theme';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
const InteriorInspact = props => {
    const navigation = useNavigation();
    const { OrderId, value, SelectedValue } = props.route.params;

    useEffect(() => {
        if (SelectedValue !== 'Ok') {
            setState(prevState => ({
                ...prevState,
                modalVisible: {
                    PictureType: true,
                    SelectedName: state.ListKey.Windshield.Key
                },
            }));
        }
    }, [SelectedValue])
    const HeaderName = 'Interior Inspact ';
    const Status = 'Done';
    console.log(value, '*******');
    console.log(SelectedValue, 'SelectedValue')
    const [state, setState] = useState({
        StatusVisible: false,
        ModalVisible: {
            IsModal: false,
            Title: null,
            List: [],
            UpdatedStatus: null,
        },
        modalVisible: {
            PictureType: false,
            SelectedName: null
        },
        UpdatedModalstatus: {
            FobsCombined: null,
            Keys: null,
            KeyFobs: null,
            Windshield: null,
            Telematics: null,
            Toll: null,
            Odor: null,
        },
        Images: {
            WindshieldImage: null
        },
        ListKey: {
            Fobs: {
                Key: 'Keys/Fobs Combined',
                Value: ['No', 'Yes'],
            },
            Keys: {
                Key: 'Keys',
                Value: [1, 2, 3, 4],
            },
            KeyFobs: {
                Key: 'Keys/Fobs',
                Value: [1, 2, 3, 4],
            },
            Windshield: {
                Key: 'Windshield',
                Value: ['Ok', 'Pitted', 'Cracked', 'Star(s)'],
            },
            Telematics: {
                Key: 'Telematics Device Present?',
                Value: ['No', 'Yes', 'Unsure'],
            },
            Toll: {
                Key: 'Toll Transponder',
                Value: ['No', 'Yes'],
            },
            Odor: {
                Key: 'Odor',
                Value: ['Ok', 'Bad'],
            },
            Smoke: {
                Key: 'Smoke Smell',
                Value: ['No', 'Yes'],
            },
            Pet: {
                Key: 'Pet Hair',
                Value: ['No', 'Yes'],
            },
        },
    });

    const getPicture = value => {
        console.log(value)
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            if (value === state.ListKey.Windshield.Key) {
                setState(prevState => ({
                    ...prevState,
                    Images: {
                        ...prevState.issue,
                        WindshieldImage: image.path,
                    },
                }));
                return;
            }
        });
    };

    const getValue = ({ item, data }) => {
        if (data === state.ListKey.Fobs.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    FobsCombined: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.Keys.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Keys: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.KeyFobs.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    KeyFobs: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.Windshield.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Windshield: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.Telematics.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Telematics: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.Toll.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Toll: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.Odor.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Odor: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.Smoke.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Smoke: item,
                },
            }));
            return;
        }
        if (data === state.ListKey.Pet.Key) {
            setState(prevState => ({
                ...prevState,
                UpdatedModalstatus: {
                    ...prevState.UpdatedModalstatus,
                    Pet: item,
                },
            }));
            return;
        }
    };
    const GeneralList = ({ title, modalValues, status, page, extraValues, imageUrl }) => {
        console.log('modalvalues', modalValues);
        return (
            <TouchableOpacity
                onPress={() => {
                    if (page === true) {
                        navigation.navigate('SelectInspactIssue', {
                            title: title,
                            modalValues: modalValues,
                        });
                    } else {
                        setState(prevState => ({
                            ...prevState,
                            ModalVisible: {
                                IsModal: true,
                                Title: title,
                                List: modalValues,
                            },
                          
                        }));
                    }
                }}
                style={styles.list}>
                <Text style={[styles.heading, { color: color.black }]}>{title}</Text>
                <View style={styles.listInner}>
                    <Text style={styles.heading}>{extraValues ? extraValues : status}</Text>
                    {/* {imageUrl === null ?
                        <>
                            {extraValues !== 'Ok' ?
                                <TouchableOpacity
                                    onPress={() => {
                                        setState(prevState => ({
                                            ...prevState,
                                            modalVisible: {
                                                PictureType: true,
                                            },
                                        }));
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/icons/camera2.png')}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                                : null}
                        </>
                        :
                        <>
                            {extraValues !== 'Ok' ?
                                <Image
                                    source={{ uri: imageUrl }}
                                    style={[styles.icon, {
                                        width: 30, height: 30,
                                    }]}
                                />
                                : null}
                        </>
                    } */}

                    <Image
                        source={require('../../assets/icons/arrow.png')}
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                HeaderName={HeaderName}
                OrderId={OrderId}
                Status={Status}
                StatusVisible={state.StatusVisible}
                Screen={'InteriorInspact'}
            />
            <ScrollView>
                <View style={styles.containerInner}>
                    <View style={styles.body}>
                        <Text style={styles.heading}>General</Text>

                        <GeneralList
                            title={state.ListKey.Fobs.Key}
                            modalValues={state.ListKey.Fobs.Value}
                            status={state.UpdatedModalstatus.FobsCombined}
                        />
                        {/* <GeneralList
                            title={state.ListKey.Keys.Key}
                            modalValues={state.ListKey.Keys.Value}
                            status={state.UpdatedModalstatus.Keys}
                        /> */}
                        {/* {(state.UpdatedModalstatus.FobsCombined === 'No' || state.UpdatedModalstatus.FobsCombined === null) && */}
                        <GeneralList
                            title={state.ListKey.KeyFobs.Key}
                            modalValues={state.ListKey.KeyFobs.Value}
                            status={state.UpdatedModalstatus.KeyFobs}
                        />
                        {/* } */}

                        <GeneralList
                            title={state.ListKey.Windshield.Key}
                            modalValues={state.ListKey.Windshield.Value}
                            status={state.UpdatedModalstatus.Windshield}
                            page={true}
                            extraValues={SelectedValue}
                            imageUrl={state.Images.WindshieldImage}
                        />
                        <GeneralList
                            title={state.ListKey.Telematics.Key}
                            modalValues={state.ListKey.Telematics.Value}
                            status={state.UpdatedModalstatus.Telematics}
                        />
                        <GeneralList
                            title={state.ListKey.Toll.Key}
                            modalValues={state.ListKey.Toll.Value}
                            status={state.UpdatedModalstatus.Toll}
                        />
                        <GeneralList
                            title={state.ListKey.Odor.Key}
                            modalValues={state.ListKey.Odor.Value}
                            status={state.UpdatedModalstatus.Odor}
                        />
                        <GeneralList
                            title={state.ListKey.Smoke.Key}
                            modalValues={state.ListKey.Smoke.Value}
                            status={state.UpdatedModalstatus.Smoke}
                        />
                        <GeneralList
                            title={state.ListKey.Pet.Key}
                            modalValues={state.ListKey.Pet.Value}
                            status={state.UpdatedModalstatus.Pet}
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

            <Modal isVisible={state.modalVisible.PictureType}>
                <View style={styles.modal}>
                    <View style={styles.modalInner}>
                        <TouchableOpacity
                            onPress={() => {
                                getPicture(state.modalVisible.SelectedName);
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
                            <Text style={styles.selectText}>Remove Photo</Text>
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

export default InteriorInspact;

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
        textTransform: 'uppercase',
        marginLeft: 10,
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
