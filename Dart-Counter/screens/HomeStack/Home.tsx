import { Text, View, Button, Pressable } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import ProfileHeader from '../../Components/ProfileHeader';
import BigButton from '../../Components/BigButton';
import { HomeStyle } from '../../Styles/generic';

import { Image } from "react-native"

export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    return (
        <View>
            <ProfileHeader />

            <Pressable style={HomeStyle.bigButtonOrange} onPress={() => {navigate('NewGame')}}>
                <Text style={HomeStyle.bigButtonTitleWhite}>New game</Text>
                <Image style={HomeStyle.bigButtonIcon} source={require('../../assets/images/ProfileIcon.png')}/>
            </Pressable>

            <Pressable style={HomeStyle.bigButton} onPress={() => {navigate('')}}>
                <Text style={HomeStyle.bigButtonTitle}>Play online</Text>
                <Image style={HomeStyle.bigButtonIcon} source={require('../../assets/images/ProfileIcon.png')}/>
            </Pressable>

            <Pressable style={HomeStyle.bigButton} onPress={() => {navigate('')}}>
                <Text style={HomeStyle.bigButtonTitle}>Let our MasterCaller announce your name</Text>
                <Image style={HomeStyle.bigButtonIcon} source={require('../../assets/images/ProfileIcon.png')}/>
            </Pressable>

            <Pressable style={HomeStyle.bigButton} onPress={() => {navigate('')}}>
                <Text style={HomeStyle.bigButtonTitle}>View your statistics</Text>
                <Image style={HomeStyle.bigButtonIcon} source={require('../../assets/images/ProfileIcon.png')}/>
            </Pressable>
        </View>
    )
}