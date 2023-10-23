import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {color, size, weight} from '../../assets/theme/theme';
import {useNavigation} from '@react-navigation/native';
import {orientation} from '../../utils/orientation';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {Url} from '../../utils/Urls';
import {Linking} from 'react-native';

const Signin = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const data = {
    grant_type: 'password',
    client_id: '5D977C0F-8951-4CC2-A624-F3871A91C115',
    username: userName,
    password: password,
  };

  const encodedData = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');

  const handleSignin = async () => {
    try {
      const response = await axios.post(Url.Signin, encodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log(response.data);
      if (response.data.access_token) {
        console.log(response.data.access_token);
        AsyncStorage.setItem('token', response.data.access_token);
        toggleModal();
      }
    } catch (error) {
      console.error(error.message);
      toggleModal1();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <KeyboardAvoidingView enabled>
          <Image
            source={{
              uri: 'https://pars-d.azurewebsites.net/content/images/logo_color.png',
            }}
            style={styles.logoStyle}
          />
          <View style={styles.content}>
            <View style={styles.field}>
              <Image
                source={require('../../assets/icons/email.png')}
                style={styles.iconStyle}
              />

              <TextInput
                placeholder="Enter User Name"
                style={styles.input}
                onChangeText={setUserName}
                value={userName}
                placeholderTextColor={color.white}
                keyboardType={
                  Platform.OS === 'ios'
                    ? 'numbers-and-punctuation'
                    : 'email-address'
                }
                autoFocus={true}
              />
            </View>

            <View style={styles.field}>
              <Image
                source={require('../../assets/icons/password.png')}
                style={styles.iconStyle}
              />
              <TextInput
                placeholder="Enter Password"
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholderTextColor={color.white}
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity
              onPress={() => handleSignin()}
              style={styles.button}>
              <Text style={styles.buttonText}>sign in </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <View style={styles.modalInner}>
            <Text style={styles.selectText}>
              I agree to use the PARS Driver App in accordance with the terms of
              my independent contractor agreement with PARS.
            </Text>

            <View style={styles.modalButton}>
              <Text onPress={toggleModal} style={styles.cancel}>
                No
              </Text>
              <Text
                onPress={() => {
                  toggleModal(), navigation.navigate('DrawerNavigation');
                }}
                style={styles.cancel}>
                Yes
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <Modal isVisible={isModalVisible1}>
        <View style={styles.modal}>
          <View style={styles.modalInner}>
            <Text
              style={[
                styles.selectText,
                {
                  fontSize: Platform.isPad ? size.font14 : size.font18,
                  fontWeight: weight.medium,
                  marginVertical: Platform.isPad ? 25 : 14,
                },
              ]}>
              Warning!
            </Text>
            <Text style={styles.selectText}>
              This combination isn't right. Try entering your details again.
            </Text>

            <View style={[styles.modalButton, {width: '60%'}]}>
              <Text
                onPress={() => {
                  toggleModal1(),
                    Linking.openURL(
                      'https://parsinc.com/Account/ForgotPassword',
                    );
                }}
                style={styles.cancel}>
                RESET PASSWORD
              </Text>
              <Text onPress={toggleModal1} style={styles.cancel}>
                OK
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
  },

  logoStyle: {
    width: '30%',
    height: '25%',
    resizeMode: 'contain',
    alignItems: 'center',
    alignSelf: 'center',
  },
  content: {
    paddingVertical: 20,
  },
  field: {
    borderBottomWidth: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: color.white,
    marginTop: 25,
    paddingHorizontal: 10,
    width: width / 1.1,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  iconStyle: {
    width: Platform.isPad ? 40 : 20,
    height: Platform.isPad ? 40 : 20,
    resizeMode: 'contain',
    tintColor: color.white,
  },
  input: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
    color: color.white,
    fontWeight: weight.low,
    marginLeft: Platform.isPad ? 30 : 15,
    fontFamily: 'ITCAvantGardeStd-Demi',
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.button,
    borderRadius: 10,
    marginTop: 50,
    elevation: 0.3,
  },
  buttonText: {
    fontSize: Platform.isPad ? size.font10 : size.font14,
    color: color.white,
    fontWeight: weight.medium,
    textTransform: 'uppercase',
    fontFamily: 'ITCAvantGardeStd-Bk',
    paddingVertical: Platform.isPad ? 18 : 12,
  },

  modal: {
    width: '100%',
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    width: '100%',
    backgroundColor: color.white,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 5,
    padding: Platform.isPad ? 30 : 25,
  },

  selectText: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
    fontWeight: weight.low,
    // fontFamily: 'ITCAvantGardeStd-Demi',
    color: color.black,
    lineHeight: Platform.isPad ? 30 : 24,
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '30%',
    alignSelf: 'flex-end',
  },
  cancel: {
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.low,
    fontFamily: 'ITCAvantGardeStd-Bk',
    color: color.primary,
    textAlign: 'right',
    textTransform: 'uppercase',
    marginTop: 15,
  },
});
