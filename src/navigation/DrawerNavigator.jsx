import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import { color, size, weight } from '../assets/theme/theme';
import Explore from '../screens/pages/Explore';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
import Modal from 'react-native-modal';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation, Id, OrderId, OrderStatus }) {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const onCall = () => {
    Linking.openURL(`tel:${4847502046}`);
  };
  return (
    <View style={styles.container}>
      <View style={styles.drawerTitle}>
        <Text style={styles.titletext}> Actions</Text>
      </View>

      <View style={{ marginTop: Platform.isPad ? 30 : 10 }}>
        {OrderStatus === 'DELIVERED' ? null : (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Schedule', { Id: Id, OrderId: OrderId }),
                  navigation.closeDrawer();
              }}
              style={styles.drawerStyle}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../assets/icons/schedule.png')}
                  style={styles.iconStyle}
                />
                <Text style={styles.text}>Schedule</Text>
              </View>
              {/* <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrorwStyle}
          /> */}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddNote', { Id: Id, OrderId: OrderId }),
                  navigation.closeDrawer();
              }}
              style={styles.drawerStyle}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../assets/icons/add-note.png')}
                  style={styles.iconStyle}
                />
                <Text style={styles.text}>Add Note</Text>
              </View>
              {/* <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrorwStyle}
          /> */}
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PickupReport', { Id: Id, OrderId: OrderId }),
              navigation.closeDrawer();
          }}
          style={styles.drawerStyle}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../assets/icons/icon_menu_pickup.png')}
              style={styles.iconStyle}
            />
            <Text style={styles.text}>Pickup Report</Text>
          </View>
          {/* <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrorwStyle}
          /> */}
        </TouchableOpacity>
        {OrderStatus === 'DELIVERED' ? null : (
          <TouchableOpacity onPress={toggleModal} style={styles.drawerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/icons/icon_menu_call_field_office.png')}
                style={styles.iconStyle}
              />
              <Text style={styles.text}>Call Delivery</Text>
            </View>
            {/* <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrorwStyle}
          /> */}
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.drawerStyle}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../assets/icons/icon_menu_delivery_reports.png')}
              style={styles.iconStyle}
            />
            <Text style={styles.text}>Delivery Report</Text>
          </View>
          {/* <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrorwStyle}
          /> */}
        </TouchableOpacity>
        {OrderStatus === 'DELIVERED' ? (
          <TouchableOpacity onPress={onCall} style={styles.drawerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/icons/icon_menu_call_field_office.png')}
                style={styles.iconStyle}
              />
              <Text style={styles.text}>Call Field Office</Text>
            </View>
            {/* <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrorwStyle}
          /> */}
          </TouchableOpacity>
        ) : null}
        {OrderStatus === 'DELIVERED' ? (
          <TouchableOpacity style={styles.drawerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/icons/icon_menu_invoising.png')}
                style={styles.iconStyle}
              />
              <Text style={styles.text}>Complete Invoicing</Text>
            </View>
            {/* <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrorwStyle}
          /> */}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onCall} style={styles.drawerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/icons/icon_menu_call_field_office.png')}
                style={styles.iconStyle}
              />
              <Text style={styles.text}>Call Field Office</Text>
            </View>
            {/* <Image
        source={require('../assets/icons/arrow.png')}
        style={styles.arrorwStyle}
      /> */}
          </TouchableOpacity>
        )}
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <View style={styles.modalInner}>
            <Text
              style={[
                styles.textModal,
                { fontSize: Platform.isPad ? size.font14 : size.font16 },
              ]}>
              {/* {contactValue} */}
              Maxx
            </Text>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}>
              <Text style={styles.selectText}>
                {/* {item.PhoneName + ' ' + item.PhoneNumber} */}
                Mobile Phone 890-098-2321
              </Text>
            </TouchableOpacity>

            {/* {phoneData
              ? phoneData.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal();
                    }}>
                    <Text style={styles.selectText}>
                      {item.PhoneName + ' ' + item.PhoneNumber}
                    </Text>
                  </TouchableOpacity>
                );
              })
              : null} */}
            <Text onPress={toggleModal} style={styles.cancel}>
              Cancel
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const DrawerNavigator = props => {
  const { Id, OrderId, OrderStatus } = props.route.params;
  console.log(OrderStatus, 'OrderStatus');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={props => (
          <CustomDrawerContent
            {...props}
            Id={Id}
            OrderId={OrderId}
            OrderStatus={OrderStatus}
          />
        )}>
        <Drawer.Screen
          name="Explore"
          component={Explore}
          initialParams={{ OrderId: OrderId, Id: Id, OrderStatus: OrderStatus }}
        />
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

export default DrawerNavigator;

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
  textModal: {
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
