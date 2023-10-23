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
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PDHeader from '../PDHeader';

const Front = props => {
  const navigation = useNavigation();
  const { OrderId } = props.route.params;
  const { Status } = props.route.params;

  const [state, setState] = useState({
    IssuesMutlipleData: [],
    SelectedLocation: null,
    Quantity: 0,
    ImageSideName: {
      FrontSide: 'Front ',
    },
    ImageUrl: {
      FrontSideUrl: require('../../assets/icons/exterior_front_side.png'),
    },
  });

  const handleImageClick = event => {
    const { nativeEvent } = event;
    const { locationX, locationY } = nativeEvent;

    setState(prevState => ({
      ...prevState,
      SelectedLocation: { x: locationX, y: locationY },
      Quantity: state.Quantity + 1,
    }));
    setTimeout(() => {
      let data = [];
      const qty = state.Quantity + 1;
      const xy = { x: locationX, y: locationY, qty: qty, OrderId: OrderId };
      data.push(...state.IssuesMutlipleData, xy);
      navigation.navigate('IssueDetail', { OrderId: OrderId, qty: qty });
      setOject(data)
      setState(prevState => ({
        ...prevState,
        IssuesMutlipleData: data,
      }));
    }, 2000);
  };



  const setOject = async object => {
    try {
      const seri = JSON.stringify(object);
      await AsyncStorage.setItem('Front' + OrderId, seri),
        console.log('Front object store,successfully...');
    } catch (error) {
      console.log(error, ' exterior error ....');
    }
  };

  // useEffect(() => {
  //   setOject(state.IssuesMutlipleData)
  // }, state.SelectedLocation)

  const getObject = async id => {
    try {
      const seri = await AsyncStorage.getItem('Front' + id);
      if (seri !== null) {
        const parsedData = JSON.parse(seri);
        console.log('Retrived object dk', parsedData);
        setState(prevState => ({
          ...prevState,
          IssuesMutlipleData: parsedData
        }));
      }
    } catch (error) {
      console.log(error, 'retrived');
    }
  };



  useEffect(() => {
    getObject(OrderId);
  }, [OrderId]);

  const IssueAdd = ({
    handleImageClick,
    IssuePointList,
    ImageUrl,
    SelectedLocation,
  }) => {
    return (
      <View style={styles.issueView}>
        <TouchableOpacity onPress={handleImageClick}>
          <Image source={ImageUrl} style={styles.image} />
        </TouchableOpacity>
        {SelectedLocation && (
          <View
            style={[
              styles.selectionMarker,
              {
                left: SelectedLocation.x,
                top: SelectedLocation.y,
              },
            ]}></View>
        )}

        <>
          {IssuePointList.map(item => {
            return (
              <>
                {OrderId === item.OrderId ? (
                  <View
                    style={[
                      styles.selectionMarker,
                      {
                        left: item.x,
                        top: item.y,
                      },
                    ]}>
                    <Text style={styles.qty}>P{item.qty}</Text>
                  </View>
                ) : null}
              </>
            );
          })}
        </>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PDHeader
        HeaderName={'Front'}
        OrderId={OrderId}
        Screen={'Driver'}
        InformationStatus={'Next'}
        Status={Status}
      />
      <View style={styles.containerInner}>
        <View style={styles.body}>
          <Text style={styles.text}>Double tab to add new Issue</Text>
          <View style={styles.imageStyle}>
            <IssueAdd
              handleImageClick={handleImageClick}
              ImageUrl={state.ImageUrl.FrontSideUrl}
              IssuePointList={state.IssuesMutlipleData}
              SelectedLocation={state.SelectedLocation}
            />
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.text}>Issue List</Text>
          {state.IssuesMutlipleData.map(item => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('IssueDetail', {
                    OrderId: OrderId,
                    qty: item.qty,
                  })
                }
                style={styles.list}>
                <View style={styles.listInner}>
                  <Text style={styles.issueText}>P{item.qty}</Text>
                  <Text
                    style={[
                      styles.issueText,
                      {
                        marginLeft: 20,
                      },
                    ]}>
                    advg
                  </Text>
                </View>
                <Image
                  source={require('../../assets/icons/arrow.png')}
                  style={styles.iocnStyle}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Front;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  containerInner: {
    marginBottom: 10,
  },
  body: {
    width: '100%',
    backgroundColor: color.white,
    marginBottom: 10,
  },
  text: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
    color: color.black,
    textTransform: 'uppercase',
    padding: 10,
    paddingLeft: 20,
    fontFamily: 'ITCAvantGardeStd-Bk',
  },
  imageStyle: {
    paddingHorizontal: 15,
  },
  image: {
    width: '100%',
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
  qty: {
    fontSize: Platform.isPad ? size.font8 : size.font10,
    color: color.white,
    fontFamily: 'ITCAvantGardeStd-Bk',
  },
  list: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  listInner: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
  },
  issueText: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
    color: color.black,
    fontFamily: 'ITCAvantGardeStd-Bk',
  },
  iocnStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
