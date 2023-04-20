import { IconType } from "react-icons/lib"
import { Pressable, Text, View } from "react-native"
import { colors } from "../Styles/colors"
import { HomeStyle } from "../Styles/generic"

import { Image } from "react-native"

export default ({profileName, nickname, image}:{profileName:string, nickname:string, image:string|null}) => {
    return (
        <View style={HomeStyle.profileHeader}>
            <Image style={HomeStyle.profileIcon2} source={image == null ? require('../assets/images/ProfileIcon.png') : {uri:image}}/>
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