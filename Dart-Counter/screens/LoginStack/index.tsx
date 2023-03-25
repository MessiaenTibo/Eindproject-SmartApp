import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';


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
    </Stack.Navigator>
  );
}