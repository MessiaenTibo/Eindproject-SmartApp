import { Pressable, Text, View } from "react-native"
import { colors } from "../Styles/colors"
import { HomeStyle } from "../Styles/generic"

import { StackNavigationProp } from "@react-navigation/stack"

import { useNavigation, ParamListBase } from '@react-navigation/native';
import GameResults from "../interfaces/GameResults";
import { useState, useEffect } from "react";


export default ({game}:{game:GameResults}) => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    const [title, setTitle] = useState('Title')
    const [date, setDate] = useState('20-04-2023')
    const [player1Username, setPlayer1Username] = useState('Player1')
    const [player1Won, setPlayer1Won] = useState(false)
    const [player1ThreeDartsAvg, setPlayer1ThreeDartsAvg] = useState(0)
    const [player2Username, setPlayer2Username] = useState('Player2')
    const [player2Won, setPlayer2Won] = useState(false)
    const [player2ThreeDartsAvg, setPlayer2ThreeDartsAvg] = useState(0)

    useEffect(() => {
        if(!game) return
        setTitle(game.title)
        setDate(game.date)
        setPlayer1Username(game.player1.username)
        setPlayer1Won(game.player1.won)
        setPlayer1ThreeDartsAvg(game.player1.threeDartAvg)
        if(game.player2) setPlayer2Username(game.player2.username)
        if(game.player2) setPlayer2Won(game.player2.won)
        if(game.player2) setPlayer2ThreeDartsAvg(game.player2.threeDartAvg)

    }, [game])
    

    return (
        <View style={HomeStyle.statisticsGame}>
            <Text style={HomeStyle.statisticsGameTitleRow}>{title}</Text>
            <Text style={HomeStyle.statisticsGameRow1}>{date}</Text>
            <View style={HomeStyle.statisticsGameRow2}>
                <Text style={HomeStyle.statisticsGameTextRow}>{player1Username}</Text>
                <Text style={HomeStyle.statisticsGameTextRow}>{player1Won == true ? 'Winner' : 'Lost'}</Text>
                <Text style={HomeStyle.statisticsGameTextRow}>{player1ThreeDartsAvg}</Text>
            </View>
            {player2Username != "Player2" && <View style={HomeStyle.statisticsGameRow1}>
                {player2Username != "Player2" && <Text style={HomeStyle.statisticsGameTextRow}>{player2Username}</Text>}
                {player2Username != "Player2" && <Text style={HomeStyle.statisticsGameTextRow}>{player2Won == true ? 'Winner' : 'Lost'}</Text>}
                {player2Username != "Player2" && <Text style={HomeStyle.statisticsGameTextRow}>{player2ThreeDartsAvg}</Text>}
            </View>}
            {player2Username != "Player2" ? <View style={HomeStyle.statisticsGameRow2}>
                <Pressable style={HomeStyle.statisticsGameButton} onPress={() => {navigate('StatisticsDetails', {gameResults: game})}}>
                    <Text style={HomeStyle.statisticsGameButtonText}>Details</Text>
                </Pressable>
            </View> :
            <View style={HomeStyle.statisticsGameRow1}>
                <Pressable style={HomeStyle.statisticsGameButton} onPress={() => {navigate('StatisticsDetails', {gameResults: game})}}>
                    <Text style={HomeStyle.statisticsGameButtonText}>Details</Text>
                </Pressable>
            </View>}
        </View>
    )
}