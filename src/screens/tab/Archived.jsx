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

const Archived = () => {
  const [archivedOrdersData, setArchivedOrdersData] = useState(null);

  const handleActiveOrders = async () => {
    let token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(
        Url.ArchivedOrders + `page=1&pageSize=2000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data) {
        setArchivedOrdersData(response.data);
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
      {archivedOrdersData === null ? (
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
            data={archivedOrdersData}
            ListEmptyComponent={renderEmptyListComponent}
            keyExtractor={item => item.OrderId}
            renderItem={({item}) => (
              <Card item={item} screen="DrawerNavigator" status="archived" />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Archived;

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
