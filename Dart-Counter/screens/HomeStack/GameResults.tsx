import { Text, View, Pressable } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeStyle } from '../../Styles/generic';

import GameResults from '../../interfaces/GameResults';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';


export default (props:any) => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    const { gameResults }:{gameResults:GameResults} = props.route.params;
    console.log({gameResults})
    const [checkoutPercentagePlayer1, setCheckoutPercentagePlayer1] = useState(0);
    const [checkoutPercentagePlayer1String, setCheckoutPercentagePlayer1String] = useState("0%");
    const [checkoutPercentageplayer2, setCheckoutPercentagePlayer2] = useState(0);
    const [checkoutPercentagePlayer2String, setCheckoutPercentageplayer2String] = useState("0%");

    useEffect(() => {
        setOptions({
            headerLeft: () => ( <Pressable style={HomeStyle.navigationTitleContainer} onPress={() => {navigate("Home")}}><Text style={HomeStyle.navigationTitle}>Home</Text></Pressable> ),
            headerRight: () => ( <Pressable style={HomeStyle.navigationTitleContainer} onPress={() => {navigate("Statistics")}}><Text style={HomeStyle.navigationTitle}>Statistics</Text></Pressable> )

        })
        if(gameResults.player1.checkouts.throws != 0) setCheckoutPercentagePlayer1(gameResults.player1.checkouts.hits / gameResults.player1.checkouts.throws * 100)
        if(gameResults.player2 && gameResults.player2.checkouts.throws != 0) setCheckoutPercentagePlayer2(gameResults.player2.checkouts.hits / gameResults.player2.checkouts.throws * 100)
    }, [])

    useEffect(() => {
        setCheckoutPercentagePlayer1String(checkoutPercentagePlayer1.toFixed(2) + "%")
        if(gameResults.player2) setCheckoutPercentageplayer2String(checkoutPercentageplayer2.toFixed(2) + "%")
    }, [checkoutPercentagePlayer1, checkoutPercentageplayer2])


    return (
        <ScrollView>
            <Text style={HomeStyle.statsSubTitle}>{gameResults.title}</Text>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>Players:</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.username}</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player2?.username}</Text>
            </View>

            <Text style={HomeStyle.statsSubTitle}>Darts</Text>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>Total darts</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.darts}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2?.darts}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>3-dart avg.</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.threeDartAvg}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2?.threeDartAvg}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>Highest score</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.highestScore}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2.highestScore}</Text> : null}
            </View>

            <Text style={HomeStyle.statsSubTitle}>Checkouts</Text>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>Checkout percentage</Text>
                <Text style={HomeStyle.statsRowItem}>{checkoutPercentagePlayer1String}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{checkoutPercentagePlayer2String}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>Checkouts</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.checkouts.hits} / {gameResults.player1.checkouts.throws}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2.checkouts.hits} / {gameResults.player2.checkouts.throws}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>Highest checkout</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.highestCheckout}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2.highestCheckout}</Text> : null}
            </View>

            <Text style={HomeStyle.statsSubTitle}>Scores</Text>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>180</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.oneEighty}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2.oneEighty}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>160+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.oneSixtyPlus}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2.oneSixtyPlus}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>140+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.oneFourtyPlus}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2.oneFourtyPlus}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>120+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.oneTwentyPlus}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2.oneTwentyPlus}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>100+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.hundredPlus}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2.hundredPlus}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>80+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.eightyPlus}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2.eightyPlus}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>60+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.sixtyPlus}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2.sixtyPlus}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>40+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.player1.fourtyPlus}</Text>
                {gameResults.player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.player2.fourtyPlus}</Text> : null}
            </View>

        </ScrollView>
    )
}