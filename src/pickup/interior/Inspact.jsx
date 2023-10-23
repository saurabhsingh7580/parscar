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
import { color, size, weight } from '../../assets/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import PDHeader from '../PDHeader';

const Inspact = props => {
  const { OrderId } = props.route.params;
  const [state, setState] = useState({
    ImageCollection: {
      Front: null,
      Carpets: null,
      Rear: null,
      Ceiling: null,
      Cargo: null,
      OrderId: null,
      FrontUpload: false,
      CarpetsUpload: false,
      RearUpload: false,
      CeilingUpload: false,
      CargoUpload: false,
    },
    ImageSideName: {
      FrontSeat: 'Front Seats',
      Carpets: 'Carpets',
      RearSeat: 'Rear Seats',
      Ceiling: 'Ceiling/Headliner',
      Cargo: 'Trunk/Cargo Area',
    },
    ImageUrl: {
      UnalableImaeUrl: require('../../assets/icons/no_photo.png'),
    },
    IconCollection: {
      CameraIcon: require('../../assets/icons/camera.png'),
      DeleteIcon: require('../../assets/icons/delete.png'),
    },
    StatusVisible: false,
    modalVisible: {
      PictureType: false,
      SideName: null,
    },
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
      if (SideName === state.ImageSideName.FrontSeat) {
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
      if (SideName === state.ImageSideName.RearSeat) {
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
      if (SideName === state.ImageSideName.Carpets) {
        setState(prevState => ({
          ...prevState,
          ImageCollection: {
            ...prevState.ImageCollection,
            Carpets: image.path,
            OrderId: OrderId,
            CarpetsUpload: true,
          },
        }));
        return;
      }
      if (SideName === state.ImageSideName.Ceiling) {
        setState(prevState => ({
          ...prevState,
          ImageCollection: {
            ...prevState.ImageCollection,
            Ceiling: image.path,
            OrderId: OrderId,
            CargoUpload: true,
          },
        }));
        return;
      }
      if (SideName === state.ImageSideName.Cargo) {
        setState(prevState => ({
          ...prevState,
          ImageCollection: {
            ...prevState.ImageCollection,
            Cargo: image.path,
            OrderId: OrderId,
            CargoUpload: true,
          },
        }));
        return;
      }
    });
  };

  const deleteImage = SideName => {
    if (SideName === state.ImageSideName.FrontSeat) {
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
    if (SideName === state.ImageSideName.Carpets) {
      setState(prevState => ({
        ...prevState,
        ImageCollection: {
          ...prevState.ImageCollection,
          Carpets: null,
          OrderId: OrderId,
          CarpetsUpload: false,
        },
        Status: false,
      }));
      return;
    }
    if (SideName === state.ImageSideName.RearSeat) {
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
    if (SideName === state.ImageSideName.Ceiling) {
      setState(prevState => ({
        ...prevState,
        ImageCollection: {
          ...prevState.ImageCollection,
          Ceiling: null,
          OrderId: OrderId,
          CeilingUpload: false,
        },
        Status: false,
      }));
      return;
    }
    if (SideName === state.ImageSideName.Cargo) {
      setState(prevState => ({
        ...prevState,
        ImageCollection: {
          ...prevState.ImageCollection,
          Cargo: null,
          OrderId: OrderId,
          CargoUpload: false,
        },
        Status: false,
      }));
      return;
    }
  };

  const onCheck = () => {
    if (
      state.ImageCollection.Front &&
      state.ImageCollection.Carpets &&
      state.ImageCollection.Rear &&
      state.ImageCollection.Ceiling &&
      state.ImageCollection.Cargo
    ) {
      setState(prevState => ({
        ...prevState,
        Status: true,
      }));
    }
  };

  useEffect(() => {
    onCheck();
  }, [
    state.ImageCollection.Front,
    state.ImageCollection.Carpets,
    state.ImageCollection.Rear,
    state.ImageCollection.Ceiling,
    state.ImageCollection.Cargo,
  ]);



  const setOject = async object => {
    try {
      const seri = JSON.stringify(object);
      await AsyncStorage.setItem('InteriorPhoto' + OrderId, seri),
        console.log('Interior photo object store,successfully...');
    } catch (error) {
      console.log(error, ' Interior photo error ....');
    }
  };

  const getObject = async id => {
    try {
      const seri = await AsyncStorage.getItem('InteriorPhoto' + id);
      if (seri !== null) {
        const parsedData = JSON.parse(seri);
        console.log('Retrived object dk', parsedData);
        setState(prevState => ({
          ...prevState,
          ImageCollection: {
            ...prevState.ImageCollection,
            Front: parsedData.Front,
            Cargo: parsedData.Cargo,
            Rear: parsedData.Rear,
            Carpets: parsedData.Carpets,
            Ceiling: parsedData.Ceiling,
            OrderId: parsedData.OrderId,
            FrontUpload: parsedData.FrontUpload,
            CarpetsUpload: parsedData.CarpetsUpload,
            RearUpload: parsedData.RearUpload,
            CeilingUpload: parsedData.CeilingUpload,
            CargoUpload: parsedData.CargoUpload,
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
      state.ImageCollection.Rear ||
      state.ImageCollection.Carpets ||
      state.ImageCollection.Ceiling ||
      state.ImageCollection.OrderId ||
      state.ImageCollection.Cargo
    ) {
      setOject(state.ImageCollection);
      return;
    }

  }, [
    state.ImageCollection.Front,
    state.ImageCollection.Rear,
    state.ImageCollection.Carpets,
    state.ImageCollection.Ceiling,
    state.ImageCollection.OrderId,
    state.ImageCollection.Cargo
  ]);

  useEffect(() => {
    getObject(OrderId);
  }, []);

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
          <TouchableOpacity
            onPress={() => {
              setState(prevState => ({
                ...prevState,
                modalVisible: {
                  PictureType: true,
                  SideName: SideName,
                },
              }));
            }}>
            <Image
              source={ImageUrl}
              style={[styles.imageStyle, { resizeMode: 'cover' }]}
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={{ uri: UpdatedImageUrl }}
            style={[styles.imageStyle, {
              marginVertical: 10, resizeMode: 'cover', width: '80%', alignSelf: 'center',
            }]}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            setState(prevState => ({
              ...prevState,
              modalVisible: {
                PictureType: true,
                SideName: SideName,
              },
            }));
          }}
          style={styles.contentstyle}>
          <Text style={styles.textStyle}>
            {' '}
            Take a picture of the{' '}
            <Text style={{ color: color.primary }}>{SideName}</Text>
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
        HeaderName={'Interior Photo'}
        OrderId={OrderId}
        Screen={'InteriorInspact'}
        InformationStatus={'Inspact'}
        Status={state.Status}
      />
      <ScrollView>
        <View style={styles.containerInner}>
          <ImageAdd
            SideName={state.ImageSideName.FrontSeat}
            Upload={state.ImageCollection.FrontUpload}
            ImageUrl={state.ImageUrl.UnalableImaeUrl}
            UpdatedImageUrl={state.ImageCollection.Front}
            IconName={state.IconCollection}
            getImage={getImage}
            deleteImage={deleteImage}
          />
          <ImageAdd
            SideName={state.ImageSideName.RearSeat}
            Upload={state.ImageCollection.RearUpload}
            ImageUrl={state.ImageUrl.UnalableImaeUrl}
            UpdatedImageUrl={state.ImageCollection.Rear}
            IconName={state.IconCollection}
            getImage={getImage}
            deleteImage={deleteImage}
          />
          <ImageAdd
            SideName={state.ImageSideName.Carpets}
            Upload={state.ImageCollection.CargoUpload}
            ImageUrl={state.ImageUrl.UnalableImaeUrl}
            UpdatedImageUrl={state.ImageCollection.Carpets}
            IconName={state.IconCollection}
            getImage={getImage}
            deleteImage={deleteImage}
          />
          <ImageAdd
            SideName={state.ImageSideName.Ceiling}
            Upload={state.ImageCollection.Ceiling}
            ImageUrl={state.ImageUrl.UnalableImaeUrl}
            UpdatedImageUrl={state.ImageCollection.Ceiling}
            IconName={state.IconCollection}
            getImage={getImage}
            deleteImage={deleteImage}
          />
          <ImageAdd
            SideName={state.ImageSideName.Cargo}
            Upload={state.ImageCollection.CargoUpload}
            ImageUrl={state.ImageUrl.UnalableImaeUrl}
            UpdatedImageUrl={state.ImageCollection.Cargo}
            IconName={state.IconCollection}
            getImage={getImage}
            deleteImage={deleteImage}
          />
        </View>
      </ScrollView>

      <Modal isVisible={state.modalVisible.PictureType}>
        <View style={styles.modal}>
          <View style={styles.modalInner}>
            <TouchableOpacity
              onPress={() => {
                getImage(state.modalVisible.SideName);
                setState(prevState => ({
                  ...prevState,
                  modalVisible: {
                    PictureType: false,
                  },
                }));
              }}>
              <Text style={styles.selectText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setState(prevState => ({
                  ...prevState,
                  modalVisible: {
                    PictureType: false,
                  },
                }));
              }}>
              <Text style={styles.selectText}>Photo Library</Text>
            </TouchableOpacity>
            <Text
              onPress={() => {
                setState(prevState => ({
                  ...prevState,
                  modalVisible: {
                    PictureType: false,
                  },
                }));
              }}
              style={styles.cancel}>
              Cancel
            </Text>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default Inspact;

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
    elevation: 1,
    marginBottom: 5,
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
    elevation: 1,
    borderWidth: 0.4,
    borderColor: color.gray,
    marginTop: Platform.isPad ? 20 : 15,
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
  modal: {
    width: '100%',
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    width: '100%',
    backgroundColor: color.white,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 5,
    padding: 20,
  },
  textDesign: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
    fontWeight: weight.medium,
    fontFamily: 'ITCAvantGardeStd-Demi',
    color: color.black,
  },
  selectText: {
    fontSize: Platform.isPad ? size.font10 : size.font12,
    fontWeight: weight.low,
    fontFamily: 'ITCAvantGardeStd-Bk',
    color: color.black,
    marginVertical: Platform.isPad ? 20 : 10,
    textTransform: 'uppercase',
    marginLeft: 10,
  },
  cancel: {
    fontSize: Platform.isPad ? size.font10 : size.font12,
    fontWeight: weight.low,
    fontFamily: 'ITCAvantGardeStd-Bk',
    color: color.primary,
    textAlign: 'right',
    textTransform: 'uppercase',
    marginTop: 10,
  },
});
