import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { color, size } from '../../assets/theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const IssueCapture = ({ imageUrl, OrderId }) => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    IssuesMutlipleData: [],
    selectedLocation: null,
    Quantity: 1,
  });

  const handleImageClick = event => {
    const { nativeEvent } = event;
    const { locationX, locationY } = nativeEvent;

    setState(prevState => ({
      ...prevState,
      selectedLocation: { x: locationX, y: locationY },
      Quantity: state.Quantity + 1,
    }));
    setTimeout(() => {
      let data = [];
      const qty = state.Quantity;
      const xy = { x: locationX, y: locationY, qty: qty };
      data.push(...state.IssuesMutlipleData, xy);
      //   Alert.alert('Hi, Its working!!');
      navigation.navigate('IssueDetail', { OrderId: OrderId,qty:qty });
      setState(prevState => ({
        ...prevState,
        IssuesMutlipleData: data,
      }));
    }, 2000);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImageClick}>
        <Image source={imageUrl} style={styles.image} />
      </TouchableOpacity>
      {state.selectedLocation && (
        <View
          style={[
            styles.selectionMarker,
            {
              left: state.selectedLocation.x,
              top: state.selectedLocation.y,
            },
          ]}></View>
      )}

      <>
        {state.IssuesMutlipleData.map(item => {
          return (
            <View
              style={[
                styles.selectionMarker,
                {
                  left: item.x,
                  top: item.y,
                },
              ]}>
              <Text style={styles.text}>P{item.qty}</Text>
            </View>
          );
        })}
      </>
    </View>
  );
};

export default IssueCapture;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 360,
    height: 300,
    resizeMode: 'contain',
  },
  selectionMarker: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: color.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Platform.isPad ? size.font8 : size.font10,
    color: color.white,
  },
});
