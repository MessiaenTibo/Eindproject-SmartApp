import { IconType } from "react-icons/lib"
import { Pressable, Text, View } from "react-native"
import { colors } from "../Styles/colors"
import { HomeStyle } from "../Styles/generic"

import { Image } from "react-native"

export default () => {
    return (
        <View style={HomeStyle.profileHeader}>
            <Image style={HomeStyle.profileIcon} source={require('../assets/images/ProfileIcon.png')}/>
            <View style={HomeStyle.profileInfoContainer}>
                <Text style={HomeStyle.profileName}>Guest</Text>
                <Text style={HomeStyle.profileText}>No nickname</Text>
                <Pressable style={HomeStyle.profileButton}>
                    <Text style={HomeStyle.profileButtonText}>Upgrade</Text>
                </Pressable>
            </View>
        </View>
    )
}