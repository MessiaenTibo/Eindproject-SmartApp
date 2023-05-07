// React Native
import { useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Styles
import { HomeStyle } from '../../Styles/generic';

// Hooks
import useFirebase from '../../hooks/useFirebase';


export default () => {
    // Navigation
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase, 'LoginStack'>>()

    // Firebase
    const { checkIfLoggedIn } = useFirebase();

    // Check if the user is already logged-in in the cache
    useEffect(() => {
        checkIfLoggedIn().then((result) => {
            if(result) {
                navigate('MainDrawer');
            }
            console.log("result: " + result)
        })
    }, [])


    return (
        <View style={HomeStyle.container}>
            <Text style={HomeStyle.title}>Dart Counter</Text>
            <Pressable style={HomeStyle.button1} onPress={() => {navigate('Login');}}>
                <Text style={HomeStyle.buttonText} >LOGIN</Text>
            </Pressable>
            <Text style={HomeStyle.text}>Or</Text>
            <Pressable style={HomeStyle.button2} onPress={() => {navigate('Register');}}>
                <Text style={HomeStyle.buttonText} >CREATE ACCOUNT</Text>
            </Pressable>
            <View style={HomeStyle.line1} />
            <Pressable onPress={() => {navigate('MainDrawer')}}>
                <Text style={HomeStyle.buttonText} >CONTINUE AS GUEST</Text>
            </Pressable>
        </View>
    )
}
