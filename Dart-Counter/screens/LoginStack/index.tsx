// React Native
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';

// Drawer
import { MainDrawer } from '../MainDrawer';

// Stack
const Stack = createStackNavigator();

export function LoginStack() {

  return (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#ff4522',
            },
        }}
    >
        <Stack.Screen name="Welcome" component={Welcome} options={{title: 'Welcome', headerShown: false,}}/>
        <Stack.Screen name="Login" component={Login} options={{title: 'Login'}}/>
        <Stack.Screen name="Register" component={Register} options={{title: 'Register'}}/>
        <Stack.Screen name="MainDrawer" component={MainDrawer} options={{title: 'MainDrawer', headerShown: false,}}/>
    </Stack.Navigator>
  );
}