import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { color } from '../assets/theme/theme';
import Assigned from '../screens/tab/Assigned';
import Available from '../screens/tab/Available';
import Resources from '../screens/tab/Resources';
import Archived from '../screens/tab/Archived';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Assigned"
      screenOptions={({ route }) => ({
        tabBarStyle: { paddingBottom: 5, height: 65 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Resources') {
            iconName = focused
              ? require('../assets//icons/resources.png')
              : require('../assets/icons/resources.png');
          } else if (route.name === 'Available') {
            iconName = focused
              ? require('../assets/icons/available.png')
              : require('../assets/icons/available.png');
          } else if (route.name === 'Assigned') {
            iconName = focused
              ? require('../assets/icons/assigned_2.png')
              : require('../assets/icons/assigned_2.png');
          }
          else if (route.name === 'Archived') {
            iconName = focused
              ? require('../assets/icons/assigned_2.png')
              : require('../assets/icons/assigned_2.png');
          }
          

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          );
        },
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.gray,
        headerShown: false
      })}>
      <Tab.Screen name="Resources" component={Resources} />
      <Tab.Screen name="Available" component={Available} />
      <Tab.Screen name="Assigned" component={Assigned} />
      <Tab.Screen name="Archived" component={Archived} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
