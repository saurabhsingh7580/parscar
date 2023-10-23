import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import {color} from '../../assets/theme/theme';
const {width, height} = Dimensions.get('window');

const Resources = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header header="Resources" />
    </SafeAreaView>
  );
};

export default Resources;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: color.theme,
  },
});
