// React Native
import { useState } from 'react';
import { Text, View, Pressable, TextInput, Keyboard } from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Styles
import { HomeStyle } from '../../Styles/generic';
import { colors } from '../../Styles/colors';

// Hooks
import useFirebase from '../../hooks/useFirebase';


export default () => {
    // Navigation
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    // Firebase
    const { register } = useFirebase();

    // States
    // First name
    const [firstName, onChangeFirstName] = useState('');
    const [firstNameError, onChangeFirstNameError] = useState('');
    // Last name
    const [lastName, onChangeLastName] = useState('');
    const [lastNameError, onChangeLastNameError] = useState('');
    // Username
    const [username, onChangeUsername] = useState('');
    const [usernameError, onChangeUsernameError] = useState('');
    // Email
    const [email, onChangeEmail] = useState('');
    const [emailError, onChangeEmailError] = useState('');
    // Password
    const [password, onChangePassword] = useState('');
    const [passwordError, onChangePasswordError] = useState('');

    // Validate input
    const validate = () => {
        Keyboard.dismiss();

        if(!firstName) {
            onChangeFirstNameError('First name is required');
            return
        } else{
            onChangeFirstNameError('');
        }

        if(!lastName) {
            onChangeLastNameError('Last name is required');
            return
        } else{
            onChangeLastNameError('');
        }

        if(!username) {
            onChangeUsernameError('Username is required');
            return
        } else{
            onChangeUsernameError('');
        }

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

        //create account
        const registerState = register(username, email, password);
        
        registerState.then(({errorCode, errorMessage}) => {
            if(errorCode == "success") navigate('Login');
            else if(errorCode == "auth/email-already-in-use") onChangeEmailError(errorMessage);
            else if(errorCode == "auth/invalid-email") onChangeEmailError(errorMessage);
            else if(errorCode == "auth/operation-not-allowed") onChangeEmailError(errorMessage);
            else if(errorCode == "auth/weak-password") onChangePasswordError(errorMessage);
        })
    
    };
    

    return (
        <View style={HomeStyle.container}>
            <TextInput
                style={firstNameError ? HomeStyle.textInputWrong : HomeStyle.textInput}
                onChangeText={onChangeFirstName}
                value={firstName}
                placeholder="First name"
                placeholderTextColor={colors.veryLightGrey}
                autoComplete='name'
            />
            <Text style={[HomeStyle.textInputErrorMessage,{height: firstNameError ? 20 : 0}]}>
                {firstNameError}
            </Text>
            <TextInput
                style={HomeStyle.textInput}
                onChangeText={onChangeLastName}
                value={lastName}
                placeholder="last name"
                placeholderTextColor={colors.veryLightGrey}
            />
            <Text style={[HomeStyle.textInputErrorMessage,{height: lastNameError ? 20 : 0}]}>
                {lastNameError}
            </Text>
            <TextInput
                style={HomeStyle.textInput}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username"
                placeholderTextColor={colors.veryLightGrey}
                autoComplete="username"
            />
            <Text style={[HomeStyle.textInputErrorMessage,{height: usernameError ? 20 : 0}]}>
                {usernameError}
            </Text>
            <TextInput
                style={HomeStyle.textInput}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
                placeholderTextColor={colors.veryLightGrey}
                keyboardType='email-address'
                autoComplete="email"
            />
            <Text style={[HomeStyle.textInputErrorMessage,{height: emailError ? 20 : 0}]}>
                {emailError}
            </Text>
            <TextInput
                style={HomeStyle.textInput}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor={colors.veryLightGrey}
            />
            <Text style={[HomeStyle.textInputErrorMessage,{height: passwordError ? 20 : 0}]}>
                {passwordError}
            </Text>
            <Pressable style={HomeStyle.button1} onPress={validate}>
                <Text style={HomeStyle.buttonText} >REGISTER</Text>
            </Pressable>
        </View>
    )
}