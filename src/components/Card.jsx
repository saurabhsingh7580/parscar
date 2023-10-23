import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import { color, size, weight } from '../assets/theme/theme';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const Card = ({ item, screen, status }) => {
  const navigation = useNavigation();
  console.log(item,'anuj pawar barual vidisha')
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(screen, { OrderId: item.OrderId, Id: item.Id, OrderStatus: item.Status })
      }
      style={styles.container}>
      <View style={styles.containerInner}>
        <View style={styles.titleView}>
          <Text style={styles.ord}>{item.OrderId}</Text>
          {status === 'archived' ? null : (
            <View
              style={[
                styles.statusButton,
                {
                  backgroundColor:
                    item.Status === 'DISPATCHED'
                      ? 'orange'
                      : color.primary && item.Status === 'EXECUTION'
                        ? '#77bd62'
                        : color.primary && item.Status === 'HOLD'
                          ? color.black
                          : color.primary,
                },
              ]}>
              <Text
                style={[
                  styles.ord,
                  {
                    color: color.white,
                    fontSize: Platform.isPad ? size.font8 : size.font10,
                  },
                ]}>
                {item.Status}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.desc}>
          {item.EstimatedDistance} Mi. {item.Vehicle.Year}, {item.Vehicle.Make},{' '}
          {item.Vehicle.Model}
        </Text>
        <View style={styles.titleView}>
          <View style={styles.contentView}>
            <Text style={styles.title}>
              {item.PickupAddress.City} {item.PickupAddress.State}
            </Text>
            <Text style={styles.date}>
              {new Date(item.ScheduledPickupDate).toDateString().slice(4)},{' '}
              <Text style={styles.time}>
                {new Date(item.ScheduledPickupDate).toLocaleTimeString()}
              </Text>
            </Text>
            <Text style={styles.day}>
              {new Date(item.ScheduledPickupDate).toDateString().slice(0, 4)}
            </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.title}>
              {item.DeliveryAddress.City} {item.DeliveryAddress.State}
            </Text>
            <Text style={styles.date}>
              {new Date(item.ScheduledDeliveryDate).toDateString().slice(4)},{' '}
              <Text style={styles.time}>
                {new Date(item.ScheduledDeliveryDate).toLocaleTimeString()}
              </Text>
            </Text>
            <Text style={styles.day}>
              {new Date(item.ScheduledDeliveryDate).toDateString().slice(0, 4)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.theme,
    borderRadius: 3,
    paddingVertical: 10,
    marginBottom: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: color.lightGray,
    width: '100%',
  },
  containerInner: {
    width: '90%',
    alignSelf: 'center',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  ord: {
    color: color.primary,
    // fontSize: size.font14,
    fontSize: Platform.isPad ? size.font12 : size.font14,
    fontWeight: weight.medium,
    textTransform: 'uppercase',
    // fontFamily: 'ITCAvantGardeStd-Bk',
  },
  statusButton: {
    paddingVertical: Platform.isPad ? 8 : 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.cyan,
    borderRadius: 2,
    width: '30%',
  },
  desc: {
    // fontSize: size.font12,
    fontSize: Platform.isPad ? size.font8 : size.font10,
    fontWeight: weight.low,
    color: color.gray,
    paddingVertical: 2,
    fontFamily: 'ITCAvantGardeStd-Bk',
  },
  contentView: {},
  title: {
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.low,
    color: color.black,
    paddingVertical: Platform.isPad ? 14 : 5,
    fontFamily: 'ITCAvantGardeStd-Demi',
  },
  date: {
    fontSize: Platform.isPad ? size.font10 : size.font12,
    fontWeight: weight.low,
    color: color.black,
    fontFamily: 'NewBaskervilleStd-Roman',
  },
  time: {
    fontSize: Platform.isPad ? size.font10 : size.font12,
    fontWeight: weight.low,
    color: color.gray,
    fontFamily: 'NewBaskervilleStd-Roman',
  },
  day: {
    fontSize: Platform.isPad ? size.font8 : size.font10,
    fontWeight: weight.low,
    color: color.gray,
    fontFamily: 'NewBaskervilleStd-Roman',
    paddingVertical: Platform.isPad ? 8 : 5,
  },
});
