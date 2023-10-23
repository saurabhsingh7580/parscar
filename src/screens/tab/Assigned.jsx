import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color, size} from '../../assets/theme/theme';
import Header from '../../components/Header';
import Card from '../../components/Card';
import {Platform} from 'react-native';
import {Url} from '../../utils/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Assigned = () => {
  const [activeOrdersData, setActiveOrdersData] = useState(null);

  const handleActiveOrders = async () => {
    let token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(Url.ActiveOrders + `page=1&pageSize=2000`,{headers:{Authorization: `Bearer ${token}`}});
      if (response.data) {setActiveOrdersData(response.data)}
      console.log(response.data,'************ Active Orders Response ************');
    } catch (error) {
      console.error(error, '*********** Active Orders Error **********');
    }
  };


  useEffect(() => {
    handleActiveOrders();
  }, []);

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
    <View style={styles.container}>
      <Header header="Home" />
      {activeOrdersData === null ? (
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
            data={activeOrdersData}
            ListEmptyComponent={renderEmptyListComponent}
            keyExtractor={item => item.OrderId}
            renderItem={({item}) => (
              <Card item={item} screen="DrawerNavigator" status="assigned" />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Assigned;

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
