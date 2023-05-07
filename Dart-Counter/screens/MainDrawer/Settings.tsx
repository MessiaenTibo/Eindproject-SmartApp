// React Native
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native"
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

// Styles
import { HomeStyle } from "../../Styles/generic"
import { colors } from "../../Styles/colors"

// Hooks
import useFirebase from "../../hooks/useFirebase";


export default () => {
    // Navigation
    const { navigate, setOptions } = useNavigation<StackNavigationProp<ParamListBase, 'LoginStack'>>()

    // Profile info
    const [profileName, onChangeProfileName] = useState('Guest');
    const [nickname, onChangeNickname] = useState('No nickname');
    const { getUserInfo, logout } = useFirebase();

    // Set profile name on change of username
    useEffect(() => {
        if(getUserInfo().username != "") onChangeProfileName(getUserInfo().username);
    }, [getUserInfo().username])

    // Set header options on load
    useEffect(() => {
        setOptions({
            headerBackgroundContainerStyle: {
                backgroundColor: colors.darkGrey,
            },
            headerTintColor: colors.white,
            headerBackground: () => <View style={{backgroundColor: colors.darkGrey}} />,
            headerTitleStyle: {
                color: colors.white,
                alignContent: "center",
                alignSelf: "center",
                textAlign: "center",
            },
        })
    }, [])

    // Logout
    const Logout = () => {
        logout()
        navigate("Welcome")
    }


    return(
        <View style={HomeStyle.container}>
            <Pressable style={HomeStyle.settingsRow} onPress={Logout}>
                <Text style={[HomeStyle.settingsText,{color:colors.white}]}>{profileName == "Guest" ? "Login" : "Logout"}</Text>
                <Text style={[{color:colors.lightGrey},{marginRight: 30},{fontSize:24}]}>{'>'}</Text>
            </Pressable> 
            <View style={HomeStyle.line2} ></View>
        </View>
    )
}