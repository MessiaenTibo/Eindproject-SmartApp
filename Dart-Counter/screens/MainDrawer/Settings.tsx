import { View, Text, Pressable } from "react-native"
import { HomeStyle } from "../../Styles/generic"
import { colors } from "../../Styles/colors"

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";

import SettingLine from "../../Components/SettingLine";


import { ChevronRight } from "lucide-react"
import { LogOut } from "lucide-react-native"

export default () => {

    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'MainDrawer'>>()

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

    return(
        <View style={HomeStyle.container}>
            <SettingLine title="Account" />
            <SettingLine title="Languages" />
            <SettingLine title="Game settings" />
            <SettingLine title="Blocked players" />
            <SettingLine title="Reset statistics" />
            <SettingLine title="Terms of Use" />
            <SettingLine title="Privacy policy" />
            <SettingLine title="Logout" titleColor={colors.gold} icon='logout'/>
        </View>
    )
}