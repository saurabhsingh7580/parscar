import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import {color, size, weight} from '../assets/theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const Drawer = createDrawerNavigator();

function CustomDrawerContent({navigation}) {
  const SignOut = async () => {
    AsyncStorage.clear().then(() => {
      navigation.navigate('Signin'),
        console.log('********* Successfully Sign Out ***********');
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.drawerTitle}>
        <Text style={styles.titletext}> Actions</Text>
      </View>

      <View style={{marginTop: Platform.isPad ? 30 : 10}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Insurance')}
          style={styles.drawerStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/icon_menu_info.png')}
              style={styles.iconStyle}
            />
            <Text style={styles.text}>Insurance info </Text>
          </View>
          {/* <Image
                        source={require('../assets/icons/arrow.png')}
                        style={styles.arrorwStyle}
                    /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/icon_menu_accident.png')}
              style={styles.iconStyle}
            />
            <Text style={styles.text}>Report Accident</Text>
          </View>
          {/* <Image
                        source={require('../assets/icons/arrow.png')}
                        style={styles.arrorwStyle}
                    /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/icon_menu_settings.png')}
              style={styles.iconStyle}
            />
            <Text style={styles.text}>settings</Text>
          </View>
          {/* <Image
                        source={require('../assets/icons/arrow.png')}
                        style={styles.arrorwStyle}
                    /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            SignOut(), navigation.closeDrawer();
          }}
          style={styles.drawerStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/icon_menu_logout.png')}
              style={styles.iconStyle}
            />
            <Text style={styles.text}>sign out</Text>
          </View>
          {/* <Image
                        source={require('../assets/icons/arrow.png')}
                        style={styles.arrorwStyle}
                    /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const DrawerNavigation = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={TabNavigation} />
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  drawerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.isPad ? 50 : 40,
  },
  titletext: {
    fontSize: Platform.isPad ? size.font16 : size.font22,
    fontFamily: Platform.isPad
      ? 'ITCAvantGardeStd-Bk'
      : 'ITCAvantGardeStd-Demi',
    color: color.white,
    textTransform: 'uppercase',
    fontWeight: weight.regular,
  },
  drawerStyle: {
    height: height / 18,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // borderTopWidth: 0.5,
    // borderColor: color.white,
    alignItems: 'center',
    marginTop: 10,
  },
  iconStyle: {
    width: Platform.isPad ? 20 : 25,
    height: Platform.isPad ? 20 : 25,
    resizeMode: 'contain',
    tintColor: color.white,
  },
  text: {
    fontSize: Platform.isPad ? size.font12 : size.font16,
    fontWeight: weight.low,
    color: color.white,
    marginLeft: 25,
    opacity: 0.8,
    textTransform: 'capitalize',
  },
  arrorwStyle: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: color.white,
    opacity: 0.8,
  },
});
