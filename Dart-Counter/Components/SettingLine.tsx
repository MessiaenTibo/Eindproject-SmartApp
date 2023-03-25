import { IconType } from "react-icons/lib"
import { Pressable, Text, View } from "react-native"
import { colors } from "../Styles/colors"
import { HomeStyle } from "../Styles/generic"


export default ({title,titleColor = colors.white, icon}:{title:string, titleColor?:string, icon?:string}) => {
    return (
        <>
            <Pressable style={HomeStyle.settingsRow}>
                <Text style={[HomeStyle.settingsText,{color:titleColor}]}>{title}</Text>
                <Text style={[{color:colors.lightGrey},{marginRight: 30},{fontSize:24},title=='Logout' && {color: colors.gold}]}>{'>'}</Text>
            </Pressable> 

            <View style={HomeStyle.line2} ></View>
        </>
    )
}






