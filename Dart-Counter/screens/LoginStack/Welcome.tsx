import { Text, View, Button, Pressable } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeStyle } from '../../Styles/generic';



export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'LoginStack'>>()


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
            <View style={HomeStyle.line} />
            <Pressable onPress={() => {navigate('MainDrawer')}}>
                <Text style={HomeStyle.buttonText} >CONTINUE AS GUEST</Text>
            </Pressable>
        </View>
    )
}
