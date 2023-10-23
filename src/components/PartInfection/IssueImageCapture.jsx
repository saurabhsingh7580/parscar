import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {color, size, weight} from '../../assets/theme/theme';
import Modal from 'react-native-modal';

const IssueImageCapture = ({pictureCount, getCountValue, imageUrl}) => {
  const [state, setState] = useState({
    modalVisible: {
      PictureType: false,
    },
  });
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.text}>Picture #{pictureCount}</Text>
          <TouchableOpacity
            onPress={() => {
              setState(prevState => ({
                ...prevState,
                modalVisible: {
                  PictureType: true,
                },
              }));
            }}
            style={styles.docStyle}>
            <Image
              source={require('../../assets/icons/action.png')}
              style={styles.actionIconStyle}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            setState(prevState => ({
              ...prevState,
              modalVisible: {
                PictureType: true,
              },
            }));
          }}
          style={styles.imageView}>
          {imageUrl ? (
            <Image
              source={{uri: imageUrl}}
              style={[
                styles.image,
                {resizeMode: 'stretch', width: '90%', marginVertical: 10},
              ]}
            />
          ) : (
            <Image
              source={require('../../assets/icons/no_photo.png')}
              style={styles.image}
            />
          )}
          <TouchableOpacity style={styles.pictureView}>
            <Text>
              Take a picture of the{' '}
              <Text style={{color: color.primary}}>
                PICTURE #{pictureCount}
              </Text>
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <Modal isVisible={state.modalVisible.PictureType}>
        <View style={styles.modal}>
          <View style={styles.modalInner}>
            <TouchableOpacity
              onPress={() => {
                getCountValue(pictureCount);
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
              <Text style={styles.selectText}>Remove Photo</Text>
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
    </>
  );
};

export default IssueImageCapture;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: color.white,
    elevation: 4,
    height: 380,
    marginVertical: 5,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  actionIconStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  text: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
    color: color.black,
    fontFamily: 'ITCAvantGardeStd-Bk',
  },
  imageView: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: color.secondary,
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 260,
    resizeMode: 'stretch',
  },
  pictureView: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: color.white,
    borderRadius: 32,
  },
  pictureText: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
  },
  docStyle: {
    backgroundColor: color.lightGray,
    paddingVertical: 5,
  },
  modal: {
    width: '100%',
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    width: '90%',
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
