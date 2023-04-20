import { Text, View} from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeStyle } from '../../Styles/generic';

import GameResults from '../../interfaces/GameResults';
import { ScrollView } from 'react-native-gesture-handler';


export default (props:any) => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    const { gameResults }:{gameResults:GameResults} = props.route.params;
    console.log({gameResults})


    return (
        <ScrollView>
            <Text style={HomeStyle.statsSubTitle}>{gameResults.Title}</Text>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>Players:</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.Username}</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player2?.Username}</Text>
            </View>

            <Text style={HomeStyle.statsSubTitle}>Averages</Text>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>3-dart avg.</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.ThreeDartsAvg}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2?.ThreeDartsAvg}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>Highest score</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.HighestScore}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2.HighestScore}</Text> : null}
            </View>

            <Text style={HomeStyle.statsSubTitle}>Checkouts</Text>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>Checkout percentage</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.Checkouts.Hits}/{gameResults.Player1.Checkouts.Throws}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2.Checkouts.Hits}/{gameResults.Player2.Checkouts.Throws}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>Checkouts</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.Checkouts.Hits} / {gameResults.Player1.Checkouts.Throws}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2.Checkouts.Hits} / {gameResults.Player2.Checkouts.Throws}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>Highest checkout</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.HighestCheckout}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2.HighestCheckout}</Text> : null}
            </View>

            <Text style={HomeStyle.statsSubTitle}>Scores</Text>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>180</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.OneEighty}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2.OneEighty}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>160+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.OneSixtyPlus}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2.OneSixtyPlus}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>140+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.OneFourtyPlus}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2.OneFourtyPlus}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>120+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.OneTwentyPlus}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2.OneTwentyPlus}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>100+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.HundredPlus}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2.HundredPlus}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>80+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.EightyPlus}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2.EightyPlus}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>60+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.SixtyPlus}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2.SixtyPlus}</Text> : null}
            </View>
            <View style={HomeStyle.statsRow}>
                <Text style={HomeStyle.statsRowItem}>40+</Text>
                <Text style={HomeStyle.statsRowItem}>{gameResults.Player1.FourtyPlus}</Text>
                {gameResults.Player2 ? <Text style={HomeStyle.statsRowItem}>{gameResults.Player2.FourtyPlus}</Text> : null}
            </View>

        </ScrollView>
    )
}