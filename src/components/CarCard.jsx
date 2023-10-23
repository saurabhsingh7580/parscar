import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, size, weight} from '../assets/theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const CarCard = ({side, image, localImage, getData, state}) => {
  console.log(localImage, side);
  const [selectedImage, setSelectedImage] = useState(null);

  const FrontImageHandle = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path, 'front ...................');
      AsyncStorage.setItem('front', image.path);
      setSelectedImage(image.path);
    });
  };

  const DriverImageHandle = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path, 'driver ...................');
      AsyncStorage.setItem('driver', image.path);
      setSelectedImage(image.path);
    });
  };

  const RearImageHandle = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path, 'rear ...................');
      AsyncStorage.setItem('rear', image.path);
      setSelectedImage(image.path);
    });
  };

  const PassengerImageHandle = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path, 'passenger ...................');
      AsyncStorage.setItem('passenger', image.path);
      setSelectedImage(image.path);
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{side}</Text>
        <Text
          style={[
            styles.text,
            {
              color: color.gray,
              marginRight: 10,
            },
          ]}>
          {(selectedImage || localImage) && 'Loaded'}
        </Text>
      </View>
      <TouchableOpacity style={styles.imageView}>
        {selectedImage ? (
          <Image source={{uri: selectedImage}} style={styles.image} />
        ) : (
          <>
            {localImage ? (
              <Image source={{uri: localImage}} style={styles.image} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (side === 'Front Side') {
                    FrontImageHandle();

                    return;
                  }
                  if (side === 'Driver Side') {
                    DriverImageHandle();
                    return;
                  }

                  if (side === 'Rear Side') {
                    RearImageHandle();
                    return;
                  }
                  if (side === 'Passenger Side') {
                    PassengerImageHandle();
                    return;
                  }
                }}>
                <Image source={image} style={styles.image} />
              </TouchableOpacity>
            )}
          </>
        )}
      </TouchableOpacity>

      {selectedImage || localImage ? (
        <View style={{marginTop: 10}} />
      ) : (
        <View style={styles.textStyle}>
          <Text style={styles.text}>
            Take a picture of the
            <Text style={{color: color.primary, textTransform: 'uppercase'}}>
              {' '}
              {side}
            </Text>
          </Text>
        </View>
      )}
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => {
            setSelectedImage(null);
            if (side === 'Front Side') {
              AsyncStorage.removeItem('front');
              state(null);
              return;
            }
            if (side === 'Driver Side') {
              AsyncStorage.removeItem('driver');
              state(null);
              return;
            }
            if (side === 'Rear Side') {
              AsyncStorage.removeItem('rear');
              state(null);
              return;
            }
            if (side === 'Passenger Side') {
              AsyncStorage.removeItem('passenger');
              state(null);
              return;
            }
          }}
          style={styles.button}>
          <Icon name="trash-outline" color={color.gray} size={size.font24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (side === 'Front Side') {
              FrontImageHandle();

              return;
            }
            if (side === 'Driver Side') {
              DriverImageHandle();
              return;
            }

            if (side === 'Rear Side') {
              RearImageHandle();
              return;
            }
            if (side === 'Passenger Side') {
              PassengerImageHandle();
              return;
            }
          }}
          style={styles.button}>
          <Icon name="camera-outline" color={color.gray} size={size.font28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 10,
  },
  header: {
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: color.secondary,
    flexDirection: 'row',
  },
  headerText: {
    color: color.primary,
    fontSize: Platform.isPad ? size.font12 : size.font16,
    fontWeight: weight.semibold,
    textTransform: 'uppercase',
    marginLeft: 20,
    marginTop: 10,
  },
  imageView: {},
  image: {
    width: '100%',
    resizeMode: 'contain',
    height: height / 3,
  },
  textStyle: {
    padding: 7,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 32,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  text: {
    color: color.black,
    fontSize: Platform.isPad ? size.font12 : size.font16,
    fontWeight: weight.medium,
    fontFamily: 'ITCAvantGardeStd-Demi',
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    borderWidth: 1,
    width: '50%',
    borderColor: color.gray,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
