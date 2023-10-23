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
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, size } from '../assets/theme/theme';
import BackHeader from './BackHeader';
import { state } from '../assets/stateName';
import { useNavigation } from '@react-navigation/native';

const States = (props) => {
  const navigation = useNavigation()
  const [stateName, setStateName] = useState(null);
  const { name } = props.route.params;
  useEffect(() => {
    if (name) {
      setStateName(name)
    }
  }, [name]);
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="State" />
      <ScrollView>
      <View style={styles.containerInner}>
        <View>
          <TextInput
            placeholder="Search"
            style={styles.input}
            placeholderTextColor={color.gray}
          />
        </View>
        <View>
          {state.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setStateName(item.value);
                  navigation.navigate('VINCheck', { stateName: item.value })
                }}
                style={styles.typeValue}>
                <Text style={styles.typeText}>{item.value}</Text>
                {stateName === item.value ? (
                  <Image
                    source={require('../assets/icons/done.png')}
                    style={styles.arrowStyle}
                  />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default States;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  containerInner: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: color.gray,
    color: color.black,
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
  arrowStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: color.black,
  },
});
