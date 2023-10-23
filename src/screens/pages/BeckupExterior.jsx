import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {color, size} from '../../assets/theme/theme';
  import Header from '../../components/PartInfection/Header';
  import {SafeAreaView} from 'react-native-safe-area-context';
  import ImagePicker from 'react-native-image-crop-picker';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {localeData} from 'moment';
  
  const Exterior = props => {
    const {OrderId} = props.route.params;
    const HeaderName = 'Exterior';
    const Status = 'Inspect';
  
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
      StatusVisible: false,
      LocalStoreImages: [],
    });
  
    const getImage = SideName => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(
          image.path,
          '**************** Image Url From Camera ***************',
        );
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
          StatusVisible: false,
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
          StatusVisible: false,
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
          StatusVisible: false,
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
          StatusVisible: false,
        }));
        return;
      }
    };
  
    const isCheck = () => {
      if (
        state.ImageCollection.Front &&
        state.ImageCollection.Driver &&
        state.ImageCollection.Rear &&
        state.ImageCollection.Passenger
      ) {
        setState(prevState => ({
          ...prevState,
          StatusVisible: true,
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
  
    const saveDataToAsyncStorage = async data => {
      console.log(data, 'data');
      try {
        await AsyncStorage.setItem('data', JSON.stringify(data));
        console.log('Data saved successfully');
      } catch (error) {
        console.log('Error saving data: ', error);
      }
    };
  
    useEffect(() => {
      if (state.ImageCollection.Front) {
        saveDataToAsyncStorage(state.ImageCollection);
        return;
      }
      if (state.ImageCollection.Driver) {
        saveDataToAsyncStorage(state.ImageCollection);
        return;
      }
      if (state.ImageCollection.Rear) {
        saveDataToAsyncStorage(state.ImageCollection);
        return;
      }
      if (state.ImageCollection.Passenger) {
        saveDataToAsyncStorage(state.ImageCollection);
        return;
      }
      if (state.ImageCollection.FrontUpload) {
        saveDataToAsyncStorage(state.ImageCollection);
        return;
      }
      if (state.ImageCollection.DriverUpload) {
        saveDataToAsyncStorage(state.ImageCollection);
        return;
      }
      if (state.ImageCollection.RearUpload) {
        saveDataToAsyncStorage(state.ImageCollection);
        return;
      }
      if (state.ImageCollection.PassengerUpload) {
        saveDataToAsyncStorage(state.ImageCollection);
        return;
      }
      if (state.ImageCollection.OrderId) {
        saveDataToAsyncStorage(state.ImageCollection);
        return;
      }
    }, [state]);
  
    // const loadDataFromAsyncStorage = async () => {
    //   try {
    //     const savedData = await AsyncStorage.getItem('data');
    //     if (savedData !== null) {
    //       const parsedData = JSON.parse(savedData);
    //       console.log('Data loaded successfully:', parsedData);
    //       if (OrderId === parsedData.OrderId) {
    //         setState(prevState => ({
    //           ...prevState,
    //           ImageCollection: {
    //             ...prevState.ImageCollection,
    //             Front: parsedData.Front,
    //             Driver: parsedData.Driver,
    //             Rear: parsedData.Rear,
    //             Passenger: parsedData.Passenger,
    //             OrderId: parsedData.OrderId,
    //             FrontUpload: parsedData.FrontUpload,
    //             DriverUpload: parsedData.DriverUpload,
    //             RearUpload: parsedData.RearUpload,
    //             PassengerUpload: parsedData.PassengerUpload,
    //           },
    //         }));
    //       }
    //     }
    //   } catch (error) {
    //     console.log('Error loading data: ', error);
    //   }
    // };
  
    // useEffect(() => {
    //   loadDataFromAsyncStorage();
    // }, []);
  
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
            <Text style={styles.textStyle}>{SideName}</Text>
            <Text style={[styles.textStyle, {color: color.gray}]}>
              {Upload === true ? 'Loaded' : null}
            </Text>
          </View>
          {UpdatedImageUrl === null ? (
            <Image source={ImageUrl} style={styles.imageStyle} />
          ) : (
            <Image
              source={{uri: UpdatedImageUrl}}
              style={[styles.imageStyle, {marginBottom: 10}]}
            />
          )}
  
          <TouchableOpacity
            onPress={() => getImage(SideName)}
            style={styles.contentstyle}>
            <Text style={styles.textStyle}>
              {' '}
              Take a picture of the{' '}
              <Text style={{color: color.primary}}>{SideName}</Text>
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
  
    const storeImages = value => {
      let localData = [];
      localData.push(...state.LocalStoreImages, value);
      setState(prevState => ({
        ...prevState,
        LocalStoreImages: localData,
      }));
    };
  
    useEffect(() => {
      if (state.ImageCollection) {
        storeImages(state.ImageCollection);
      }
    }, [state.ImageCollection]);
  
    console.log(state.LocalStoreImages, '******** Local Store **********');
  
    const saveLocalDataToAsyncStorage = async data => {
      console.log(data, 'data');
      try {
        await AsyncStorage.setItem('LocalImagedataStore', JSON.stringify(data));
        console.log('LocalImagedataStore saved successfully');
      } catch (error) {
        console.log('Error saving data: ', error);
      }
    };
  
    useEffect(() => {
      if (state.ImageCollection.Front !== null) {
        saveLocalDataToAsyncStorage(state.LocalStoreImages);
        return;
      }
      if (state.ImageCollection.Driver !== null) {
        saveLocalDataToAsyncStorage(state.LocalStoreImages);
        return;
      }
      if (state.ImageCollection.Rear !== null) {
        saveLocalDataToAsyncStorage(state.LocalStoreImages);
        return;
      }
      if (state.ImageCollection.Passenger !== null) {
        saveLocalDataToAsyncStorage(state.LocalStoreImages);
        return;
      }
      if (state.ImageCollection.FrontUpload) {
        saveLocalDataToAsyncStorage(state.LocalStoreImages);
        return;
      }
      if (state.ImageCollection.DriverUpload) {
        saveLocalDataToAsyncStorage(state.LocalStoreImages);
        return;
      }
      if (state.ImageCollection.RearUpload) {
        saveLocalDataToAsyncStorage(state.LocalStoreImages);
        return;
      }
      if (state.ImageCollection.PassengerUpload) {
        saveLocalDataToAsyncStorage(state.LocalStoreImages);
        return;
      }
      if (state.ImageCollection.OrderId) {
        saveLocalDataToAsyncStorage(state.LocalStoreImages);
        return;
      }
    }, [
      state.ImageCollection.Front,
      state.ImageCollection.Driver,
      state.ImageCollection.Rear,
      state.ImageCollection.FrontUpload,
      state.ImageCollection.DriverUpload,
      state.ImageCollection.RearUpload,
      state.ImageCollection.PassengerUpload,
      state.ImageCollection.OrderId,
    ]);
  
    const loadLocalDataFromAsyncStorage = async () => {
      try {
        const savedData = await AsyncStorage.getItem('LocalImagedataStore');
        if (savedData !== null) {
          const parsedData = JSON.parse(savedData);
          console.log('LocalImagedataStore loaded successfully:', parsedData);
  
          // if (OrderId === parsedData.OrderId) {
          setState(prevState => ({
            ...prevState,
            // ImageCollection: {
            //   ...prevState.ImageCollection,
            //   Front: parsedData.Front,
            //   Driver: parsedData.Driver,
            //   Rear: parsedData.Rear,
            //   Passenger: parsedData.Passenger,
            //   OrderId: parsedData.OrderId,
            //   FrontUpload: parsedData.FrontUpload,
            //   DriverUpload: parsedData.DriverUpload,
            //   RearUpload: parsedData.RearUpload,
            //   PassengerUpload: parsedData.PassengerUpload,
            // },
            LocalStoreImages: parsedData,
          }));
          // }
        }
      } catch (error) {
        console.log('Error loading data: ', error);
      }
    };
  
    useEffect(() => {
      loadLocalDataFromAsyncStorage();
    }, []);
  
    const filterData = () => {
      let newData = state.LocalStoreImages.filter(obj => obj.OrderId === OrderId);
  
      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          ImageCollection: {
            ...prevState.ImageCollection,
            Front: newData[0].Front,
            Driver: newData[1].Driver,
            Rear: newData[2].Rear,
            Passenger: newData[3].Passenger,
            OrderId: newData[0].OrderId,
            FrontUpload: newData[0].FrontUpload,
            DriverUpload: newData[1].DriverUpload,
            RearUpload: newData[2].RearUpload,
            PassengerUpload: newData[3].PassengerUpload,
          },
        }));
      }, 5000);
  
      console.log(newData, '[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]');
    };
  
    useEffect(() => {
      if (state.LocalStoreImages !== null) {
        filterData();
      }
    }, [state.LocalStoreImages]);
    return (
      <SafeAreaView style={styles.container}>
        <Header
          HeaderName={HeaderName}
          OrderId={OrderId}
          Status={Status}
          StatusVisible={state.StatusVisible}
          Screen={'Front'}
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
      width: '90%',
      alignSelf: 'center',
      paddingVertical: 15,
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
  