import { Text, View, Button, Pressable } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStyle } from '../../Styles/generic';

import { Image } from "react-native"

export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    return (
            <View style={HomeStyle.container2}>
                <Text style={HomeStyle.title}>Players</Text>

                <View style={HomeStyle.playersContainer}>
                    <View style={HomeStyle.player}>
                        <Image style={HomeStyle.playerIcon} source={require('../../assets/images/ProfileIcon.png')}/>
                        <Text style={HomeStyle.playerName}>Player 1</Text>
                    </View>

                    <View style={HomeStyle.player}>
                        <Image style={HomeStyle.playerIcon} source={require('../../assets/images/ProfileIcon.png')}/>
                        <Text style={HomeStyle.playerName}>Player 2</Text>
                    </View>
                </View>

                <Text style={HomeStyle.title}>Game settings</Text>

                <Pressable style={[HomeStyle.button4]} onPress={() => {navigate('Game');}}>
                    <Text style={HomeStyle.buttonText2}>Start Game</Text>
                </Pressable>
            </View>
    )
}