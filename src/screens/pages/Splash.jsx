import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Platform, StatusBar} from 'react-native';
import {color} from '../../assets/theme/theme';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 55 : 56;

const Splash = () => {
  const navigation = useNavigation();

  const session = async () => {
    let token = await AsyncStorage.getItem('token');
    console.log(token, '********** token **********');
    if (token) {
      navigation.navigate('DrawerNavigation');
    } else {
      navigation.navigate('Signin');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      session()
    }, 3000);
  }, []);

  const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <MyStatusBar backgroundColor={color.primary} barStyle="light-content" /> */}
      <Image
        source={{
          uri: 'https://pars-d.azurewebsites.net/content/images/logo_color.png',
        }}
        style={styles.logoStyle}
      />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
  },

  logoStyle: {
    width: '30%',
    height: '30%',
    resizeMode: 'contain',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});
