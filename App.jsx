import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { color } from './src/assets/theme/theme';
import AppNavigator from './src/navigation/AppNavigation';

const App = () => {
  return (
    <>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            height: Platform.isPad ? 25 : 60,
            backgroundColor: color.primary,
          }}>
          <StatusBar
            backgroundColor={'red'}
            hidden={false}
            barStyle={'light-content'}
          />
        </View>
      ) : (
        <StatusBar
          backgroundColor={color.primary}
          hidden={false}
          barStyle={'light-content'}
        />
      )}
      <AppNavigator />
    </>
  );
};
export default App;

// import React, {useState} from 'react';
// import {View, Text, Button} from 'react-native';

// const App = () => {
  // const [state, setState] = useState({
  //   vinCheckValue: {
  //     isScanValue: '',
  //     isColorValue: '',
  //   },
  // });

  // const updateState = () => {
  //   setState(prevState => ({
  //     ...prevState,
  //     vinCheckValue: {
  //       ...prevState.vinCheckValue,
  //       isScanValue: 'Updated from Example Component',
  //       isColorValue: 'Updated from Example red',
  //     },
  //   }));
  // };

//   return (
//     <View
//       style={{
//         flex: 1,
//       }}>
//       <Text
//         style={{
//           color: 'red',
//           marginTop: 200,
//         }}>
//         {state.vinCheckValue.isScanValue}
//         {state.vinCheckValue.isColorValue}
//       </Text>
//       <Button title="Update State" onPress={updateState} />
//     </View>
//   );
// };

// export default App;
