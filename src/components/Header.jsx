import React from 'react';
import { View, Text, StyleSheet, Platform, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { color, size } from '../assets/theme/theme';

const Header = ({ header }) => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="menu" color={color.white} size={Platform.isPad?size.font18:size.font24} onPress={() => navigation.openDrawer()} />
        <Text style={styles.title}>{header}</Text>
        <Text style={styles.title} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: color.primary,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Platform.isPad ? 40 : 20,
    paddingVertical: Platform.isPad? 17 : 8,
  },
  title: {
    color: 'white',
    fontSize:Platform.isPad?size.font12:size.font16,
    marginLeft:20
  },
});

export default Header;
