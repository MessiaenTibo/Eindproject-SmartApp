// React Native
import { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native"
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

// Expo
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { requestPermissionsAsync, getAlbumAsync, getAssetsAsync, createAlbumAsync , createAssetAsync, deleteAlbumsAsync } from 'expo-media-library';

// Styles
import { HomeStyle } from "../../Styles/generic"
import { colors } from "../../Styles/colors"

// Hooks
import useFirebase from "../../hooks/useFirebase";


export default () => {
    // Navigation
    const { setOptions } = useNavigation<StackNavigationProp<ParamListBase, 'MainDrawer'>>()

    // Firebase info
    const [profileName, onChangeProfileName] = useState('Guest');
    const [nickname, onChangeNickname] = useState('No nickname');
    const { getUserInfo } = useFirebase();

    // Get profile image
    useEffect(() => {
        if(getUserInfo().username != "") onChangeProfileName(getUserInfo().username);

        requestPermissionsAsync().then((result) => {
            if(result.granted) {
                console.log("Permission granted");
                console.log("username: " + getUserInfo().username);
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
    }, [getUserInfo().username])
    // Profile image
    const [image, setImage] = useState<string | null>(null);

    // Pick image from gallery
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const asset = await createAssetAsync(result.assets[0].uri);
            getAlbumAsync('ProfileIcon' + profileName).then((album) => {
                if(album != null) {
                    deleteAlbumsAsync(album.id, true);
                }
                createAlbumAsync('ProfileIcon' + profileName, asset, false);
            })
            //Show new image
            setImage(result.assets[0].uri);
        }
    };

    // Set header options on load
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