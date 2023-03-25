import { View, Text, Pressable } from "react-native"
import { HomeStyle } from "../../Styles/generic"
import { colors } from "../../Styles/colors"

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";

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
            <Pressable style={{flexDirection: "row"}}>
                <Text>Account</Text>
                <Text>{'>'}</Text>
            </Pressable>

            <View style={HomeStyle.line} ></View>
        </View>
    )
}