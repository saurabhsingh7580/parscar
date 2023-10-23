import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React from 'react';
import {color, size, weight} from '../assets/theme/theme';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const BackHeader = ({title, subTitle, unique, screen, check}) => {
  const navigation = useNavigation();

  console.log(check, 'check*************');
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <TouchableOpacity onPress={handleBack} style={styles.backStyle}>
          <Icon
            name="arrow-back-outline"
            size={Platform.isPad ? size.font18 : size.font24}
            color={color.white}
          />
          <View style={styles.titleStyle}>
            <Text style={styles.text}>{title}</Text>
            {subTitle === '' ? null : (
              <Text style={styles.subText}>{subTitle}</Text>
            )}
          </View>
        </TouchableOpacity>
        {unique ? (
          <TouchableOpacity
            disabled={check === 'done' ? false : true}
            onPress={() => {
              navigation.navigate(screen, {OrderId: subTitle});
            }}>
            <Text
              style={[
                styles.inspectText,
                {
                  opacity: check === 'done' ? 1 : 0.5,
                },
              ]}>
              {unique}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: color.primary,
    justifyContent: 'center',
    paddingHorizontal: Platform.isPad ? 25 : 20,
    paddingVertical: Platform.isPad ? 17 : 10,
  },
  containerInner: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    color: color.white,
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.medium,
    textTransform: 'capitalize',
    fontFamily: 'ITCAvantGardeStd-Bk',
    marginLeft: 5,
  },
  titleStyle: {
    // alignItems: 'center',
    marginLeft: 20,
  },

  text: {
    color: color.white,
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.medium,
    // textTransform: 'uppercase',
    fontFamily: 'ITCAvantGardeStd-Bk',
  },
  subText: {
    color: color.white,
    fontSize: Platform.isPad ? size.font10 : size.font12,
    fontWeight: weight.low,
    textTransform: 'uppercase',
    fontFamily: 'ITCAvantGardeStd-Bk',
    opacity: 0.8,
    paddingTop: Platform.isPad ? 5 : 2,
  },
  inspectText: {
    color: color.white,
    fontSize: Platform.isPad ? size.font10 : size.font14,
    fontWeight: weight.low,
    textTransform: 'capitalize',
    fontFamily: 'ITCAvantGardeStd-Bk',
    opacity: 0.5,
  },
});
