import { Text, View, Button, Pressable, SafeAreaView } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStyle } from '../../Styles/generic';

import { Image } from "react-native"
import useFirebase from '../../hooks/useFirebase';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { PlusCircle } from 'lucide-react';

export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    const { getUserInfo } = useFirebase();

    const [profileName, onChangeProfileName] = useState('Guest');
    const [legs, onChangeLegs] = useState(3);
    const [sets, onChangeSets] = useState(2);

    useEffect(() => {
        if(getUserInfo().username != "") onChangeProfileName(getUserInfo().username);
    }, [getUserInfo().username])

    const [players, onChangePlayers] = useState([{name: 'Guest 1', id: 0}, {name: 'Add', id: 1}]);
    const [actualplayers, onChangeActualPlayers] = useState([{name: 'Guest 1', id: 0}]);

    const addPlayer = () => {
        if(players.length < 4)
        {
            let newplayers = players.slice(0, players.length - 1);
            newplayers.push({name: 'Guest ' + (newplayers.length + 1), id: newplayers.length});
            newplayers.push({name: 'Add', id: newplayers.length + 1});
            onChangePlayers(newplayers);
            onChangeActualPlayers(newplayers.slice(0, newplayers.length - 1));
        }
        else{
            let newplayers = players.slice(0, players.length - 1);
            newplayers.push({name: 'Guest ' + (newplayers.length + 1), id: newplayers.length});
            onChangePlayers(newplayers);
            onChangeActualPlayers(newplayers);
        }
    }

    const player = (name: string, id: number) => {
        return (<Pressable style={HomeStyle.player} onPress={name === "Add" ? addPlayer : noAction}>
            {name === "Add" ? <Image style={HomeStyle.AddIcon} source={require('../../assets/images/AddIcon.png')}></Image> : <Image style={HomeStyle.playerIcon} source={require('../../assets/images/ProfileIcon.png')}/>}
            <Text style={HomeStyle.playerName}>{name}</Text>
        </Pressable>)
    }

    const noAction = () => {
        console.log("No action");
    }

    return (
            <View style={HomeStyle.container2}>
                <Text style={HomeStyle.title}>Players</Text>
                
                <SafeAreaView style={HomeStyle.playersContainer}>
                    <FlatList
                        data={players}
                        renderItem={({item}) => player(item.name, item.id)}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        ItemSeparatorComponent={() => <View style={{width: 120 /players.length}}/>}
                    />
                </SafeAreaView>

                <Text style={HomeStyle.title}>Game settings</Text>

                <Pressable style={[HomeStyle.button4]} onPress={() => {navigate('Game', {players: actualplayers, legs: legs, sets: sets});}}>
                    <Text style={HomeStyle.buttonText2}>Start Game</Text>
                </Pressable>
            </View>
    )
}