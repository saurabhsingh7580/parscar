import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '../screens/pages/Signin';
import Splash from '../screens/pages/Splash';
import DrawerNavigation from './DrawerNavigation';
// import Exterior from '../screens/pages/Exterior';
import DrawerNavigator from './DrawerNavigator';
// import VINCheck from '../components/VINCheck';
import Status from '../components/States';
import Insurance from '../screens/drawers/Insurance';
import PickupReport from '../screens/drawers/PickupReport';
import Schedule from '../components/Schedule';
// import Front from '../components/PartInfection/Front';
import Front from '../pickup/exterior/Front';
import IssueDetail from '../components/PartInfection/IssueDetail';
// import Interior from '../screens/pages/Interior';
import InteriorPhoto from '../components/PartInfection/InteriorPhoto';
import DriverSide from '../components/PartInfection/DriveSide';
import Passenger from '../components/PartInfection/Passenger';
import Rear from '../components/PartInfection/Rear';
import Top from '../components/PartInfection/Top';
// import InteriorInspact from '../components/PartInfection/InteriorInspact';
import SelectInspactIssue from '../components/PartInfection/SelectInspactIssue';
// import Accessories from '../screens/pages/Accessories';
import IssueList from '../pickup/IssueList';
import Sign from '../pickup/Sign';
import Signature from '../pickup/Signature';
import AddNote from '../screens/drawers/AddNote';
import Exterior from '../pickup/exterior/Exterior';
// pickup report 
import VINCheck from '../pickup/VinCheck';
import Interior from '../pickup/interior/Interior';
import Inspact from '../pickup/interior/Inspact';
import InteriorInspact from '../pickup/interior/InteriorInspact';
import Accessories from '../pickup/Accessories';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen name="Insurance" component={Insurance} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        {/* <Stack.Screen name="Exterior" component={Exterior} /> */}
        <Stack.Screen name="PickupReport" component={PickupReport} />
        {/* <Stack.Screen name="VINCheck" component={VINCheck} /> */}
        <Stack.Screen name="Status" component={Status} />
        <Stack.Screen name="Schedule" component={Schedule} />
        {/* <Stack.Screen name="Front" component={Front} /> */}
        <Stack.Screen name="DriverSide" component={DriverSide} />
        <Stack.Screen name="Rear" component={Rear} />
        <Stack.Screen name="Passenger" component={Passenger} />
        <Stack.Screen name="Top" component={Top} />
        <Stack.Screen name="IssueDetail" component={IssueDetail} />
        {/* <Stack.Screen name="Interior" component={Interior} /> */}
        <Stack.Screen name="InteriorPhoto" component={InteriorPhoto} />
        {/* <Stack.Screen name="InteriorInspact" component={InteriorInspact} /> */}
        <Stack.Screen name="SelectInspactIssue" component={SelectInspactIssue} />
        {/* <Stack.Screen name="Accessories" component={Accessories} /> */}
        {/* <Stack.Screen name="Sign" component={Sign} /> */}
        <Stack.Screen name="AddNote" component={AddNote} />

        {/* new pickup stack */}
        <Stack.Screen name="VINCheck" component={VINCheck} />
        <Stack.Screen name="Exterior" component={Exterior} />
        <Stack.Screen name="Front" component={Front} />

        {/* Interior */}
        <Stack.Screen name="Interior" component={Interior} />
        <Stack.Screen name="Inspact" component={Inspact} />
        <Stack.Screen name="InteriorInspact" component={InteriorInspact} />
        <Stack.Screen name="Accessories" component={Accessories} />


        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="Signature" component={Signature} />
        <Stack.Screen name="IssueList" component={IssueList} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
