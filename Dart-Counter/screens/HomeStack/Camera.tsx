import { Image, Alert, Pressable, Text, StyleSheet, View, Dimensions, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { Camera, CameraCapturedPicture, CameraType, FlashMode } from 'expo-camera';
import { HomeStyle } from '../../Styles/generic';

import { Camera as CameraIcon, SwitchCamera, Zap, ZapOff } from 'lucide-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library'

export default function CameraEx() {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()
    
    const [type, setType] = useState(CameraType.back);
    const [flash, setFlash] = useState(FlashMode.off);
    const [photo, setPhoto] = useState<CameraCapturedPicture>();
    let [hasPermission, setHasPermission] = useState<any | null>(null);

    let camera: Camera | null  =  null;

    // const [permission, requestPermission] = Camera.useCameraPermissions();
    useEffect(() => {
        Camera.requestCameraPermissionsAsync().then(Permissions => { console.log("Permissions", Permissions) })
        // if (!permission) ...
    }, []);
    // if (!permission.granted) ...

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    function toggleFlashlight() {
        setFlash(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
    }

    function takePicture() {
        console.log("Take picture");
        let options = {
            quality: 1,
            base64: true,
            exif: true,
            // skipProcessing must be true or the image will be rotated incorrectly
            skipProcessing: true,
        }
        if (camera) {
            camera.takePictureAsync(options).then(photo => {
                console.log("Photo", photo.uri);
                setPhoto(photo);
            });
        }
    }

    const cancel = () => {
        setPhoto(undefined);
    }

    const save = () => {
        Alert.alert("Save", "Save photo?", [
            {
                text: "Yes", onPress: () => {
                    console.log("Save photo");
                    if(photo) savePhoto(photo.uri);
                    setPhoto(undefined);
                    goBack();
                }
            },
            {   
                text: "No", onPress: () => {
                    console.log("Don't save photo");setPhoto(undefined);
                }
            }
        ])
    }

    const savePhoto = async(photo:string) =>{
        if(!hasPermission){
            hasPermission = await MediaLibrary.requestPermissionsAsync();
            setHasPermission(hasPermission);
        }
        if(hasPermission.status === 'granted'){
            const asset = await MediaLibrary.createAssetAsync(photo);
            MediaLibrary.createAlbumAsync('Dart Counter', asset, false);
        }
    }

    const exit = () => {
        console.log("Exit");
        setPhoto(undefined);
    }

    return (
        <View style={HomeStyle.cameraContainer}>
            <View style={[HomeStyle.pictureContainer, photo ? {display: 'flex'} : {display: 'none'}]}>
                <Image style={HomeStyle.picture} source={{uri: photo && photo.uri}}></Image>
            </View>
            <View style={[HomeStyle.pictureButtonsContainer, photo ? {display: 'flex'} : {display: 'none'}]}>
                <Pressable style={HomeStyle.pictureButton} onPress={cancel}>
                    <Text style={HomeStyle.pictureButtonText}>Cancel</Text>
                </Pressable>
                <Pressable style={HomeStyle.pictureButton} onPress={save}>
                    <Text style={HomeStyle.pictureButtonText}>Save</Text>
                </Pressable>
            </View>
            <Camera style={HomeStyle.camera} type={type} flashMode={flash} ref={(r) => {camera = r}}>
            </Camera>

            <View style={HomeStyle.CameraButtonsContainer}>
                <Pressable style={HomeStyle.CameraButton} onPress={toggleFlashlight}>
                    {type === CameraType.back ? 
                    flash === FlashMode.off ? <ZapOff size={36} color="white" /> : <Zap size={36} color="white" /> 
                    : <ZapOff size={36} color="white" />}
                </Pressable>
                <Pressable style={HomeStyle.CameraButton} onPress={takePicture}>
                    <CameraIcon size={36} color="white" />
                </Pressable>
                <Pressable style={HomeStyle.CameraButton} onPress={toggleCameraType}>
                    <SwitchCamera size={36} color="white" />
                </Pressable>
            </View>
        </View>
    );
}