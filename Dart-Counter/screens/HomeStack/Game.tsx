import { Text, View, Button, Pressable, Dimensions } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStyle } from '../../Styles/generic';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { colors } from '../../Styles/colors';

import { ArrowRight, Delete, CornerDownLeft } from 'lucide-react-native';

export default (props:any) => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    let screenHeight = Dimensions.get('window').height;

    const {players }:{players:Array<{name:string, id:number}>} = props.route.params;

    // Game settings
    let AmountOfPlayers = players.length;
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [scoreInput, setScoreInput] = useState('');

    // Player 1
    const [namePlayer1, setNamePlayer1] = useState('Username 1');
    const [scorePlayer1, setScorePlayer1] = useState(501);
    const [lastScorePlayer1, setLastScorePlayer1] = useState(-1);
    let [lastscoresPlayer1, setLastscoresPlayer1] = useState([0]);

    const [dartsThrownPlayer1, setDartsThrownPlayer1] = useState(0);
    const [threeDartAvgPlayer1, setThreeDartAvgPlayer1] = useState(0.00);
    const [legsPlayer1, setLegsPlayer1] = useState(0);

    // Player 2
    const namePlayer2 = 'Username 2';
    const [scorePlayer2, setScorePlayer2] = useState(501);
    const [lastScorePlayer2, setLastScorePlayer2] = useState(-1);
    let [lastscoresPlayer2, setLastscoresPlayer2] = useState([0]);

    const [dartsThrownPlayer2, setDartsThrownPlayer2] = useState(0);
    const [threeDartAvgPlayer2, setThreeDartAvgPlayer2] = useState(0);
    const [legsPlayer2, setLegsPlayer2] = useState(0);

    const next = () => {
        // convert score input to int
        if(scoreInput === '') return;
        let scoreInputInt = parseInt(scoreInput);

        // Change score
        if (currentPlayer === 1 && scorePlayer1 - scoreInputInt >= 0) {
            setScorePlayer1(scorePlayer1 - scoreInputInt);
            setLastScorePlayer1(scoreInputInt);
            setDartsThrownPlayer1(dartsThrownPlayer1 + 3);
            setThreeDartAvgPlayer1(((501 - scorePlayer1 ) / dartsThrownPlayer1) * 3);
            setCurrentPlayer(2);
            let temp = lastscoresPlayer1
            temp.push(scoreInputInt);
            setLastscoresPlayer1(temp);
        } else if (currentPlayer === 2 && scorePlayer2 - scoreInputInt >= 0){
            setScorePlayer2(scorePlayer2 - scoreInputInt);
            setLastScorePlayer2(scoreInputInt);
            setDartsThrownPlayer2(dartsThrownPlayer2 + 3);
            setThreeDartAvgPlayer2(((501 - scorePlayer2 ) / dartsThrownPlayer2) * 3);
            setCurrentPlayer(1);
            let temp = lastscoresPlayer2
            temp.push(scoreInputInt);
            setLastscoresPlayer2(temp);
        }

        // Reset score input
        setScoreInput('');

        // Check if game is over
        if (currentPlayer === 1 && scorePlayer1 - scoreInputInt === 0) {
            setLegsPlayer1(legsPlayer1 + 1);
            setScorePlayer1(501);
            setScorePlayer2(501);
            setDartsThrownPlayer1(0);
            setDartsThrownPlayer2(0);
            setThreeDartAvgPlayer1(0);
            setThreeDartAvgPlayer2(0);
            if(legsPlayer1 + 1 === 3) {
                alert('Player 1 won!');
                navigate('Statistics');
            }
        } else if (currentPlayer === 2 && scorePlayer2 - scoreInputInt === 0) {
            setLegsPlayer2(legsPlayer2 + 1);
            setScorePlayer1(501);
            setScorePlayer2(501);
            setDartsThrownPlayer1(0);
            setDartsThrownPlayer2(0);
            setThreeDartAvgPlayer1(0);
            setThreeDartAvgPlayer2(0);
            if(legsPlayer2 + 1 === 3) {
                alert('Player 2 won!');
                navigate('Statistics');
            }
        }

    }

    const addNumberToScoreInput = (number: number) => {
        if (scoreInput.length < 3) {
            setScoreInput(scoreInput + number);
        }
    }

    const removeLastNumberFromScoreInput = () => {
        if (scoreInput.length > 0) {
            setScoreInput(scoreInput.slice(0, -1));
        }
    }

    const undo = () => {
        // Reset score input
        setScoreInput('');

        if (currentPlayer === 2 && lastscoresPlayer1.length > 1) {
            setScorePlayer1(scorePlayer1 + lastscoresPlayer1[lastscoresPlayer1.length - 1]);
            setLastScorePlayer1(lastscoresPlayer1[lastscoresPlayer1.length - 2]);
            setDartsThrownPlayer1(dartsThrownPlayer1 - 3);
            setThreeDartAvgPlayer1(((501 - scorePlayer1 ) / dartsThrownPlayer1) * 3);
            setCurrentPlayer(1);
            lastscoresPlayer1.pop();
        } else if(currentPlayer === 1 && lastscoresPlayer2.length > 1) {
            setScorePlayer2(scorePlayer2 + lastscoresPlayer2[lastscoresPlayer2.length - 1]);
            setLastScorePlayer2(lastscoresPlayer2[lastscoresPlayer2.length - 2]);
            setDartsThrownPlayer2(dartsThrownPlayer2 - 3);
            setThreeDartAvgPlayer2(((501 - scorePlayer2 ) / dartsThrownPlayer2) * 3);
            setCurrentPlayer(2);
            lastscoresPlayer2.pop();
        }
    }

    return (
        <View style={{height: screenHeight}}>
            <View style={{flexDirection: 'row'}}>
                <View style={[AmountOfPlayers === 1 ? {width: '100%'} : {width: '50%'},{backgroundColor: colors.black},currentPlayer === 1 ? {opacity: 1} : {opacity: 0.8}]}>
                    <View style={HomeStyle.gameTitleContainer}>
                        <Text style={HomeStyle.gameTitle}>{namePlayer1}</Text>
                    </View>

                    <View style={HomeStyle.gameLegsContainer}>
                        <Text style={HomeStyle.gameLegsText}>Legs: {legsPlayer1}</Text>
                    </View>

                    <View style={HomeStyle.gameScoreContainer}>
                        <Text style={HomeStyle.gameScoreTitle}>{scorePlayer1}</Text>

                        <Text style={HomeStyle.gameScoreText}>{lastScorePlayer1 === -1 ? "Last score:-" : "Last score: " + lastScorePlayer1}</Text>

                        <Text style={HomeStyle.gameScoreText}>Darts thorwn: {dartsThrownPlayer1}</Text>

                        <Text style={HomeStyle.gameScoreText}>3-dart avg.: {threeDartAvgPlayer1}</Text>
                    </View>
                </View>

                <View style={[{width: '50%'},{backgroundColor: colors.black},currentPlayer === 2 ? {opacity: 1} : {opacity: 0.8}]}>
                <View style={HomeStyle.gameTitleContainer}>
                        <Text style={HomeStyle.gameTitle}>{namePlayer2}</Text>
                    </View>

                    <View style={HomeStyle.gameLegsContainer}>
                        <Text style={HomeStyle.gameLegsText}>Legs: {legsPlayer2}</Text>
                    </View>

                    <View style={HomeStyle.gameScoreContainer}>
                        <Text style={HomeStyle.gameScoreTitle}>{scorePlayer2}</Text>

                        <Text style={HomeStyle.gameScoreText}>{lastScorePlayer2 === -1 ? "Last score:-" : "Last score: " + lastScorePlayer2}</Text>

                        <Text style={HomeStyle.gameScoreText}>Darts thorwn: {dartsThrownPlayer2}</Text>

                        <Text style={HomeStyle.gameScoreText}>3-dart avg.: {threeDartAvgPlayer2}</Text>
                    </View>
                </View>
                
            </View>

            <View style={HomeStyle.gameButtonsContainer}>
                <Pressable style={HomeStyle.gameBackButton} onPress={undo}>
                    <CornerDownLeft size={24} color={colors.white}/>
                </Pressable>

                <TextInput style={HomeStyle.gameScoreInput} keyboardType='numeric' placeholder='Score' value={scoreInput} onChangeText={setScoreInput} maxLength={3}>
                </TextInput>

                <Pressable style={HomeStyle.gameNextButton} onPress={next}>
                    <ArrowRight size={24} color={colors.white}/>
                </Pressable>
            </View>

            <View style={HomeStyle.gameNumberInputContainer}>
                <Pressable style={HomeStyle.gameNumberInputButton} onPress={() => addNumberToScoreInput(1)}>
                    <Text style={HomeStyle.gameNumberInputButtonText}>1</Text>
                </Pressable>

                <Pressable style={HomeStyle.gameNumberInputButton} onPress={() => addNumberToScoreInput(2)}>
                    <Text style={HomeStyle.gameNumberInputButtonText}>2</Text>
                </Pressable>

                <Pressable style={HomeStyle.gameNumberInputButton} onPress={() => addNumberToScoreInput(3)}>
                    <Text style={HomeStyle.gameNumberInputButtonText}>3</Text>
                </Pressable>

                <Pressable style={HomeStyle.gameNumberInputButton} onPress={() => addNumberToScoreInput(4)}>
                    <Text style={HomeStyle.gameNumberInputButtonText}>4</Text>
                </Pressable>

                <Pressable style={HomeStyle.gameNumberInputButton} onPress={() => addNumberToScoreInput(5)}>
                    <Text style={HomeStyle.gameNumberInputButtonText}>5</Text>
                </Pressable>

                <Pressable style={HomeStyle.gameNumberInputButton} onPress={() => addNumberToScoreInput(6)}>
                    <Text style={HomeStyle.gameNumberInputButtonText}>6</Text>
                </Pressable>

                <Pressable style={HomeStyle.gameNumberInputButton} onPress={() => addNumberToScoreInput(7)}>
                    <Text style={HomeStyle.gameNumberInputButtonText}>7</Text>
                </Pressable>

                <Pressable style={HomeStyle.gameNumberInputButton} onPress={() => addNumberToScoreInput(8)}>
                    <Text style={HomeStyle.gameNumberInputButtonText}>8</Text>
                </Pressable>

                <Pressable style={HomeStyle.gameNumberInputButton} onPress={() => addNumberToScoreInput(9)}>
                    <Text style={HomeStyle.gameNumberInputButtonText}>9</Text>
                </Pressable>

                <Pressable style={HomeStyle.gameNumberInputButtonBlack}>
                    <Text style={HomeStyle.gameNumberInputButtonText}></Text>
                </Pressable>

                <Pressable style={HomeStyle.gameNumberInputButton} onPress={() => addNumberToScoreInput(0)}>
                    <Text style={HomeStyle.gameNumberInputButtonText}>0</Text>
                </Pressable>

                <Pressable style={HomeStyle.gameNumberInputButtonBlack} onPress={() => removeLastNumberFromScoreInput()}>
                    <Delete size={48} color={colors.black} fill={colors.white}/>
                </Pressable>
            </View>
        </View>
    )
}