import { IconType } from "react-icons/lib"
import { Pressable, Text, View } from "react-native"
import { colors } from "../Styles/colors"
import { HomeStyle } from "../Styles/generic"

import { Image } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"

import { useNavigation, ParamListBase } from '@react-navigation/native';

export default ({title, navigation}:{title:string, navigation:void}) => {

    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()
    
    return (
        <Pressable style={HomeStyle.bigButton} onPress={() => {navigation}}>
            <Text style={HomeStyle.bigButtonTitle}>{title}</Text>
            <Image style={HomeStyle.bigButtonIcon} source={require('../assets/images/ProfileIcon.png')}/>
        </Pressable>
    )
}