import { Text, View, Button, Pressable, Image } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import ProfileHeader from '../../Components/ProfileHeader';
import { HomeStyle } from '../../Styles/generic';

import { useEffect, useState } from 'react';
import useFirebase from '../../hooks/useFirebase';

import * as MediaLibrary from 'expo-media-library';


export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()
    
    const [profileName, onChangeProfileName] = useState('Guest');
    const [nickname, onChangeNickname] = useState('No nickname');

    const [image, setImage] = useState<string | null>(null);

    const { getUserInfo } = useFirebase();

    useEffect(() => {
        if(getUserInfo().username != "") onChangeProfileName(getUserInfo().username);

        MediaLibrary.requestPermissionsAsync().then((result) => {
            if(result.granted) {
                console.log("Permission granted");
                console.log("username: " + getUserInfo().username);
                MediaLibrary.getAlbumAsync('ProfileIcon' + getUserInfo().username).then((album) => {
                    if(album != null) {
                        MediaLibrary.getAssetsAsync({album: album}).then((assets) => {
                            if(assets != null) {
                                setImage(assets.assets[0].uri);
                            }
                        })
                    }
                })
            }
        })
    }, [getUserInfo().username])

    return (
        <View>
            <ProfileHeader profileName={profileName} nickname={nickname} image={image}/>

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

            <Pressable style={HomeStyle.bigButton} onPress={() => {navigate('Statistics')}}>
                <Text style={HomeStyle.bigButtonTitle}>View your statistics</Text>
                <Image style={HomeStyle.bigButtonIcon} source={require('../../assets/images/ProfileIcon.png')}/>
            </Pressable>
        </View>
    )
}