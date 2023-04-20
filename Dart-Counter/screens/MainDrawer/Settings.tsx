import { View, Text, Pressable } from "react-native"
import { HomeStyle } from "../../Styles/generic"
import { colors } from "../../Styles/colors"

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";

import SettingLine from "../../Components/SettingLine";


import { ChevronRight } from "lucide-react"
import { LogOut } from "lucide-react-native"
import useFirebase from "../../hooks/useFirebase";

export default () => {

    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'LoginStack'>>()

    const [profileName, onChangeProfileName] = useState('Guest');
    const [nickname, onChangeNickname] = useState('No nickname');

    const { getUserInfo, logout } = useFirebase();

    useEffect(() => {
        if(getUserInfo().username != "") onChangeProfileName(getUserInfo().username);
    }, [getUserInfo().username])

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