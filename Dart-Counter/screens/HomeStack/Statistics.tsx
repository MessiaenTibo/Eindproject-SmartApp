import { Text, View, Pressable, Image } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeStyle } from '../../Styles/generic';

import { useEffect, useState } from 'react';
import useFirebase from '../../hooks/useFirebase';

import * as MediaLibrary from 'expo-media-library';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import GameStats from '../../Components/GameStats';

import GameResults  from '../../interfaces/GameResults';

import useHttpRequests from '../../hooks/useHttpRequests';

export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>();
    
    const [profileName, onChangeProfileName] = useState('Guest');
    const [nickname, onChangeNickname] = useState('No nickname');
    const [createdAt, onChangeCreatedAt] = useState('');
    const [createdAtDate, onChangeCreatedAtDate] = useState('');
    const [Uid, onChangeUid] = useState('uid');

    const [image, setImage] = useState<string | null>(null);

    const { getUserInfo } = useFirebase();

    useEffect(() => {
        if(getUserInfo().username != "")
        {
            onChangeProfileName(getUserInfo().username);
            onChangeCreatedAt(getUserInfo().createdAt);
            const date = new Date(getUserInfo().createdAt);
            onChangeCreatedAtDate(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
            onChangeUid(getUserInfo().uid);
            console.log("uid: " + getUserInfo().uid);
        }

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

    const { getAsync } = useHttpRequests();


    const [games, onChangeGames] = useState<GameResults[]>([]);

    useEffect(() => {

       const getGames = getAsync("https://webappdartcounter.azurewebsites.net/games/" + Uid).then((result) => {
            if(result != null) {
                onChangeGames(result);
            }
        })


    }, [Uid])

    useEffect(() => {
        console.log(games[0]);
    }, [games])

    return (
        <View>
            <View style={HomeStyle.statisticsProfileContainer}>
                <View style={HomeStyle.statisticsProfileIconContainer}>
                    <View style={HomeStyle.statisticsProfileIcon}>
                        <Image style={HomeStyle.statisticsProfileIconImage} source={profileName == "Guest" ? require('../../assets/images/ProfileIcon.png') : {uri:image}}/>
                    </View>
                    <View>
                        <Text style={HomeStyle.statisticsProfileName}>{profileName}</Text>
                        <Text style={HomeStyle.statisticsProfileText}>{nickname}</Text>
                    </View>
                </View>
                <View style={HomeStyle.statisticsCreatedAtContainer}>
                    <Text style={HomeStyle.statisticsCreatedAt}>Member since</Text>
                    <Text style={HomeStyle.statisticsCreatedAt}>
                        {createdAtDate}
                    </Text>
                </View>
            </View>
            <FlatList style={HomeStyle.statisticsGamesContainer}
                data={games}
                renderItem={({item}) => <GameStats game={item} />}
                keyExtractor={(item) => item.date}
            />
        </View>
    )
}