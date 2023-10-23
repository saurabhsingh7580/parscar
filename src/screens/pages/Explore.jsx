import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {color, size, weight} from '../../assets/theme/theme';
import Header from '../../components/Header';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Url} from '../../utils/Urls';
import {useEffect} from 'react';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Explore = props => {
  const navigation = useNavigation();
  const {OrderId, Id} = props.route.params;

  const [value, setValue] = useState('show');
  const [modalText, setModalText] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [phoneData, setPhonesData] = useState(null);
  const [serviceId, setServiceId] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const [orderData, setAOrderData] = useState(null);

  const handleOrderDetails = async Id => {
    let token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(Url.OrderDetail + `id=${Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setAOrderData(response.data);
      }
      console.log(
        response.data,
        '************  Order Details Response ************',
      );
    } catch (error) {
      console.error(error, '***********  Order Details Error **********');
    }
  };

  useEffect(() => {
    handleOrderDetails(Id);
  }, []);

  const handleServices = async value => {
    let token = await AsyncStorage.getItem('token');
    console.log(serviceId, '***** Service Id ********');
    console.log(value, '***** value ********');

    try {
      const response = await axios.post(
        Url.Services,
        {
          id: serviceId,
          name: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data) {
        handleOrderDetails(Id);
      }
      console.log(
        response.data,
        '************  Service  Response ************',
      );
    } catch (error) {
      console.error(error, '***********  Service  Error **********');
    }
  };
  // Order Data Details Destructuring
  let {
    ActualPickupDate,
    ActualDeliveryDate,
    Vehicle,
    PickupInformation,
    RequestedPickupDate,
    RequestedPickupDateCriteria,
    RequestedDeliveryDate,
    RequestedDeliveryDateCriteria,
    Instructions,
    EstimatedDistance,
    FieldOffice,
    DeliveryInformation,
    ScheduledDeliveryDate,
    ScheduledPickupDate,
    ServiceItems,
    CustomerAccountName,
  } = orderData ? orderData : '';

  // Vehicle Details Destructuring
  let {
    Color,
    FleetNumber,
    LastReportDate,
    LastReportUrl,
    LicenseNumber,
    LicenseState,
    Make,
    Model,
    Type,
    UnitNumber,
    VIN,
    Year,
  } = Vehicle ? Vehicle : '';

  // FieldOffice Details Destructuring
  let {PhoneNumber, Email} = FieldOffice ? FieldOffice : '';

  const Reuse = ({
    title,
    from,
    type,
    address,
    schedule,
    request,
    available,
    away,
    scheduleDate,
    RequestedDate,
    RequestedDateCriteria,
    item,
  }) => {
    return (
      <View style={styles.containerInner}>
        <View style={styles.box}>
          <Text
            style={[
              styles.title,
              {
                fontSize: Platform.isPad ? size.font12 : size.font16,
              },
            ]}>
            {title}
          </Text>

          <View style={[styles.box, {borderBottomWidth: 0}]}>
            <View style={styles.boxInner}>
              <View style={styles.innerStyle}>
                <Text style={styles.subTitle}>{from}</Text>
                <Text
                  style={[
                    styles.title,
                    {color: color.black, textTransform: 'uppercase'},
                  ]}>
                  {item.PlaceType}
                </Text>
              </View>
              <View style={styles.innerStyle}>
                <Text style={styles.subTitle}>{type}</Text>
                <Text
                  style={[
                    styles.title,
                    {color: color.black, textTransform: 'uppercase'},
                  ]}>
                  {item.AddressType}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.boxInnerStyle}>
          <Text style={styles.subTitle}>{address}</Text>
          <Text style={[styles.title, {color: color.black}]}>
            {item.AddressComposite}
          </Text>
        </View>

        <TouchableOpacity onPress={toggleModal2} style={styles.boxInnerStyle}>
          <Text style={styles.subTitle}>{schedule}</Text>
          <Text style={[styles.title, {color: color.black}]}>
            {new Date(scheduleDate).toLocaleDateString() +
              ' ' +
              new Date(scheduleDate).toLocaleTimeString()}{' '}
          </Text>
        </TouchableOpacity>

        <View style={styles.boxInnerStyle}>
          <Text style={styles.subTitle}>
            {request}{' '}
            <Text style={{color: color.primary}}>{RequestedDateCriteria}</Text>
          </Text>
          <Text style={[styles.title, {color: color.black}]}>
            {new Date(RequestedDate).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.boxInnerStyle}>
          <Text style={styles.subTitle}>{available}</Text>
          <Text style={[styles.title, {color: color.black}]}>
            {item.AvailabilityInfo}
          </Text>
        </View>

        <View style={styles.boxInnerStyle}>
          <Text style={styles.subTitle}>{away}</Text>
          <Text style={[styles.title, {color: color.black}]}>
            {item.AwayPlan}
          </Text>
        </View>

        {item.Contacts.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                setPhonesData(item.Phones);
                setContactValue(item.Name);
                toggleModal1();
              }}
              style={styles.boxInnerStyle}>
              <Text style={styles.subTitle}>{item.Label}</Text>
              <View style={styles.boxInner}>
                <Image
                  source={require('../../assets/icons/icon_menu_phone.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: 'green',
                  }}
                />
                <Text
                  style={[styles.title, {color: color.black, marginLeft: 10}]}>
                  {item.Name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const onCall = () => {
    Linking.openURL(`tel:${PhoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Header header={OrderId} />

      {orderData === null ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {value === 'show' ? (
            <ScrollView>
              <View style={styles.containerInner}>
                <View style={styles.box}>
                  <Text
                    style={[
                      styles.title,
                      {
                        fontSize: Platform.isPad ? size.font12 : size.font16,
                      },
                    ]}>
                    General
                  </Text>
                  <View style={styles.boxInner}>
                    <View style={styles.innerStyle}>
                      <Text style={styles.subTitle}>Estimated Distance</Text>
                      <Text
                        style={[
                          styles.title,
                          {color: color.black, textTransform: 'uppercase'},
                        ]}>
                        {EstimatedDistance} Mi.
                      </Text>
                    </View>
                    <View style={styles.innerStyle}>
                      <Text style={styles.subTitle}>Offered Rate</Text>
                      <Text
                        style={[
                          styles.title,
                          {color: color.black, textTransform: 'uppercase'},
                        ]}>
                        N/A
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={onCall} style={styles.box}>
                  <View style={styles.boxInner}>
                    <View style={styles.innerStyle}>
                      <Text style={styles.subTitle}>Field Office</Text>
                      <Text
                        style={[
                          styles.title,
                          {color: color.black, textTransform: 'uppercase'},
                        ]}>
                        {FieldOffice?.Id}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.innerStyle}>
                      <Text style={styles.subTitle}>Phone Number</Text>
                      <Text
                        onPress={onCall}
                        style={[
                          styles.title,
                          {color: color.black, textTransform: 'uppercase'},
                        ]}>
                        {PhoneNumber}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>

                <View style={styles.box}>
                  <View>
                    <Text style={styles.subTitle}>Instructions</Text>
                    <Text style={[styles.des, {marginBottom: 15}]}>
                      {Instructions}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.subTitle}>Customer Name</Text>
                  <Text style={[styles.des, {marginBottom: 15}]}>
                    {CustomerAccountName}
                  </Text>
                </View>
              </View>

              <View style={styles.containerInner}>
                <View style={styles.box}>
                  <Text
                    style={[
                      styles.title,
                      {
                        fontSize: Platform.isPad ? size.font12 : size.font16,
                      },
                    ]}>
                    Vehicle
                  </Text>
                  <Text style={styles.subTitle}>VIN</Text>
                  <Text style={[styles.title, {color: color.black}]}>
                    {VIN}
                  </Text>
                </View>
                <View style={styles.box}>
                  <View style={styles.boxInner}>
                    <View style={styles.innerStyle}>
                      <Text style={styles.subTitle}>Make</Text>
                      <Text
                        style={[
                          styles.title,
                          {color: color.black, textTransform: 'uppercase'},
                        ]}>
                        {Make}
                      </Text>
                    </View>
                    <View style={styles.innerStyle}>
                      <Text style={styles.subTitle}>Model</Text>
                      <Text
                        style={[
                          styles.title,
                          {color: color.black, textTransform: 'uppercase'},
                        ]}>
                        {Model}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.box}>
                  <View style={styles.boxInner}>
                    <View style={styles.innerStyle}>
                      <Text style={styles.subTitle}>Year</Text>
                      <Text
                        style={[
                          styles.title,
                          {color: color.black, textTransform: 'uppercase'},
                        ]}>
                        {Year}
                      </Text>
                    </View>
                    <View style={styles.innerStyle}>
                      <Text style={styles.subTitle}>Color</Text>
                      <Text
                        style={[
                          styles.title,
                          {color: color.black, textTransform: 'uppercase'},
                        ]}>
                        {Color}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.box}>
                  <View style={styles.boxInner}>
                    <View style={styles.innerStyle}>
                      <Text style={styles.subTitle}>License State</Text>
                      <Text
                        style={[
                          styles.title,
                          {color: color.black, textTransform: 'uppercase'},
                        ]}>
                        {LicenseState}
                      </Text>
                    </View>
                    <View style={styles.innerStyle}>
                      <Text style={styles.subTitle}>License Number</Text>
                      <Text
                        style={[
                          styles.title,
                          {color: color.black, textTransform: 'uppercase'},
                        ]}>
                        {LicenseNumber}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.box, {borderBottomWidth: 0}]}>
                  <View style={styles.boxInner}>
                    <View style={styles.innerStyle}>
                      <Text style={styles.subTitle}>Fleet Number</Text>
                      <Text
                        style={[
                          styles.title,
                          {color: color.black, textTransform: 'uppercase'},
                        ]}>
                        {FleetNumber}
                      </Text>
                    </View>
                    <View style={styles.innerStyle}>
                      <Text style={styles.subTitle}>Unit Number</Text>
                      <Text
                        style={[
                          styles.title,
                          {color: color.black, textTransform: 'uppercase'},
                        ]}>
                        {UnitNumber}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <Reuse
                title="Pickup"
                from="Pickup From"
                type="Address Type"
                address="Address"
                schedule="Schedule Pickup"
                request="Requested Pickup"
                available="Available Days/Hours"
                away="Away Plans"
                item={PickupInformation}
                scheduleDate={ScheduledPickupDate}
                RequestedDate={RequestedPickupDate}
                RequestedDateCriteria={RequestedPickupDateCriteria}
              />

              <Reuse
                title="Delivery"
                from="Delivery To"
                type="Address Type"
                address="Address"
                schedule="Schedule Delivery"
                request="Requested Delivery"
                available="Available Days/Hours"
                away="Away Plans"
                item={DeliveryInformation}
                scheduleDate={ScheduledDeliveryDate}
                RequestedDate={RequestedDeliveryDate}
                RequestedDateCriteria={RequestedDeliveryDateCriteria}
              />

              <TouchableOpacity
                onPress={() => setValue('hide')}
                style={styles.list}>
                <Text style={styles.listText}>Service List</Text>
                <Image
                  source={require('../../assets/icons/arrow.png')}
                  style={styles.arrorwStyle}
                />
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <>
              {ServiceItems.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal(), setModalText('Last Service');
                      setServiceId(item.Id);
                    }}
                    style={styles.serviceList}>
                    <Text style={styles.listText}>
                      {item.Name} | {item.Status}
                    </Text>
                    <Image
                      source={require('../../assets/icons/arrow.png')}
                      style={styles.arrorwStyle}
                    />
                  </TouchableOpacity>
                );
              })}
            </>
          )}

          <Modal isVisible={isModalVisible}>
            <View style={styles.modal}>
              <View style={styles.modalInner}>
                <Text style={styles.text}>{modalText}</Text>

                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                    handleServices('Executed');
                  }}>
                  <Text style={styles.selectText}>Executed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                    handleServices('Executing');
                  }}>
                  <Text style={styles.selectText}>Not Executed</Text>
                </TouchableOpacity>

                <Text onPress={toggleModal} style={styles.cancel}>
                  Cancel
                </Text>
              </View>
            </View>
          </Modal>

          <Modal isVisible={isModalVisible1}>
            <View style={styles.modal}>
              <View style={styles.modalInner}>
                <Text
                  style={[
                    styles.text,
                    {fontSize: Platform.isPad ? size.font14 : size.font16},
                  ]}>
                  {contactValue}
                </Text>
                {phoneData
                  ? phoneData.map(item => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            toggleModal1();
                          }}>
                          <Text style={styles.selectText}>
                            {item.PhoneName + ' ' + item.PhoneNumber}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                  : null}
                <Text onPress={toggleModal1} style={styles.cancel}>
                  Cancel
                </Text>
              </View>
            </View>
          </Modal>

          <Modal isVisible={isModalVisible2}>
            <View style={styles.modal}>
              <View style={styles.modalInner}>
                <Text
                  style={[
                    styles.text,
                    {fontSize: Platform.isPad ? size.font14 : size.font16},
                  ]}>
                  Question
                </Text>
                <Text
                  style={[
                    styles.selectText,
                    {
                      textTransform: 'none',
                      marginLeft: 0,
                      marginBottom: 50,
                    },
                  ]}>
                  Do you want to update scheduled date?
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    width: '40%',
                    justifyContent: 'space-between',
                  }}>
                  <Text onPress={toggleModal2} style={styles.cancel}>
                    Cancel
                  </Text>

                  <Text
                    onPress={() => {
                      toggleModal2(),
                        navigation.navigate('Schedule', {
                          ScheduledPickupDate: ScheduledPickupDate,
                          ScheduledDeliveryDate: ScheduledDeliveryDate,
                          OrderId: OrderId,
                          Id: Id,
                        });
                    }}
                    style={styles.cancel}>
                    OK
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default Explore;

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
    paddingVertical: 0,
  },
  box: {
    paddingVertical: Platform.isPad ? 25 : 15,
    borderBottomWidth: 0.7,
    borderColor: color.gray,
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
    fontSize: Platform.isPad ? size.font10 : size.font12,
    fontFamily: Platform.isPad
      ? 'ITCAvantGardeStd-Bk'
      : 'ITCAvantGardeStd-Demi',
    lineHeight: Platform.isPad ? 35 : 25,
    fontWeight: weight.medium,
    color: color.primary,
  },

  subTitle: {
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.low,
    color: color.gray,
    lineHeight: Platform.isPad ? 40 : 30,
  },
  des: {
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.low,
    color: color.primary,
    color: color.black,
    marginTop: 2,
    lineHeight: Platform.isPad ? 40 : 30,
    textAlign: 'justify',
    width: Platform.isPad ? '100%' : '100%',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    elevation: 1,
    marginBottom: 8,
    paddingVertical: 13,
    backgroundColor: color.white,
    paddingHorizontal: 20,
  },
  listText: {
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.low,
    fontFamily: Platform.isPad
      ? 'ITCAvantGardeStd-Bk'
      : 'ITCAvantGardeStd-Demi',
    color: color.black,
  },
  arrorwStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  serviceList: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 0.7,
    borderColor: color.gray,
    width: '90%',
    alignSelf: 'center',
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
