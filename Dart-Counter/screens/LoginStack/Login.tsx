// React Native
import { useState } from 'react';
import { Text, View, Pressable, TextInput, Keyboard, Alert  } from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Styles
import { HomeStyle } from '../../Styles/generic';
import { colors } from '../../Styles/colors';

// Hooks
import useFirebase from '../../hooks/useFirebase';


export default () => {
    // Navigation
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase, 'LoginStack'>>()

    // Firebase
    const { login, resetPassword } = useFirebase();

    // States
    const [email, onChangeEmail] = useState('');
    const [emailError, onChangeEmailError] = useState('');
    const [password, onChangePassword] = useState('');
    const [passwordError, onChangePasswordError] = useState('');

    // Validate input
    const validate = () => {
        Keyboard.dismiss();
        
        if(!email) {
            onChangeEmailError('Email is required');
            return
        } else if (!email.includes('@') || !email.includes('.') || email.length < 5){
            onChangeEmailError('Email must be valid');
            return
        } else{
            onChangeEmailError('');
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

        // login
        const loginState = login(email, password);
        loginState.then((value) => {
            console.log(value)
            if(value == "success"){
                console.log("Logged in");
                navigate('MainDrawer')
            }
            else if(value == "auth/wrong-password"){
                console.log("Wrong password");
                onChangePasswordError('Wrong password');
            }
            else if(value == "auth/user-not-found" ){
                console.log("Invalid email");
                onChangeEmailError('Invalid email');
            }
            else{
                console.log("Unknown error");
                onChangeEmailError('Unknown error');
                onChangePasswordError('Unknown error');
            }
        })
    }

    // Forgot password
    const forgotPassword = () => {
        if(!email) {
            onChangeEmailError('Email is required');
            return
        } else if (!email.includes('@') || !email.includes('.') || email.length < 5){
            onChangeEmailError('Email must be valid');
            return
        } else {
            onChangeEmailError('');
            // const response = await resetPassword(email);
            // if(response == "success"){
            //     console.log("Reset password email sent");
            //     Alert.alert("Reset password","Reset password email sent!");
            // }
            // else if(response == "auth/user-not-found"){
            //     console.log("Invalid email");
            //     onChangeEmailError('Invalid email');
            // }
            // else{
            //     console.log("Unknown error");
            //     onChangeEmailError('Unknown error');
            // }
            resetPassword(email).then((value) => {
                if(value == "success"){
                    console.log("Reset password email sent");
                    Alert.alert("Reset password","A reset password email has been sent to your email. Please check your inbox! This may take a few minutes. If you don't receive an email, please check your spam folder.");
                }
                else if(value == "auth/user-not-found"){
                    console.log("Invalid email");
                    onChangeEmailError('Invalid email');
                }
                else{
                    console.log("Unknown error");
                    onChangeEmailError('Unknown error');
                }
            })
        }
    }


    return (
        <View style={HomeStyle.container}>
            <TextInput
                style={emailError ? HomeStyle.textInputWrong : HomeStyle.textInput}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
                placeholderTextColor={colors.veryLightGrey}
                keyboardType='email-address'
                autoComplete='email'
            />
            <Text style={[HomeStyle.textInputErrorMessage,{height: emailError ? 20 : 0}]}>
                {emailError}
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
            <Pressable onPress={forgotPassword}>
                <Text style={HomeStyle.text} >Forgot Password?</Text>
            </Pressable>
        </View>
    )
}