import { Text, View, Pressable, Image } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeStyle } from '../../Styles/generic';

import { useEffect, useState } from 'react';
import useFirebase from '../../hooks/useFirebase';

import * as MediaLibrary from 'expo-media-library';
import { ScrollView } from 'react-native-gesture-handler';
import GameStats from '../../Components/GameStats';

import GameResults  from '../../interfaces/GameResults';


export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()
    
    const [profileName, onChangeProfileName] = useState('Guest');
    const [nickname, onChangeNickname] = useState('No nickname');
    const [createdAt, onChangeCreatedAt] = useState('');
    const [createdAtDate, onChangeCreatedAtDate] = useState('');

    const [image, setImage] = useState<string | null>(null);

    const { getUserInfo } = useFirebase();

    useEffect(() => {
        if(getUserInfo().username != "")
        {
            onChangeProfileName(getUserInfo().username);
            onChangeCreatedAt(getUserInfo().createdAt);
            const date = new Date(getUserInfo().createdAt);
            onChangeCreatedAtDate(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
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


    const [games, onChangeGames] = useState<GameResults[]>([]);
    useEffect(() => {
        onChangeGames([{
            PlayerAmount: 2,
            Title: "Tibo vs Milan" ,
            Legs: 1,
            Sets: 1,
            Date: '20-04-2023',
            Score: 501,
            ThrowIn: 'Straight in',
            ThrowOut: 'Double out',
            Player1: {
                PlayerID: 'abc123',
                Username: 'Tibo',
                Won: true,
                Darts: 60,
                ThreeDartsAvg: 45,
                HighestScore: 88,
                HighestCheckout: 2,
                Checkouts:{
                    Hits: 1,
                    Throws: 20,
                },
                FourtyPlus: 10,
                SixtyPlus: 6,
                EightyPlus: 2,
                HundredPlus: 0,
                OneTwentyPlus: 0,
                OneFourtyPlus: 0,
                OneSixtyPlus: 0,
                OneEighty: 0,
            },
            Player2: {
                PlayerID: 'bcd234',
                Username: 'Milan',
                Won: false,
                Darts: 57,
                ThreeDartsAvg: 36,
                HighestScore: 67,
                HighestCheckout: 2,
                Checkouts:{
                    Hits: 0,
                    Throws: 18,
                },
                FourtyPlus: 5,
                SixtyPlus: 2,
                EightyPlus: 0,
                HundredPlus: 0,
                OneTwentyPlus: 0,
                OneFourtyPlus: 0,
                OneSixtyPlus: 0,
                OneEighty: 0,
            },
        }])
    }, [])

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
            <ScrollView style={HomeStyle.statisticsGamesContainer}>
                <GameStats game={games[0]} />
            </ScrollView>
        </View>
    )
}