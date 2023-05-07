// React Native
import { Text, View, Pressable } from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

// Expo
import { requestPermissionsAsync, getAlbumAsync, getAssetsAsync } from 'expo-media-library';

// Components
import ProfileHeader from '../../Components/ProfileHeader';

// Styles
import { colors } from '../../Styles/colors';
import { HomeStyle } from '../../Styles/generic';

// Hooks
import useFirebase from '../../hooks/useFirebase';

// Lucide icons
import { Target, Globe, Mic, BarChart2 } from 'lucide-react-native';



export default () => {
    // Navigation
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    // Firebase info
    const { getUserInfo } = useFirebase();
    const [profileName, onChangeProfileName] = useState('Guest');
    const [nickname, onChangeNickname] = useState('No nickname');
    const [image, setImage] = useState<string | null>(null);


    // Get profile image and set it
    useFocusEffect(
        useCallback(() => {
            console.log("useFocusEffect");
            requestPermissionsAsync().then((result) => {
                if(result.granted) {
                    // console.log("Permission granted");
                    // console.log("username: " + getUserInfo().username);
                    getAlbumAsync('ProfileIcon' + getUserInfo().username).then((album) => {
                        if(album != null) {
                            getAssetsAsync({album: album}).then((assets) => {
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

    // Set profile name
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