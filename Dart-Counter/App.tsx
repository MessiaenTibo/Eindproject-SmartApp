// React Native
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

// Expo
import { StatusBar } from 'expo-status-bar';

// Stacks
import { MainDrawer } from './screens/MainDrawer';
import { LoginStack } from './screens/LoginStack';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <LoginStack/>
    </NavigationContainer>
  );
}
