import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { color, size, weight } from '../../assets/theme/theme';
import BackHeader from '../BackHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import IssueImageCapture from './IssueImageCapture';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IssueDetail = props => {
  const { OrderId, qty } = props.route.params;
  console.log(qty, 'qty');
  const [state, setState] = useState({
    visible: false,
    check: '',
    issue: {
      typeData: '',
      picture1: '',
      picture2: '',
      picture3: '',
      qty: '',
    },
  });

  const getPicture = value => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (value === '1') {
        setState(prevState => ({
          ...prevState,
          issue: {
            ...prevState.issue,
            picture1: image.path,
            qty: qty,
          },
        }));
        return;
      }
      if (value === '2') {
        setState(prevState => ({
          ...prevState,
          issue: {
            ...prevState.issue,
            picture2: image.path,
            qty: qty,
          },
        }));
        return;
      }
      if (value === '3') {
        setState(prevState => ({
          ...prevState,
          issue: {
            ...prevState.issue,
            picture3: image.path,
            qty: qty,
          },
        }));
        return;
      }
    });
  };

  const getCountValue = value => {
    getPicture(value);
  };

  const saveDataToAsyncStorage = async data => {
    console.log(data, 'data');
    try {
      await AsyncStorage.setItem('issueReportStore', JSON.stringify(data));
      console.log('Data saved successfully');
    } catch (error) {
      console.log('Error saving data: ', error);
    }
  };

  useEffect(() => {
    if (state.issue.typeData) {
      saveDataToAsyncStorage(state.issue);
      return;
    }
    if (state.issue.picture1) {
      saveDataToAsyncStorage(state.issue);
      return;
    }
    if (state.issue.picture2) {
      saveDataToAsyncStorage(state.issue);
      return;
    }
    if (state.issue.picture3) {
      saveDataToAsyncStorage(state.issue);
      return;
    }
  }, [state]);

  const loadDataFromAsyncStorage = async () => {
    try {
      const savedData = await AsyncStorage.getItem('issueReportStore');
      if (savedData !== null) {
        const parsedData = JSON.parse(savedData);
        console.log('Data loaded successfully:', parsedData);
        if (qty === parsedData.qty) {
          setState(prevState => ({
            ...prevState,
            issue: {
              ...prevState.issue,
              typeData: parsedData.typeData,
              picture1: parsedData.picture1,
              picture2: parsedData.picture2,
              picture3: parsedData.picture3,
            },
          }));
        }
      }
    } catch (error) {
      console.log('Error loading data: ', error);
    }
  };

  useEffect(() => {
    loadDataFromAsyncStorage();
  }, []);

  const isCheck = () => {
    if (
      state.issue.typeData &&
      (state.issue.picture1 || state.issue.picture2 || state.issue.picture3)
    ) {
      setState(prevState => ({
        ...prevState,
        check: 'done',
      }));
      return;
    }
  };

  useEffect(() => {
    isCheck();
  }, [
    state.check,
    state.issue.picture1,
    state.issue.picture2,
    state.issue.picture3,
  ]);

  console.log(state.issue, '********** issue **************');

  const issueType = [
    'Bent',
    'Broken',
    'Cut',
    'Cracked',
    'Dented',
    'Dented',
    'Ding',
    'Faded',
    'Gouged',
    'Loose',
    'Missing',
    'Pitted',
    'Paint',
    'Paint Chip',
    'Rubbed',
    'Rust',
    'Scratched',
    'Surface Scratch',
    'Stained',
    'Torn',
  ];
  return (
    <View style={styles.container}>
      <>
        {state.visible === false ? (
          <BackHeader
            title="New Issue"
            subTitle={OrderId}
            unique="Save"
            check={state.check}
            screen="Front"
            Status={state.issue.picture1}

          />
        ) : (
          <View style={styles.header}>
            <View style={styles.headerStyle}>
              <Icon
                name="arrow-back-outline"
                size={Platform.isPad ? size.font18 : size.font24}
                color={color.white}
                onPress={() => {
                  setState(prevState => ({
                    ...prevState,
                    visible: false,
                  }));
                }}
              />
              <Text
                style={{
                  fontSize: Platform.isPad ? size.font12 : size.font14,
                  color: color.white,
                  fontFamily: 'ITCAvantGardeStd-Bk',
                  marginLeft: 20,
                  fontWeight: weight.semibold,
                }}>
                Issue Type
              </Text>
            </View>
          </View>
        )}
      </>
      <ScrollView>
        {state.visible === false ? (
          <View style={styles.body}>
            <TouchableOpacity
              onPress={() => {
                setState(prevState => ({
                  ...prevState,
                  visible: true,
                }));
              }}
              style={styles.typeBox}>
              <View style={styles.typeInnerBox}>
                <Text style={styles.text}>Type (Required)</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={[
                      styles.text,
                      { marginRight: 10, color: color.primary },
                    ]}>
                    {state.issue.typeData}
                  </Text>
                  <Image
                    source={require('../../assets/icons/arrow.png')}
                    style={styles.arrowStyle}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.typeBox}>
              <View style={styles.description}>
                <Text
                  style={[styles.text, { marginRight: 10, color: color.gray }]}>
                  Description
                </Text>
                <TextInput placeholder="" style={styles.des} />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <IssueImageCapture
                pictureCount="1"
                getCountValue={getCountValue}
                imageUrl={state.issue.picture1}
              />
              <IssueImageCapture
                pictureCount="2"
                getCountValue={getCountValue}
                imageUrl={state.issue.picture2}
              />
              <IssueImageCapture
                pictureCount="3"
                getCountValue={getCountValue}
                imageUrl={state.issue.picture3}
              />
            </View>
          </View>
        ) : (
          <View style={styles.body}>
            <View style={styles.searchBox}>
              <TextInput placeholder="Search" style={styles.search} />
              {issueType.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setState(prevState => ({
                        ...prevState,
                        issue: {
                          ...prevState.issue,
                          typeData: item,
                          qty: qty,
                        },
                        visible: false,
                      }));
                    }}
                    style={styles.typeValue}>
                    <Text style={styles.typeText}>{item}</Text>
                    {state.typeData ? (
                      <Image
                        source={require('../../assets/icons/done.png')}
                        style={styles.arrowStyle}
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default IssueDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  body: {
    width: '100%',
    alignSelf: 'center',
  },
  typeBox: {
    width: '100%',
    backgroundColor: color.white,
    paddingVertical: 10,
  },
  typeInnerBox: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    height: 50,
    borderColor: color.gray,
  },
  text: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
    color: color.black,
    fontFamily: 'ITCAvantGardeStd-Bk',
  },
  arrowStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: color.black,
  },
  header: {
    height: 50,
    backgroundColor: color.primary,
  },
  headerStyle: {
    height: 50,
    backgroundColor: color.primary,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
  },
  searchBox: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  search: {
    borderBottomWidth: 0.5,
    borderColor: color.gray,
    fontSize: Platform.isPad ? size.font12 : size.font14,
    color: color.black,
    fontFamily: 'ITCAvantGardeStd-Bk',
    height: 40,
  },
  typeValue: {
    height: 55,
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: color.gray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
    color: color.black,
    fontFamily: 'ITCAvantGardeStd-Bk',
  },
  description: {
    width: '90%',
    alignSelf: 'center',
  },
  des: {
    fontSize: Platform.isPad ? size.font12 : size.font14,
    color: color.black,
    fontFamily: 'ITCAvantGardeStd-Bk',
    height: 40,
  },
});
