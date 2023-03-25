import { Text, View, Button, Pressable, TextInput } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StyleSheet } from 'react-native';
import { useState } from 'react';


export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    const [firstName, onChangeFirstName] = useState('');
    const [lastName, onChangeLastName] = useState('');
    const [username, onChangeUsername] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeFirstName}
                value={firstName}
                placeholder="First name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeLastName}
                value={lastName}
                placeholder="last name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
            />
            <Pressable style={styles.button} onPress={() => {navigate('HOME');}}>
                <Text style={styles.buttonText} >REGISTER</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input:{
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button:{
        backgroundColor: '#ff4522',
        width: '100%',
    },
    buttonText:{
        color: 'white',
    }
});