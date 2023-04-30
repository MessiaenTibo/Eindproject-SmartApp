import { Text, View, Button, Pressable, Image } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import ProfileHeader from '../../Components/ProfileHeader';
import { HomeStyle } from '../../Styles/generic';

import { useCallback, useEffect, useState } from 'react';
import useFirebase from '../../hooks/useFirebase';

import * as MediaLibrary from 'expo-media-library';

import { useFocusEffect } from '@react-navigation/native';

import { Target, Globe, Mic, BarChart2 } from 'lucide-react-native';

import { colors } from '../../Styles/colors';



export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()
    
    const [profileName, onChangeProfileName] = useState('Guest');
    const [nickname, onChangeNickname] = useState('No nickname');

    const [image, setImage] = useState<string | null>(null);

    const { getUserInfo } = useFirebase();




    useFocusEffect(
        useCallback(() => {
            console.log("useFocusEffect");
            MediaLibrary.requestPermissionsAsync().then((result) => {
                if(result.granted) {
                    // console.log("Permission granted");
                    // console.log("username: " + getUserInfo().username);
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
        }, [])
    );


    useEffect(() => {
        if(getUserInfo().username != "") onChangeProfileName(getUserInfo().username);
    }, [getUserInfo().username])

    return (
        <View>
            <ProfileHeader profileName={profileName} nickname={nickname} image={image}/>

            <Pressable style={HomeStyle.bigButtonOrange} onPress={() => {navigate('NewGame')}}>
                <Text style={HomeStyle.bigButtonTitleWhite}>New game</Text>
                <Target size={48} color={colors.white} />
            </Pressable>

            <Pressable style={HomeStyle.bigButton} onPress={() => {navigate('')}}>
                <Text style={HomeStyle.bigButtonTitle}>Play online</Text>
                <Globe size={48} color={colors.blue} />
            </Pressable>

            <Pressable style={HomeStyle.bigButton} onPress={() => {navigate('')}}>
                <Text style={HomeStyle.bigButtonTitle}>Let our MasterCaller announce your name</Text>
                <Mic size={48} color={colors.lightGrey} />
            </Pressable>

            <Pressable style={HomeStyle.bigButton} onPress={() => {navigate('Statistics')}}>
                <Text style={HomeStyle.bigButtonTitle}>View your statistics</Text>
                <BarChart2 size={48} color={colors.lightGrey} />
            </Pressable>
        </View>
    )
}