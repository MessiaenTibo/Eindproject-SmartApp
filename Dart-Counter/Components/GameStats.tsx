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

    useEffect(() => {
        if(!game) return
        setTitle(game.Title)
        setDate(game.Date)
    }, [game])
    

    return (
        <View style={HomeStyle.statisticsGame}>
            <Text style={HomeStyle.statisticsGameTitleRow}>{title}</Text>
            <Text style={HomeStyle.statisticsGameRow1}>{date}</Text>
            <View style={HomeStyle.statisticsGameRow2}>
                <Text>
                    1
                </Text>
                <Text>
                    2
                </Text>
                <Text>
                    3
                </Text>
            </View>
            <View style={HomeStyle.statisticsGameRow1}>
                <Text>
                    1
                </Text>
                <Text>
                    2
                </Text>
                <Text>
                    3
                </Text>
            </View>

        </View>
    )
}