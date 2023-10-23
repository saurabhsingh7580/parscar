import React, { useRef, useState } from 'react';
import {
    View,
    Button,
    StyleSheet,
    Platform,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import Icon from 'react-native-vector-icons/Ionicons';
import { color, size, weight } from '../assets/theme/theme';
import { useNavigation } from '@react-navigation/native';

const Signature = props => {
    const navigation = useNavigation();
    const signatureRef = useRef(null);
    const { OrderId } = props.route.params;
    const [check, setCheck] = useState(false);
    const [name, setName] = useState(null);

    const handleSaveSignature = () => {
        if (signatureRef.current) {
            signatureRef.current.saveImage();
        }
    };

    const handleResetSignature = () => {
        if (signatureRef.current) {
            signatureRef.current.resetImage();
        }
    };

    const handleSignatureSave = ({ pathName }) => {
        // Handle the saved signature image path
        console.log('Signature saved:', pathName);
    };

    const back = () => {
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, backgroundColor: color.secondary }}>
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
            <SignatureCapture
                style={{ flex: 1 }}
                ref={signatureRef}
                onSave={handleSignatureSave}
                minStrokeWidth={4}
                maxStrokeWidth={4}
            />

            <View
                style={{
                    backgroundColor: color.white,
                    paddingHorizontal: 20,
                    paddingBottom: 30
                }}>
                {/* <Button title="Save" onPress={handleSaveSignature} />
                <Button title="Reset" onPress={handleResetSignature} /> */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Text
                        style={{
                            width: '88%',
                            fontSize: Platform.isPad ? size.font12 : size.font14,
                            color: color.gray,
                            fontFamily: 'ITCAvantGardeStd-Bk',
                            lineHeight: 20
                        }}>
                        By signing I acknowledge I've reviewed and agree with the vechicle
                        condition information captured herein.
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            if (check === false) {
                                setCheck(true);
                            } else {
                                setCheck(false);
                            }
                        }}
                        style={{
                            width: 20,
                            height: 20,
                            borderWidth: 1,
                            borderColor: check === true ? color.primary : color.black,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 4,
                            backgroundColor: check === true ? color.primary : color.white,
                        }}>
                        {check === false ? null : (
                            <Image
                                source={require('../assets/icons/done.png')}
                                style={{
                                    width: 18,
                                    height: 18,
                                    tintColor: check === true ? color.white : check.black,
                                }}
                            />
                        )}

                    </TouchableOpacity>

                </View>
                {/* {name === null ? null : */}
                {/* <Text style={[styles.buttonText, { marginTop: 15 }]}>*Name</Text>} */}
                <View style={styles.input}>
                    <TextInput
                        placeholder="Enter Name"
                        style={styles.inputText}
                        // autoFocus={true}
                        onChangeText={setName}
                        value={name}
                    />
                </View>
            </View>
        </View>
    );
};

export default Signature;

const styles = StyleSheet.create({
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
    inputStyle: {
        borderBottomWidth: 0.5,
        borderColor: color.gray,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,

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
    buttonText: {
        fontSize: Platform.isPad ? size.font12 : size.font14,
        color: color.gray,
        fontFamily: 'ITCAvantGardeStd-Bk',
    },
});
