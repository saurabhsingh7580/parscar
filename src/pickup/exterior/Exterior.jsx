import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { color, size } from '../../assets/theme/theme';
import Header from '../../components/PartInfection/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PDHeader from '../PDHeader';

const Exterior = props => {
  const { OrderId } = props.route.params;


  const [state, setState] = useState({
    ImageCollection: {
      Front: null,
      Driver: null,
      Rear: null,
      Passenger: null,
      OrderId: null,
      FrontUpload: false,
      DriverUpload: false,
      RearUpload: false,
      PassengerUpload: false,
    },
    ImageSideName: {
      FrontSide: 'Front Side',
      DriverSide: 'Driver Side',
      RearSide: 'Rear Side',
      PassengerSide: 'Passenger Side',
    },
    ImageUrl: {
      FrontSideUrl: require('../../assets/icons/exterior_front_side.png'),
      DriverSideUrl: require('../../assets/icons/exterior_driver_side.png'),
      RearSideUrl: require('../../assets/icons/exterior_rear_side.png'),
      PassengerSideUrl: require('../../assets/icons/exterior_passenger_side.png'),
    },
    IconCollection: {
      CameraIcon: require('../../assets/icons/camera.png'),
      DeleteIcon: require('../../assets/icons/delete.png'),
    },
    Status: false,

  });

  const getImage = SideName => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (SideName === state.ImageSideName.FrontSide) {
        setState(prevState => ({
          ...prevState,
          ImageCollection: {
            ...prevState.ImageCollection,
            Front: image.path,
            OrderId: OrderId,
            FrontUpload: true,
          },
        }));
        return;
      }
      if (SideName === state.ImageSideName.DriverSide) {
        setState(prevState => ({
          ...prevState,
          ImageCollection: {
            ...prevState.ImageCollection,
            Driver: image.path,
            OrderId: OrderId,
            DriverUpload: true,
          },
        }));
        return;
      }
      if (SideName === state.ImageSideName.RearSide) {
        setState(prevState => ({
          ...prevState,
          ImageCollection: {
            ...prevState.ImageCollection,
            Rear: image.path,
            OrderId: OrderId,
            RearUpload: true,
          },
        }));
        return;
      }
      if (SideName === state.ImageSideName.PassengerSide) {
        setState(prevState => ({
          ...prevState,
          ImageCollection: {
            ...prevState.ImageCollection,
            Passenger: image.path,
            OrderId: OrderId,
            PassengerUpload: true,
          },
        }));
        return;
      }
    });
  };

  const deleteImage = SideName => {
    if (SideName === state.ImageSideName.FrontSide) {
      setState(prevState => ({
        ...prevState,
        ImageCollection: {
          ...prevState.ImageCollection,
          Front: null,
          OrderId: OrderId,
          FrontUpload: false,
        },
        Status: false,
      }));
      return;
    }
    if (SideName === state.ImageSideName.DriverSide) {
      setState(prevState => ({
        ...prevState,
        ImageCollection: {
          ...prevState.ImageCollection,
          Driver: null,
          OrderId: OrderId,
          DriverUpload: false,
        },
        Status: false,
      }));
      return;
    }
    if (SideName === state.ImageSideName.RearSide) {
      setState(prevState => ({
        ...prevState,
        ImageCollection: {
          ...prevState.ImageCollection,
          Rear: null,
          OrderId: OrderId,
          RearUpload: false,
        },
        Status: false,
      }));
      return;
    }
    if (SideName === state.ImageSideName.PassengerSide) {
      setState(prevState => ({
        ...prevState,
        ImageCollection: {
          ...prevState.ImageCollection,
          Passenger: null,
          OrderId: OrderId,
          PassengerUpload: false,
        },
        Status: false,
      }));
      return;
    }
  };


  const setOject = async object => {
    try {
      const seri = JSON.stringify(object);
      await AsyncStorage.setItem('Exterior' + OrderId, seri),
        console.log('exterior object store,successfully...');
    } catch (error) {
      console.log(error, ' exterior error ....');
    }
  };

  const getObject = async id => {
    try {
      const seri = await AsyncStorage.getItem('Exterior' + id);
      if (seri !== null) {
        const parsedData = JSON.parse(seri);
        console.log('Retrived object dk', parsedData);
        setState(prevState => ({
          ...prevState,
          ImageCollection: {
            ...prevState.ImageCollection,
            Front: parsedData.Front,
            Driver: parsedData.Driver,
            Rear: parsedData.Rear,
            Passenger: parsedData.Passenger,
            OrderId: parsedData.OrderId,
            FrontUpload: parsedData.FrontUpload,
            DriverUpload: parsedData.DriverUpload,
            RearUpload: parsedData.RearUpload,
            PassengerUpload: parsedData.PassengerUpload,
          },
        }));
      }
    } catch (error) {
      console.log(error, 'retrived');
    }
  };
  useEffect(() => {
    if (
      state.ImageCollection.Front ||
      state.ImageCollection.Driver ||
      state.ImageCollection.Rear ||
      state.ImageCollection.Passenger ||
      state.ImageCollection.OrderId
    ) {
      setOject(state.ImageCollection);
      return;
    }

  }, [
    state.ImageCollection.Front,
    state.ImageCollection.Driver,
    state.ImageCollection.Rear,
    state.ImageCollection.Passenger,
    state.ImageCollection.OrderId,
    state.ImageCollection.FrontUpload,
    state.ImageCollection.DriverUpload,
    state.ImageCollection.RearUpload,
    state.ImageCollection.PassengerUpload,
  ]);

  useEffect(() => {
    getObject(OrderId);
  }, []);


  const isCheck = () => {
    if (
      state.ImageCollection.Front &&
      state.ImageCollection.Driver &&
      state.ImageCollection.Rear &&
      state.ImageCollection.Passenger
    ) {
      setState(prevState => ({
        ...prevState,
        Status: true,
      }));
    }
  };

  useEffect(() => {
    isCheck();
  }, [
    state.ImageCollection.Front,
    state.ImageCollection.Driver,
    state.ImageCollection.Rear,
    state.ImageCollection.Passenger,
  ]);

  const ImageAdd = ({
    SideName,
    Upload,
    ImageUrl,
    UpdatedImageUrl,
    IconName,
    getImage,
    deleteImage,
  }) => {
    return (
      <View style={styles.body}>
        <View style={styles.sideNameStyle}>
          <Text style={[styles.textStyle, { textTransform: 'uppercase' }]}>
            {SideName}
          </Text>
          <Text style={[styles.textStyle, { color: color.gray }]}>
            {Upload === true ? 'Loaded' : null}
          </Text>
        </View>
        {UpdatedImageUrl === null ? (
          <TouchableOpacity onPress={() => getImage(SideName)}>
            <Image source={ImageUrl} style={styles.imageStyle} />
          </TouchableOpacity>
        ) : (
          <Image
            source={{ uri: UpdatedImageUrl }}
            style={[styles.imageStyle, { marginBottom: 10 }]}
          />
        )}

        <TouchableOpacity
          onPress={() => getImage(SideName)}
          style={styles.contentstyle}>
          <Text style={styles.textStyle}>
            {' '}
            Take a picture of the{' '}
            <Text style={{ color: color.primary, textTransform: 'uppercase' }}>
              {SideName}
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => deleteImage(SideName)}
            style={styles.buttonStyle}>
            <Image source={IconName.DeleteIcon} style={styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getImage(SideName)}
            style={styles.buttonStyle}>
            <Image source={IconName.CameraIcon} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PDHeader
        HeaderName={'Exterior'}
        OrderId={OrderId}
        Screen={'Front'}
        InformationStatus={'Inspact'}
        Status={state.Status}
      />
      <ScrollView>
        <View style={styles.containerInner}>
          <ImageAdd
            SideName={state.ImageSideName.FrontSide}
            Upload={state.ImageCollection.FrontUpload}
            ImageUrl={state.ImageUrl.FrontSideUrl}
            UpdatedImageUrl={state.ImageCollection.Front}
            IconName={state.IconCollection}
            getImage={getImage}
            deleteImage={deleteImage}
          />
          <ImageAdd
            SideName={state.ImageSideName.DriverSide}
            Upload={state.ImageCollection.DriverUpload}
            ImageUrl={state.ImageUrl.DriverSideUrl}
            UpdatedImageUrl={state.ImageCollection.Driver}
            IconName={state.IconCollection}
            getImage={getImage}
            deleteImage={deleteImage}
          />
          <ImageAdd
            SideName={state.ImageSideName.RearSide}
            Upload={state.ImageCollection.RearUpload}
            ImageUrl={state.ImageUrl.RearSideUrl}
            UpdatedImageUrl={state.ImageCollection.Rear}
            IconName={state.IconCollection}
            getImage={getImage}
            deleteImage={deleteImage}
          />
          <ImageAdd
            SideName={state.ImageSideName.PassengerSide}
            Upload={state.ImageCollection.PassengerUpload}
            ImageUrl={state.ImageUrl.PassengerSideUrl}
            UpdatedImageUrl={state.ImageCollection.Passenger}
            IconName={state.IconCollection}
            getImage={getImage}
            deleteImage={deleteImage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Exterior;

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
  },
  sideNameStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 15,
    backgroundColor: color.white,
    paddingHorizontal: 25
  },
  imageStyle: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  contentstyle: {
    backgroundColor: color.white,
    paddingHorizontal: 25,
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 32,
  },
  textStyle: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
    color: color.black,
    fontFamily: 'ITCAvantGardeStd-Bk',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
  },
  buttonStyle: {
    width: '50%',
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: color.gray,
  },
  iconStyle: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    tintColor: color.gray,
  },
});
