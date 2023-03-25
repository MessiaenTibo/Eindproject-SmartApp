import { Text, View, Button, Pressable, TextInput } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeStyle } from '../../Styles/generic';

import { useState } from 'react';


export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    const [firstName, onChangeFirstName] = useState('');
    const [lastName, onChangeLastName] = useState('');
    const [username, onChangeUsername] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    return (
        <View style={HomeStyle.container}>
            <TextInput
                style={HomeStyle.textInput}
                onChangeText={onChangeFirstName}
                value={firstName}
                placeholder="First name"
            />
            <TextInput
                style={HomeStyle.textInput}
                onChangeText={onChangeLastName}
                value={lastName}
                placeholder="last name"
            />
            <TextInput
                style={HomeStyle.textInput}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={HomeStyle.textInput}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
            />
            <TextInput
                style={HomeStyle.textInput}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
            />
            <Pressable style={HomeStyle.button1} onPress={() => {navigate('Home');}}>
                <Text style={HomeStyle.buttonText} >REGISTER</Text>
            </Pressable>
        </View>
    )
}