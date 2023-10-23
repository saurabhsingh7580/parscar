import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState ,useEffect} from 'react';
import { color, size, weight } from '../assets/theme/theme';
import BackHeader from './BackHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Url } from '../utils/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      notes: '',
      currentDate: new Date(),
    },
    isDatePickerVisible: false,
    isTimePickerVisible: false,
    status: '',
  });

  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState(''); //current time show

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
    // console.log(pickUpDate,'pickUpDate...')

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

  const scheduleData = {
    'OrderId': Id,
    'ScheduledPickupDate': state.schedule.pickupDate,
    'ScheduledDeliveryDate': state.schedule.deliveryDate,
    'Note': state.schedule.notes,
  };
  console.log(scheduleData, 'data.....');

  const sendPostRequestWithToken = async () => {
    let token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.post(Url.UpdateScheduledDates, scheduleData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
         Alert.alert(
              'Information',
              `Delivery date should in future. Now is ${new Date(
                state.schedule.currentDate,
              ).toLocaleString()} , you set ${new Date(
                deliveryDate,
              ).toLocaleString()}. Please verify!. `,
            );
            navigation.navigate('DrawerNavigator', { OrderId: OrderId, Id: Id })
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }


  // Current Date and Time show
  
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = now.toLocaleDateString(undefined, { weekday: 'short' });
      const month = now.toLocaleDateString(undefined, { month: 'short' });
      const date = now.getDate();
      const year = now.getFullYear();
      const time = now.toLocaleTimeString();

      setCurrentDate(`${day}${month} ${date} ${year}`);
      setCurrentTime(time);
    };

    updateDateTime();

    const interval = setInterval(() => {
      updateDateTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
      <BackHeader title="Schedule Order Move" subTitle="" unique="" />
      <View style={styles.containerInner}>
        <Text style={styles.title}>Scheduled Date and Time</Text>
        <View style={styles.box}>
          <Text style={[styles.title, { color: color.gray }]}>
            Scheduled Pickup
          </Text>

          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => {
                showDatePicker();
                setState(prevState => ({
                  ...prevState,
                  status: 'pickup',
                }));
              }}
              style={styles.boxInner}>
              <Text style={styles.text}>{pickUpDate === 'Invalid Date' ? currentDate.replace(/\d{1,2}\/\d{1,2}\/\d{4}/,''):pickUpDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showTimePicker();
                setState(prevState => ({
                  ...prevState,
                  status: 'pickup',
                }));
              }}
              style={styles.boxInner}>
              <Text style={styles.text}>{pickUpTime === 'Invalid Date' ?currentTime:pickUpTime.slice(0, 9)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={[styles.title, { color: color.gray }]}>
            Scheduled Delivery
          </Text>

          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => {
                showDatePicker();
                setState(prevState => ({
                  ...prevState,
                  status: 'delivery',
                }));
              }}
              style={styles.boxInner}>
              <Text style={styles.text}>{deliveryDate === 'Invalid Date' ? currentDate.replace(/\d{1,2}\/\d{1,2}\/\d{4}/, ''):deliveryDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showTimePicker();
                setState(prevState => ({
                  ...prevState,
                  status: 'delivery',
                }));
              }}
              style={styles.boxInner}>
              <Text style={styles.text}>{deliveryTime === 'Invalid Date' ? currentTime:deliveryTime.slice(0, 9)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 10, marginBottom: Platform.isPad ? 60 : 40 }}>
          <Text style={styles.title}>Notes (Optional)</Text>
          <TextInput
            placeholderTextColor={color.gray}
            style={[styles.title, { color: color.black }]}
            placeholder=" Please provide additional note "
            value={state.schedule.notes}
            onChangeText={text =>
              setState(prevState => ({
                ...prevState,
                schedule: {
                  ...prevState.schedule,
                  notes: text,
                },
              }))
            }
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
          onPress={sendPostRequestWithToken}
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
    height: '10%',
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
