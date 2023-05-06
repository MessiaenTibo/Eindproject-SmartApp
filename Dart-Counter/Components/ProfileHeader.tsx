import { IconType } from "react-icons/lib"
import { Pressable, Text, View } from "react-native"
import { colors } from "../Styles/colors"
import { HomeStyle } from "../Styles/generic"


import { Image } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation, ParamListBase } from '@react-navigation/native';

export default ({profileName, nickname, image}:{profileName:string, nickname:string, image:string|null}) => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    return (
        <View style={HomeStyle.profileHeader}>
            <Pressable onPress={() => navigate('Profile')}>
                <Image style={HomeStyle.profileIcon2} source={image == null ? require('../assets/images/ProfileIcon.png') : {uri:image}}/>
            </Pressable>
            <View style={HomeStyle.profileInfoContainer}>
                <Text style={HomeStyle.profileName2}>{profileName}</Text>
                <Text style={HomeStyle.profileText2}>{nickname}</Text>
                <Pressable style={HomeStyle.profileButton2}>
                    <Text style={HomeStyle.profileButtonText2}>Upgrade</Text>
                </Pressable>
            </View>
        </View>
    )
}
