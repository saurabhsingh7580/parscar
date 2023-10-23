import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { color, size, weight } from '../assets/theme/theme';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Url } from '../utils/Urls';

const VINCheck = props => {
  const navigation = useNavigation();
  const { Id, OrderId } = props.route.params;

  const [state, setState] = useState({
    vinCheckValue: {
      isScanValue: '',
      isColorValue: '',
      isQuantityValue: '',
      isPlateValue: '',
      isStateValue: '',
      isDateValue: '',
      isTagValue: '',
    },

    modalVisible: {
      isQuantityModal: false,
      isTagModal: false,
      title: '',
    },
    componentvisible: true,
    localStoreData: {},
    VerifyData: {},
  });
  const saveDataToAsyncStorage = async data => {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(data));
      console.log('Data saved successfully');
    } catch (error) {
      console.log('Error saving data: ', error);
    }
  };

  useEffect(() => {
    if (state.vinCheckValue.isScanValue) {
      saveDataToAsyncStorage(state.vinCheckValue);
      return;
    }
    if (state.vinCheckValue.isColorValue) {
      saveDataToAsyncStorage(state.vinCheckValue);
      return;
    }
    if (state.vinCheckValue.isQuantityValue) {
      saveDataToAsyncStorage(state.vinCheckValue);
      return;
    }
    if (state.vinCheckValue.isPlateValue) {
      saveDataToAsyncStorage(state.vinCheckValue);
      return;
    }
    if (state.vinCheckValue.isDateValue) {
      saveDataToAsyncStorage(state.vinCheckValue);
      return;
    }
    if (state.vinCheckValue.isTagValue) {
      saveDataToAsyncStorage(state.vinCheckValue);
      return;
    }
  }, [state]);

  const loadDataFromAsyncStorage = async () => {
    try {
      const savedData = await AsyncStorage.getItem('data');
      if (savedData !== null) {
        const parsedData = JSON.parse(savedData);
        console.log('Data loaded successfully:', parsedData);
        setState(prevState => ({
          ...prevState,
          vinCheckValue: {
            ...prevState.vinCheckValue,
            isScanValue: parsedData.isScanValue,
            isColorValue: parsedData.isColorValue,
            isQuantityValue: parsedData.isQuantityValue,
            isPlateValue: parsedData.isPlateValue,
            isStateValue: parsedData.isStateValue,
            isDateValue: parsedData.isDateValue,
            isTagValue: parsedData.isTagValue,
          },
          localStoreData: parsedData,
        }));
      }
    } catch (error) {
      console.log('Error loading data: ', error);
    }
  };

  useEffect(() => {
    loadDataFromAsyncStorage();
  }, []);

  const [scanned, setScanned] = useState(false);

  // Date Time Picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setState(prevState => ({
      ...prevState,
      vinCheckValue: {
        ...prevState.vinCheckValue,
        isDateValue: date,
      },
    }));
  };
  const startdate = state.vinCheckValue.isDateValue
    ? new Date(state.vinCheckValue.isDateValue).toLocaleDateString()
    : '';

  const handleBarcodeScanned = ({ data }) => {
    console.log(data);
    if (!scanned) {
      setScanned(true);
      setState(prevState => ({
        ...prevState,
        vinCheckValue: {
          ...prevState.vinCheckValue,
          isScanValue: data,
        },
      }));
      setState(prevState => ({
        ...prevState,
        componentvisible: false,
      }));
      setScanned(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOrderDetails = async Id => {
    let token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(Url.OrderDetail + `id=${Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setState(prevState => ({
          ...prevState,
          VerifyData: response.data.Vehicle,
        }));
      }
      // console.log(
      //   response.data,
      //   '************  Order Details Response ************',
      // );
    } catch (error) {
      console.error(error, '***********  Order Details Error **********');
    }
  };

  useEffect(() => {
    handleOrderDetails(Id);
  }, []);

  console.log(state.VerifyData, 'VerifyData');
  return (
    <SafeAreaView style={styles.container}>
      {/* <BackHeader
        title="VIN Check"
        subTitle="ord-2345-2445"
        unique="Done"
        buttonStatus={buttonStatus}
        // buttonFunc={}
      /> */}

      <View style={styles.headerStyle}>
        <View style={styles.headerContainerInner}>
          <TouchableOpacity onPress={handleBack} style={styles.backStyle}>
            <Icon
              name="arrow-back-outline"
              size={Platform.isPad ? size.font18 : size.font24}
              color={color.white}
            />
            <View style={styles.titleStyle}>
              <Text style={styles.textHeader}>VIN Check</Text>

              <Text style={styles.subText}>{OrderId}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={
              state.vinCheckValue.isScanValue &&
                state.vinCheckValue.isColorValue &&
                state.vinCheckValue.isQuantityValue &&
                state.vinCheckValue.isPlateValue &&
                state.vinCheckValue.isDateValue &&
                state.vinCheckValue.isTagValue
                ? false
                : true
            }
            onPress={() => {
              navigation.navigate('PickupReport', { vinStatus: 'Done' });
            }}>
            <Text
              style={[
                styles.inspectText,
                {
                  opacity:
                    state.vinCheckValue.isScanValue &&
                      state.vinCheckValue.isColorValue &&
                      state.vinCheckValue.isQuantityValue &&
                      state.vinCheckValue.isPlateValue &&
                      state.vinCheckValue.isDateValue &&
                      state.vinCheckValue.isTagValue
                      ? 1
                      : 0.5,
                },
              ]}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {state.componentvisible === true ? (
        <ScrollView>
          <View style={styles.containerInner}>
            <View style={styles.vin}>
              <View style={styles.vinStyle}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.text}>VIN</Text>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          color:
                            state.vinCheckValue.isScanValue ===
                              state.VerifyData.VIN
                              ? color.primary
                              : color.red,
                        },
                      ]}>
                      {state.vinCheckValue.isScanValue === state.VerifyData.VIN
                        ? 'Matched'
                        : 'Not matched'}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.text,
                      { color: color.black, marginTop: Platform.isPad ? 20 : 10 },
                    ]}>
                    {state.vinCheckValue.isScanValue}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() =>
                  setState(prevState => ({
                    ...prevState,
                    componentvisible: 'hide',
                  }))
                }
                style={styles.imageStyle}>
                <Image
                  source={require('../assets/icons/camera2.png')}
                  style={styles.imageIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.containerInner, { paddingVertical: 0 }]}>
            <View style={styles.box}>
              <Text style={styles.title}>Verify</Text>
              <Text style={styles.subTitle}>VIN</Text>
              <Text style={[styles.title, { color: color.black }]}>
                {state.VerifyData.VIN}
              </Text>
            </View>
            <View style={styles.box}>
              <View style={styles.boxInner}>
                <View style={styles.innerStyle}>
                  <Text style={styles.subTitle}>Make</Text>
                  <Text
                    style={[
                      styles.title,
                      { color: color.black, textTransform: 'uppercase' },
                    ]}>
                    {state.VerifyData.Make}
                  </Text>
                </View>
                <View style={styles.innerStyle}>
                  <Text style={styles.subTitle}>Model</Text>
                  <Text
                    style={[
                      styles.title,
                      { color: color.black, textTransform: 'uppercase' },
                    ]}>
                    {state.VerifyData.Model}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.box, { borderBottomWidth: 0, marginTop: -20 }]}>
              <View style={styles.boxInner}>
                <View style={styles.innerStyle}>
                  <Text style={styles.subTitle}>Year</Text>
                  <Text
                    style={[
                      styles.title,
                      { color: color.black, textTransform: 'uppercase' },
                    ]}>
                    {state.VerifyData.Year}
                  </Text>
                </View>
                <View style={[styles.innerStyle, { marginTop: 30 }]}>
                  <Text style={styles.subTitle}>Color</Text>
                  <TextInput
                    onChangeText={text =>
                      setState(prevState => ({
                        ...prevState,
                        vinCheckValue: {
                          ...prevState.vinCheckValue,
                          isColorValue: text,
                        },
                      }))
                    }
                    value={state.vinCheckValue.isColorValue}
                    placeholderTextColor={color.black}
                    keyboardType={
                      Platform.OS === 'ios'
                        ? 'numbers-and-punctuation'
                        : 'email-address'
                    }
                    style={[
                      styles.title,
                      { color: color.black, height: 40, marginTop: 0 },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.containerInner,
              { paddingVertical: 0, borderBottomWidth: 0 },
            ]}>
            <View style={styles.box}>
              <Text style={styles.title}>CUSTOMER PLATE INFO</Text>
              <Text style={styles.title}>
                (choose quantity 0 if using PARS tags)
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setState(prevState => ({
                    ...prevState,

                    modalVisible: {
                      isQuantityModal: true,
                      title: 'License Plate',
                    },
                  }));
                }}
                style={styles.infoStyle}>
                <View>
                  <Text style={styles.subTitle}>Customer Plate Quantity</Text>
                  <Text style={[styles.text, { color: color.black }]}>
                    {state.vinCheckValue.isQuantityValue}
                  </Text>
                </View>
                <Image
                  source={require('../assets/icons/arrow.png')}
                  style={styles.arrorwStyle}
                />
              </TouchableOpacity>

              <View style={styles.infoStyle1}>
                <Text style={styles.subTitle}>Customer License Plate</Text>
                <TextInput
                  placeholderTextColor={color.black}
                  onChangeText={text =>
                    setState(prevState => ({
                      ...prevState,
                      vinCheckValue: {
                        ...prevState.vinCheckValue,
                        isPlateValue: text,
                      },
                    }))
                  }
                  value={state.vinCheckValue.isPlateValue}
                  style={[styles.text, { height: 40, color: color.black }]}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Status');
                }}
                style={styles.infoStyle}>
                <View>
                  <Text style={styles.subTitle}>
                    Customer License State/Province
                  </Text>
                  <Text style={[styles.text, { color: color.black }]}>{ }</Text>
                </View>

                <Image
                  source={require('../assets/icons/arrow.png')}
                  style={styles.arrorwStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  showDatePicker();
                }}
                style={[styles.infoStyle, { borderBottomWidth: 0 }]}>
                <View>
                  <Text style={styles.subTitle}>
                    Customer License Expiration
                  </Text>

                  <Text style={[styles.text, { color: color.black }]}>
                    {startdate}
                  </Text>
                </View>
                <Image
                  source={require('../assets/icons/arrow.png')}
                  style={styles.arrorwStyle}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* <View
            style={[
              styles.containerInner,
              {paddingVertical: 0, borderBottomWidth: 0},
            ]}>
            <View style={styles.box}>
              <Text style={styles.title}>PARS TRANSPORTER TAGS</Text>

              <TouchableOpacity
                onPress={() => {
                  setState(prevState => ({
                    ...prevState,
                    modalVisible: {
                      isTagModal: true,
                      title: 'PARS Transporter Tags Used?',
                    },
                  }));
                }}
                style={[styles.infoStyle, {borderBottomWidth: 0}]}>
                <View>
                  <Text style={styles.subTitle}>
                    PARS Transporter Tags Used?
                  </Text>

                  <Text style={[styles.text, {color: color.black}]}>

                    {state.vinCheckValue.isTagValue}
                  </Text>
                </View>
                <Image
                  source={require('../assets/icons/arrow.png')}
                  style={styles.arrorwStyle}
                />
              </TouchableOpacity>
            </View>
          </View> */}
        </ScrollView>
      ) : (
        <View style={styles.barCodeStyle}>
          <RNCamera
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.auto}
            onBarCodeRead={handleBarcodeScanned}
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }}
          />
          <View style={styles.customUITop} />
          <View style={styles.customUI} />
        </View>
      )}

      <Modal isVisible={state.modalVisible.isQuantityModal}>
        <View style={styles.modal}>
          <View style={styles.modalInner}>
            <Text style={styles.textDesign}>{state.modalVisible.title}</Text>
            <TouchableOpacity
              onPress={() => {
                setState(prevState => ({
                  ...prevState,
                  vinCheckValue: {
                    ...prevState.vinCheckValue,
                    isQuantityValue: '0',
                  },
                  modalVisible: {
                    isQuantityModal: false,
                  },
                }));
              }}>
              <Text style={styles.selectText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setState(prevState => ({
                  ...prevState,
                  vinCheckValue: {
                    ...prevState.vinCheckValue,
                    isQuantityValue: '1',
                  },
                  modalVisible: {
                    isQuantityModal: false,
                  },
                }));
              }}>
              <Text style={styles.selectText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setState(prevState => ({
                  ...prevState,
                  vinCheckValue: {
                    ...prevState.vinCheckValue,
                    isQuantityValue: '2',
                  },
                  modalVisible: {
                    isQuantityModal: false,
                  },
                }));
              }}>
              <Text style={styles.selectText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setState(prevState => ({
                  ...prevState,
                  vinCheckValue: {
                    ...prevState.vinCheckValue,
                    isQuantityValue: '3',
                  },
                  modalVisible: {
                    isQuantityModal: false,
                  },
                }));
              }}>
              <Text style={styles.selectText}>3</Text>
            </TouchableOpacity>
            <Text
              onPress={() => {
                setState(prevState => ({
                  ...prevState,
                  modalVisible: {
                    isQuantityModal: false,
                  },
                }));
              }}
              style={styles.cancel}>
              Cancel
            </Text>
          </View>
        </View>
      </Modal>

      <Modal isVisible={state.modalVisible.isTagModal}>
        <View style={styles.modal}>
          <View style={styles.modalInner}>
            <Text style={styles.textDesign}>{state.modalVisible.title}</Text>
            <TouchableOpacity
              onPress={() => {
                setState(prevState => ({
                  ...prevState,
                  vinCheckValue: {
                    ...prevState.vinCheckValue,
                    isTagValue: 'No',
                  },
                  modalVisible: {
                    isTagModal: false,
                  },
                }));
              }}>
              <Text style={styles.selectText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setState(prevState => ({
                  ...prevState,
                  vinCheckValue: {
                    ...prevState.vinCheckValue,
                    isTagValue: 'Yes',
                  },
                  modalVisible: {
                    isTagModal: false,
                  },
                }));
              }}>
              <Text style={styles.selectText}>Yes</Text>
            </TouchableOpacity>
            <Text
              onPress={() => {
                setState(prevState => ({
                  ...prevState,
                  modalVisible: {
                    isTagModal: false,
                  },
                }));
              }}
              style={styles.cancel}>
              Cancel
            </Text>
          </View>
        </View>
      </Modal>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        backgroundColor={Platform.OS === 'ios' ? color.white : color.primary}
      />
    </SafeAreaView>
  );
};

export default VINCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  containerInner: {
    width: '100%',
    alignSelf: 'center',
    elevation: 1,
    marginBottom: 8,
    padding: 20,
    backgroundColor: color.white,
  },
  vin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vinStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
    color: color.gray,
    fontFamily: 'ITCAvantGardeStd-Bk',
  },
  textStyle: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
    color: color.red,
    fontFamily: 'ITCAvantGardeStd-Bk',
    marginLeft: 20,
  },
  imageStyle: {
    width: Platform.isPad ? 70 : 50,
    height: Platform.isPad ? 70 : 50,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  imageIcon: {
    width: '55%',
    height: '55%',
    resizeMode: 'contain',
    tintColor: color.white,
  },
  box: {
    paddingVertical: 15,
    borderBottomWidth: 0.7,
    borderColor: color.gray,
    width: '100%',
  },
  boxInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxInnerStyle: {
    paddingVertical: 15,
    borderBottomWidth: 0.7,
    borderColor: color.gray,
  },
  innerStyle: {
    width: '50%',
    marginRight: 5,
  },
  title: {
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.semibold,
    color: color.primary,
    lineHeight: Platform.isPad ? 40 : 25,
  },

  subTitle: {
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.low,
    color: color.gray,
    fontFamily: 'ITCAvantGardeStd-Demi',
    marginVertical: 5,
    lineHeight: Platform.isPad ? 40 : 25,
    paddingBottom: 4,
  },
  des: {
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.low,
    color: color.primary,
    fontFamily: 'ITCAvantGardeStd-Demi',
    color: color.black,
    marginTop: 2,
    lineHeight: Platform.isPad ? 40 : 25,
    textAlign: 'justify',
  },
  infoStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.7,
    borderColor: color.gray,
    paddingBottom: 5,
    paddingTop: 5,
  },
  arrorwStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  infoStyle1: {
    borderBottomWidth: 0.7,
    borderColor: color.gray,
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
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  headerStyle: {
    width: '100%',
    backgroundColor: color.primary,
    justifyContent: 'center',
    paddingHorizontal: Platform.isPad ? 25 : 20,
    paddingVertical: Platform.isPad ? 17 : 10,
  },

  headerContainerInner: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    color: color.white,
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.medium,
    textTransform: 'capitalize',
    fontFamily: 'ITCAvantGardeStd-Bk',
    marginLeft: 5,
  },
  titleStyle: {
    // alignItems: 'center',
    marginLeft: 20,
  },

  textHeader: {
    color: color.white,
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.medium,
    // textTransform: 'uppercase',
    fontFamily: 'ITCAvantGardeStd-Bk',
  },
  subText: {
    color: color.white,
    fontSize: Platform.isPad ? size.font10 : size.font12,
    fontWeight: weight.low,
    textTransform: 'uppercase',
    fontFamily: 'ITCAvantGardeStd-Bk',
    opacity: 0.8,
    paddingTop: Platform.isPad ? 5 : 2,
  },
  inspectText: {
    color: color.white,
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.low,
    textTransform: 'capitalize',
    fontFamily: 'ITCAvantGardeStd-Bk',
    opacity: 0.5,
  },

  barCodeStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  camera: {
    flex: 1,
  },
  customUI: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '28%',
    alignItems: 'center',
  },

  customUITop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '28%',
    alignItems: 'center',
  },

  customText: {
    color: 'white',
    fontSize: 16,
  },
});
