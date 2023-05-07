// React Native
import { useCallback, useEffect, useState } from 'react';
import { Text, View, Pressable, SafeAreaView, Image } from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation, ParamListBase, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

// Expo
import { requestPermissionsAsync, getAlbumAsync, getAssetsAsync } from 'expo-media-library';

// Styles
import { HomeStyle } from '../../Styles/generic';

// Hooks
import useFirebase from '../../hooks/useFirebase';


export default () => {
    // Navigation
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    // Firebase
    const { getUserInfo } = useFirebase();
    // Profile info
    const [profileName, onChangeProfileName] = useState('Guest');
    const [image, setImage] = useState<string | null>(null);

    // Match info
    const [legs, onChangeLegs] = useState('3');
    const [sets, onChangeSets] = useState('1');
    const [score, onChangeScore] = useState(501);
    const [throwIn, onChangeThrowIn] = useState('STRAIGHT');
    const [throwOut, onChangeThrowOut] = useState('DOUBLE');

    // Player info
    const [players, onChangePlayers] = useState([{name: 'You', id: 0}, {name: 'Add', id: 1}]);
    const [actualplayers, onChangeActualPlayers] = useState([{name: 'You ', id: 0}]);

    // Guest info
    const [guest, onChangeGuest] = useState(false);
    const [guestName, onChangeGuestName] = useState('Guest');

    // Changing guest name
    const onChangeGuestNameText = (text: string) => {
        if(text.length > 10) return;
        if(text.length == 0){
            onChangeGuestName(text);
            text = 'Guest';
            const tempPlayers = players;
            tempPlayers[1].name = text;
            onChangePlayers(tempPlayers);
            const tempActualPlayers = actualplayers;
            tempActualPlayers[1].name = text;
            onChangeActualPlayers(tempActualPlayers);
            return;
        }
        const tempPlayers = players;
        tempPlayers[1].name = text;
        onChangePlayers(tempPlayers);
        const tempActualPlayers = actualplayers;
        tempActualPlayers[1].name = text;
        onChangeActualPlayers(tempActualPlayers);
        onChangeGuestName(text);
    }

    // Get profile image and set it on focus
    useFocusEffect(
        useCallback(() => {
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
        }, [])
    );

    // Set profile name on load and on change of username
    useEffect(() => {
        if(getUserInfo().username != "")
        {
            onChangeProfileName(getUserInfo().username);
            players[0].name = getUserInfo().username;
            actualplayers[0].name = getUserInfo().username;
        }
    }, [getUserInfo().username])

    // Add player
    const addPlayer = () => {
        if(players.length < 2)
        {
            let newplayers = players.slice(0, players.length - 1);
            newplayers.push({name: guestName, id: newplayers.length});
            newplayers.push({name: 'Add', id: newplayers.length});
            onChangePlayers(newplayers);
            onChangeActualPlayers(newplayers.slice(0, newplayers.length - 1));
        }
        else{
            let newplayers = players.slice(0, players.length - 1);
            newplayers.push({name: guestName, id: newplayers.length});
            onChangePlayers(newplayers);
            onChangeActualPlayers(newplayers);
            onChangeGuest(true);
        }
    }

    // Remove player
    const removePlayer = () => {
        if(players.length > 1){
            let newplayers = players.slice(0, 1);
            newplayers.push({name: 'Add', id: newplayers.length});
            onChangePlayers(newplayers);
            onChangeActualPlayers(newplayers);
            onChangeGuest(false);
        }
    }

    // Player
    const player = (name: string, id: number) => {
        return (<Pressable style={HomeStyle.player} onPress={name === "Add" ? addPlayer : noAction}>
            {
            name === "Add" ? 
            <Image style={HomeStyle.AddIcon} source={require('../../assets/images/AddIcon.png')}></Image>
            : profileName == name ?
               image != null && <Image style={HomeStyle.playerIcon} source={{uri: image}}/>
            : <Image style={HomeStyle.playerIcon} source={require('../../assets/images/ProfileIcon.png')}/>}
            <Text style={HomeStyle.playerName}>{name}</Text>
        </Pressable>)
    }

    // No action (empty callback function)
    const noAction = () => {
        console.log("No action");
    }

    // Start game
    const startGame = () => {
        if(actualplayers.length >= 1 && sets != "" && legs != "") navigate('Game', {players: actualplayers, legs: parseInt(legs), sets: parseInt(sets), score: score, throwIn: throwIn, throwOut: throwOut});
        else alert("Please fill in all the fields");
    }

    
    return (
        <View style={HomeStyle.container2}>
            <ScrollView style={[{height:'100%'},{marginBottom: 50}]}>
                <Text style={HomeStyle.matchTitle}>Players</Text>
                
                <SafeAreaView style={HomeStyle.playersContainer}>
                    <FlatList
                        data={players}
                        renderItem={({item}) => player(item.name, item.id)}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        // ItemSeparatorComponent={() => <View style={{width: 120 /players.length}}/>} //4 players max
                        ItemSeparatorComponent={() => <View style={{width: ScreenWidth - 150}}/>} //2 players max

                    />
                </SafeAreaView>

                <Text style={HomeStyle.matchTitle}>Game settings</Text>

                <View style={HomeStyle.matchSettingsRow}>
                    <Pressable style={score === 301 ? HomeStyle.matchSettingsRowTile1of4Active : HomeStyle.matchSettingsRowTile1of4} onPress={() => onChangeScore(301)}>
                        <Text style={score === 301 ? HomeStyle.matchSettingsRowTextActive : HomeStyle.matchSettingsRowText}>301</Text>
                    </Pressable>
                    <Pressable style={score === 501 ? HomeStyle.matchSettingsRowTile1of4Active : HomeStyle.matchSettingsRowTile1of4} onPress={() => onChangeScore(501)}>
                        <Text style={score === 501 ? HomeStyle.matchSettingsRowTextActive : HomeStyle.matchSettingsRowText}>501</Text>
                    </Pressable>
                    <Pressable style={score === 701 ? HomeStyle.matchSettingsRowTile1of4Active : HomeStyle.matchSettingsRowTile1of4} onPress={() => onChangeScore(701)}>
                        <Text style={score === 701 ? HomeStyle.matchSettingsRowTextActive : HomeStyle.matchSettingsRowText}>701</Text>
                    </Pressable>
                    <Pressable style={score === 170 ? HomeStyle.matchSettingsRowTile1of4Active : HomeStyle.matchSettingsRowTile1of4} onPress={() => onChangeScore(170)}>
                        <Text style={score === 170 ? HomeStyle.matchSettingsRowTextActive : HomeStyle.matchSettingsRowText}>CUSTOM: 170</Text>
                    </Pressable>
                </View>

                <View style={HomeStyle.matchSettingsRow}>
                    <Pressable style={HomeStyle.matchSettingsRowTile1of4Active}>
                        <Text style={HomeStyle.matchSettingsRowTextActive}>Sets:</Text>
                    </Pressable>
                    <View style={HomeStyle.matchSettingsRowTile1of4}>
                        <TextInput style={HomeStyle.matchSettingsRowInput} keyboardType='numeric' onChangeText={onChangeSets} value={sets}></TextInput>
                    </View>
                    <Pressable style={HomeStyle.matchSettingsRowTile1of4Active}>
                        <Text style={HomeStyle.matchSettingsRowTextActive}>Legs:</Text>
                    </Pressable>
                    <Pressable style={HomeStyle.matchSettingsRowTile1of4}>
                        <TextInput style={HomeStyle.matchSettingsRowInput} keyboardType='numeric' onChangeText={onChangeLegs} value={legs}></TextInput>
                    </Pressable>
                </View>

                <View style={HomeStyle.matchSettingsRow}>
                    <Pressable style={throwIn === 'STRAIGHT' ? HomeStyle.matchSettingsRowTile1of3Active : HomeStyle.matchSettingsRowTile1of3} onPress={() => onChangeThrowIn('STRAIGHT')}>
                        <Text style={throwIn === 'STRAIGHT' ? HomeStyle.matchSettingsRowTextActive : HomeStyle.matchSettingsRowText}>STRAIGHT IN</Text>
                    </Pressable>
                    <Pressable style={throwIn === 'DOUBLE' ? HomeStyle.matchSettingsRowTile1of3Active : HomeStyle.matchSettingsRowTile1of3} onPress={() => onChangeThrowIn('DOUBLE')}>
                        <Text style={throwIn === 'DOUBLE' ? HomeStyle.matchSettingsRowTextActive : HomeStyle.matchSettingsRowText}>DOUBLE IN</Text>
                    </Pressable>
                    <Pressable style={throwIn === 'MASTER' ? HomeStyle.matchSettingsRowTile1of3Active : HomeStyle.matchSettingsRowTile1of3} onPress={() => onChangeThrowIn('MASTER')}>
                        <Text style={throwIn === 'MASTER' ? HomeStyle.matchSettingsRowTextActive : HomeStyle.matchSettingsRowText}>MASTER IN</Text>
                    </Pressable>
                </View>
                
                <View style={HomeStyle.matchSettingsRow}>
                    <Pressable style={throwOut === 'DOUBLE' ? HomeStyle.matchSettingsRowTile1of3Active : HomeStyle.matchSettingsRowTile1of3} onPress={() => onChangeThrowOut('DOUBLE')}>
                        <Text style={throwOut === 'DOUBLE' ? HomeStyle.matchSettingsRowTextActive : HomeStyle.matchSettingsRowText}>DOUBLE OUT</Text>
                    </Pressable>
                    <Pressable style={throwOut === 'MASTER' ? HomeStyle.matchSettingsRowTile1of3Active : HomeStyle.matchSettingsRowTile1of3} onPress={() => onChangeThrowOut('MASTER')}>
                        <Text style={throwOut === 'MASTER' ? HomeStyle.matchSettingsRowTextActive : HomeStyle.matchSettingsRowText}>MASTER OUT</Text>
                    </Pressable>
                    <Pressable style={throwOut === 'STRAIGHT' ? HomeStyle.matchSettingsRowTile1of3Active : HomeStyle.matchSettingsRowTile1of3} onPress={() => onChangeThrowOut('STRAIGHT')}>
                        <Text style={throwOut === 'STRAIGHT' ? HomeStyle.matchSettingsRowTextActive : HomeStyle.matchSettingsRowText}>STRAIGHT OUT</Text>
                    </Pressable>
                </View>

                <View style={HomeStyle.matchSettingsRow}>
                    <Pressable style={ guest ? HomeStyle.matchSettingsRowTile1of2 : HomeStyle.matchSettingsRowTile1of2Active} onPress={() => {onChangeGuest(false); removePlayer()}}>
                        <Text style={ guest ? HomeStyle.matchSettingsRowText : HomeStyle.matchSettingsRowTextActive}>No Guest</Text>
                    </Pressable>
                    <Pressable style={ guest ? HomeStyle.matchSettingsRowTile1of2Active : HomeStyle.matchSettingsRowTile1of2} onPress={() => {onChangeGuest(true); addPlayer()}}>
                        <Text style={ guest ? HomeStyle.matchSettingsRowTextActive : HomeStyle.matchSettingsRowText}>Guest</Text>
                    </Pressable>
                </View>

                {guest && <View style={HomeStyle.matchSettingsRow}>
                    <Pressable style={HomeStyle.matchSettingsRowTile1of2Active}>
                        <Text style={HomeStyle.matchSettingsRowTextActive}>Guest name:</Text>
                    </Pressable>
                    <View style={HomeStyle.matchSettingsRowTile1of2}>
                        <TextInput style={HomeStyle.matchSettingsRowInput} keyboardType='default' onChangeText={onChangeGuestNameText} value={guestName}></TextInput>
                    </View>
                </View>}
            </ScrollView>

            <Pressable style={[HomeStyle.button4]} onPress={startGame}>
                <Text style={HomeStyle.buttonText2}>Start Game</Text>
            </Pressable>
        </View>
    )
}