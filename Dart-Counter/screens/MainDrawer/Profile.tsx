import { View, Text, Image, Pressable } from "react-native"
import { HomeStyle } from "../../Styles/generic"
import { colors } from "../../Styles/colors"

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";

import useFirebase from "../../hooks/useFirebase";

import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default () => {

    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'MainDrawer'>>()

    const [profileName, onChangeProfileName] = useState('Guest');
    const [nickname, onChangeNickname] = useState('No nickname');

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

    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const asset = await MediaLibrary.createAssetAsync(result.assets[0].uri);
            MediaLibrary.getAlbumAsync('ProfileIcon' + profileName).then((album) => {
                if(album != null) {
                    MediaLibrary.deleteAlbumsAsync(album.id, true);
                }
                MediaLibrary.createAlbumAsync('ProfileIcon' + profileName, asset, false);
            })
            //Show new image
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        setOptions({
            headerBackgroundContainerStyle: {
                backgroundColor: colors.orange,
            },
            headerTintColor: colors.white,
            headerBackground: () => <View style={{backgroundColor: colors.darkGrey}} />,
            headerTitleStyle: {
                color: colors.white,
                alignContent: "center",
                alignSelf: "center",
                textAlign: "center",
            },
            headerTitleAlign: "center",
        })
    }, [])


    return(
        <View style={HomeStyle.profilecontainer}>
            <View style={HomeStyle.profileHeaderContainer}>
                <View style={HomeStyle.profileIconContainer}>
                    <Image style={HomeStyle.profileIcon} source={image == null ? require('../../assets/images/ProfileIcon.png') : {uri:image}}/>
                </View>
            </View>
            <Text style={HomeStyle.profileName}>{profileName}</Text>
            <Text style={HomeStyle.profileText}>{nickname}</Text>
            {profileName == "Guest" ? null :
            <View>
                <Pressable style={HomeStyle.button1}>
                    <Text style={HomeStyle.buttonText}>Basic</Text>
                </Pressable>
                <Pressable style={HomeStyle.button2} onPress={pickImage}>
                    <Text style={HomeStyle.buttonText}>Change profile picture</Text>
                </Pressable>
            </View>}
        </View>
    )
}