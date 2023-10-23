import {
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import {color} from '../../assets/theme/theme';
const {width, height} = Dimensions.get('window');
import {Url} from '../../utils/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Card from '../../components/Card';
import {Platform} from 'react-native';

const Available = () => {
  const [availableOrdersData, setvAilableOrdersData] = useState(null);

  const handleActiveOrders = async () => {
    let token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(
        Url.AvailableOrders + `page=1&pageSize=2000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data) {
        setvAilableOrdersData(response.data);
      }
      console.log(
        response.data,
        '************ Archived Orders Response ************',
      );
    } catch (error) {
      console.error(error, '*********** Archived Orders Error **********');
    }
  };

  useEffect(() => {
    handleActiveOrders();
  }, []);
  console.log(availableOrdersData,'........................../////////availableOrdersData......')

  const renderEmptyListComponent = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 300,
        }}>
        <Text
          style={{
            fontSize: Platform.isPad ? size.font14 : size.font16,
          }}>
          There is no data available
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header header="Home" />
        {availableOrdersData === null ? (
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
          <View style={styles.containerInner}>
            <FlatList
              data={availableOrdersData}
              ListEmptyComponent={renderEmptyListComponent}
              keyExtractor={item => item.OrderId}
              renderItem={({item}) => (
                <Card item={item} screen="DrawerNavigator" status="archived" />
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Available;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.secondary,
    width: '100%',
  },
  containerInner: {
    paddingBottom: Platform.isPad ? 150 : 80,
  },
  topView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
});
