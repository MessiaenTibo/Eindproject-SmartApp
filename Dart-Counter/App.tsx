
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text} from 'react-native';
import 'react-native-gesture-handler';
import { MainDrawer } from './screens/MainDrawer';
import { LoginStack } from './screens/LoginStack';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar style="auto" />
//       <MainDrawer/>
//     </NavigationContainer>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <LoginStack/>
    </NavigationContainer>
  );
}
