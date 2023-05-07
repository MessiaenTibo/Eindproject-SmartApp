// React Native
import { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';

// Expo
import * as MediaLibrary from 'expo-media-library';

// Styles
import { HomeStyle } from '../../Styles/generic';

// Hooks
import useFirebase from '../../hooks/useFirebase';
import useHttpRequests from '../../hooks/useHttpRequests';

// Components
import GameStats from '../../Components/GameStats';

// Interfaces
import GameResults  from '../../interfaces/GameResults';


export default () => {
    // Firebase info
    const [profileName, onChangeProfileName] = useState('Guest');
    const [nickname, onChangeNickname] = useState('No nickname');
    const [createdAt, onChangeCreatedAt] = useState('');
    const [createdAtDate, onChangeCreatedAtDate] = useState('');
    const [Uid, onChangeUid] = useState('uid');
    const { getUserInfo } = useFirebase();

    // Profile image
    const [image, setImage] = useState<string | null>(null);

    // Http requests
    const { getAsync } = useHttpRequests();

    // Games
    const [games, onChangeGames] = useState<GameResults[]>([]);

    // Request profile info and image on load
    useEffect(() => {
        if(getUserInfo().username != "")
        {
            onChangeProfileName(getUserInfo().username);
            onChangeCreatedAt(getUserInfo().createdAt);
            const date = new Date(getUserInfo().createdAt);
            onChangeCreatedAtDate(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
            onChangeUid(getUserInfo().uid);
            // console.log("uid: " + getUserInfo().uid);
        }

        console.log("Requesting image")
        MediaLibrary.requestPermissionsAsync().then((result) => {
            if(result.granted) {
                // console.log("Permission granted");
                // console.log("username: " + getUserInfo().username);
                MediaLibrary.getAlbumAsync('ProfileIcon' + getUserInfo().username).then((album) => {
                    if(album != null) {
                        MediaLibrary.getAssetsAsync({album: album}).then((assets) => {
                            if(assets != null) {
                                console.log("Image received")
                                setImage(assets.assets[0].uri);
                            }
                        })
                    }
                })
            }
        })
    }, [])

    // Request games on load and when Uid changes
    useEffect(() => {
        if(Uid != "uid") {
            const getGames = getAsync("https://webappdartcounter.azurewebsites.net/games/" + Uid).then((result) => {
                    if(result != null) {
                        onChangeGames(result);
                    }
                })
        }
    }, [Uid])


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
                data={games.sort((a, b) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                    })}
                renderItem={({item}) => <GameStats game={item} />}
                keyExtractor={(item) => item.date}
            />
        </View>
    )
}