import { Text, View, Pressable, TextInput, Keyboard  } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';

import { HomeStyle } from '../../Styles/generic';
import { colors } from '../../Styles/colors';

export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'LoginStack'>>()

    const [username, onChangeUsername] = useState('');
    const [usernameError, onChangeUsernameError] = useState('');

    const [password, onChangePassword] = useState('');
    const [passwordError, onChangePasswordError] = useState('');

    const validate = () => {
        Keyboard.dismiss();
        
        if(!username) {
            onChangeUsernameError('First name is required');
            return
        } else{
            onChangeUsernameError('');
        }

        if(!password) {
            onChangePasswordError('Password is required');
            return
        } else if (password.length < 8){
            onChangePasswordError('Password must be at least 8 characters');
            return
        } else{
            onChangePasswordError('');
        }

        navigate('MainDrawer')
    }


    return (
        <View style={HomeStyle.container}>
            <TextInput
                style={usernameError ? HomeStyle.textInputWrong : HomeStyle.textInput}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username"
                placeholderTextColor={colors.veryLightGrey}
            />
            <Text style={[HomeStyle.textInputErrorMessage,{height: usernameError ? 20 : 0}]}>
                {usernameError}
            </Text>
            <TextInput
                style={passwordError ? HomeStyle.textInputWrong : HomeStyle.textInput}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                placeholderTextColor={colors.veryLightGrey}
                secureTextEntry={true}
            />
            <Text style={[HomeStyle.textInputErrorMessage,{height: passwordError ? 20 : 0}]}>
                {passwordError}
            </Text>
            <Pressable style={HomeStyle.button1} onPress={validate}>
                <Text style={HomeStyle.buttonText} >LOGIN</Text>
            </Pressable>
            <Pressable onPress={() => {navigate('ForgotPassword')}}>
                <Text style={HomeStyle.text} >Forgot Password?</Text>
            </Pressable>
        </View>
    )
}