import { Text, View, Button, Pressable } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStyle } from '../../Styles/generic';
import { TextInput } from 'react-native-gesture-handler';


export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    return (
        <View>
            <View style={HomeStyle.gameTitleContainer}>
                <Text style={HomeStyle.gameTitle}>Username</Text>
            </View>

            <View style={HomeStyle.gameLegsContainer}>
                <Text style={HomeStyle.gameLegsText}>Legs: 0</Text>
            </View>

            <View style={HomeStyle.gameScoreContainer}>
                <Text style={HomeStyle.gameScoreTitle}>501</Text>

                <Text style={HomeStyle.gameScoreText}>Last score: -</Text>

                <Text style={HomeStyle.gameScoreText}>Darts thorwn: 0</Text>

                <Text style={HomeStyle.gameScoreText}>3-dart avg.: 0.00</Text>
            </View>

            <View style={HomeStyle.gameButtonsContainer}>
                <Pressable style={HomeStyle.gameBackButton} onPress={() => navigate('Game')}></Pressable>

                <TextInput style={HomeStyle.gameScoreInput}>
                    <Text style={HomeStyle.gameScoreInputText}>0</Text>
                </TextInput>

                <Pressable style={HomeStyle.gameNextButton} onPress={() => navigate('Game')}></Pressable>
            </View>
        </View>
    )
}