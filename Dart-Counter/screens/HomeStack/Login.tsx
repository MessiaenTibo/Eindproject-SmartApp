import { Text, View, Pressable, TextInput  } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';

import { HomeStyle } from '../../Styles/generic';

export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');

    return (
        <View style={HomeStyle.container}>
            <TextInput
                style={HomeStyle.textInput}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={HomeStyle.textInput}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
            />
            <Pressable style={HomeStyle.button1} onPress={() => {navigate('HOME');}}>
                <Text style={HomeStyle.buttonText} >LOGIN</Text>
            </Pressable>
            <Pressable onPress={() => {navigate('ForgotPassword');}}>
                <Text style={HomeStyle.text} >Forgot Password?</Text>
            </Pressable>
        </View>
    )
}