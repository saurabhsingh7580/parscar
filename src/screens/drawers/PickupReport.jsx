import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { color, size, weight } from '../../assets/theme/theme';
import BackHeader from '../../components/BackHeader';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PickupReport = props => {
  const navigation = useNavigation();
  const { Id, OrderId } = props.route.params;
  const { Status } = props.route.params;

  console.log(Status, 'Vin Check status')

  const List = ({ name, screen, status, unique, statusText }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(screen, { Id: Id, OrderId: OrderId })
        }}
        style={[
          styles.serviceList,
          {
            borderBottomWidth: unique ? 0 : 1,
          },
        ]}>
        <Text style={styles.listText}>{name}</Text>

        <View
          style={{
            flexDirection: 'row',
          }}>
          {Status === true ?
            <Text
              style={[styles.listText, { marginRight: 10, color: color.primary }]}>
              {statusText}
            </Text> : null}

          <Image
            source={require('../../assets/icons/arrow.png')}
            style={styles.arrorwStyle}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="Pickup Report" subTitle={OrderId} unique="" />
      <ScrollView>
        <View style={styles.containerInner}>
          <List name="VIN Check" screen="VINCheck" status={Status} statusText='Done' />
          <List name="Exterior" screen="Exterior" status="" />
          <List name="Interior" screen="Interior" />
          <List name="Safety and Accessories" screen="Accessories" status={Status} statusText='Done' />
          <List name="Sign" screen="Sign" />
          <List name="Upload" screen="" status="Unavailable" unique="1" />
        </View>
        <View style={styles.containerInner}>
          <List name="Full Issue List" screen="IssueList" status="" unique="1" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PickupReport;

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
    backgroundColor: '#f2f2f2',
    paddingVertical: 0,
  },

  serviceList: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Platform.isPad ? 30 : 15,
    borderBottomWidth: 0.7,
    borderColor: color.gray,
    width: '93%',
    alignSelf: 'center',
  },

  listText: {
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.low,
    fontFamily: Platform.isPad
      ? 'ITCAvantGardeStd-Bk'
      : 'ITCAvantGardeStd-Demi',
    color: color.gray,
  },
  arrorwStyle: {
    width: Platform.isPad ? 16 : 20,
    height: Platform.isPad ? 16 : 20,
    resizeMode: 'contain',
    tintColor: color.gray,
  },
});
