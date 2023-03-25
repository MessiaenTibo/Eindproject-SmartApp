import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import NewGame from './NewGame';
import Match from './Match';
import Game from './Game';


const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#ff4522',
            },
        }}
    >
        <Stack.Screen name="Welcome" component={Welcome} options={{title: 'Welcome', headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{title: 'Login'}}/>
        <Stack.Screen name="Register" component={Register} options={{title: 'Register'}}/>
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Stack.Screen name="NewGame" component={NewGame} options={{title: 'New Game'}}/>
        <Stack.Screen name="Match" component={Match} options={{title: 'Match'}}/>
        <Stack.Screen name="Game" component={Game} options={{title: 'Game'}}/>

    </Stack.Navigator>
  );
}