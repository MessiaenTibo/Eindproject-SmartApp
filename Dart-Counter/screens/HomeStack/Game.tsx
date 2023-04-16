import { Text, View, Button, Pressable, Dimensions } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStyle } from '../../Styles/generic';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { colors } from '../../Styles/colors';

import { ArrowRight, Delete, CornerDownLeft, Camera } from 'lucide-react-native';

export default (props:any) => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    let screenHeight = Dimensions.get('window').height;

    const {players, legs, sets, score }:{players:Array<{name:string, id:number}>,legs:number,sets:number,score:number} = props.route.params;
    // Camera
    let [camera, setCamera] = useState(false);

    // Game settings
    let AmountOfPlayers = players.length;
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [scoreInput, setScoreInput] = useState('');
    const [TotalLegs, setLegs] = useState(legs);
    const [TotalSets, setSets] = useState(sets);

    // Player 1
    const [namePlayer1, setNamePlayer1] = useState(players[0].name);
    const [scorePlayer1, setScorePlayer1] = useState(score);
    const [lastScorePlayer1, setLastScorePlayer1] = useState(-1);
    let [lastscoresPlayer1, setLastscoresPlayer1] = useState([0]);

    const [dartsThrownPlayer1, setDartsThrownPlayer1] = useState(0);
    const [threeDartAvgPlayer1, setThreeDartAvgPlayer1] = useState(0.00);
    const [legsPlayer1, setLegsPlayer1] = useState(0);
    const [setsPlayer1, setSetsPlayer1] = useState(0);

    // Player 2
    const [namePlayer2, setNamePlayer2] = useState('');
    useEffect(() => {
        if(players[1])setNamePlayer2(players[1].name);
    }, []);
    const [scorePlayer2, setScorePlayer2] = useState(score);
    const [lastScorePlayer2, setLastScorePlayer2] = useState(-1);
    let [lastscoresPlayer2, setLastscoresPlayer2] = useState([0]);

    const [dartsThrownPlayer2, setDartsThrownPlayer2] = useState(0);
    const [threeDartAvgPlayer2, setThreeDartAvgPlayer2] = useState(0);
    const [legsPlayer2, setLegsPlayer2] = useState(0);
    const [setsPlayer2, setSetsPlayer2] = useState(0);

    const next = () => {
        // convert score input to int
        if(scoreInput === '') return;
        let scoreInputInt = parseInt(scoreInput);

        // Change score
        if (currentPlayer === 1 && scorePlayer1 - scoreInputInt >= 0) {
            setScorePlayer1(scorePlayer1 - scoreInputInt);
            setLastScorePlayer1(scoreInputInt);
            setDartsThrownPlayer1(dartsThrownPlayer1 + 3);
            if(AmountOfPlayers > 1) setCurrentPlayer(2);
            let temp = lastscoresPlayer1
            temp.push(scoreInputInt);
            setLastscoresPlayer1(temp);
            let temp2 = 0;
            temp.map((score:number) => {
                temp2 += score;
            })
            setThreeDartAvgPlayer1(temp2/(temp.length - 1));
        } else if (currentPlayer === 2 && scorePlayer2 - scoreInputInt >= 0){
            setScorePlayer2(scorePlayer2 - scoreInputInt);
            setLastScorePlayer2(scoreInputInt);
            setDartsThrownPlayer2(dartsThrownPlayer2 + 3);
            setCurrentPlayer(1);
            let temp = lastscoresPlayer2
            temp.push(scoreInputInt);
            setLastscoresPlayer2(temp);
            let temp2 = 0;
            temp.map((score:number) => {
                temp2 += score;
            })
            setThreeDartAvgPlayer2(temp2/(temp.length - 1));
        }

        // Reset score input
        setScoreInput('');

        // Check if game is over
        if (currentPlayer === 1 && scorePlayer1 - scoreInputInt === 0) {
            setLegsPlayer1(legsPlayer1 + 1);
            setScorePlayer1(score);
            setScorePlayer2(score);
            setDartsThrownPlayer1(0);
            setDartsThrownPlayer2(0);
            setThreeDartAvgPlayer1(0);
            setThreeDartAvgPlayer2(0);
            setLastscoresPlayer1([0]);
            if(legsPlayer1 + 1 === TotalLegs) {
                setSetsPlayer1(setsPlayer1 + 1);
                if(setsPlayer1 + 1 === TotalSets)
                {
                    alert(namePlayer1 + ' won!');
                    navigate('Statistics');
                }
                setLegsPlayer1(0);
                setLegsPlayer2(0);
            }
        } else if (currentPlayer === 2 && scorePlayer2 - scoreInputInt === 0) {
            setLegsPlayer2(legsPlayer2 + 1);
            setScorePlayer1(score);
            setScorePlayer2(score);
            setDartsThrownPlayer1(0);
            setDartsThrownPlayer2(0);
            setThreeDartAvgPlayer1(0);
            setThreeDartAvgPlayer2(0);
            setLastscoresPlayer2([0]);
            if(legsPlayer2 + 1 === TotalLegs) {
                setSetsPlayer2(setsPlayer2 + 1);
                if(setsPlayer2 + 1 === TotalSets)
                {
                    alert(namePlayer2 + ' won!');
                    navigate('Statistics');
                }
                setLegsPlayer1(0);
                setLegsPlayer2(0);
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
            setThreeDartAvgPlayer1(((score - scorePlayer1 ) / dartsThrownPlayer1) * 3);
            setCurrentPlayer(1);
            lastscoresPlayer1.pop();
        } else if(currentPlayer === 1 && lastscoresPlayer2.length > 1) {
            setScorePlayer2(scorePlayer2 + lastscoresPlayer2[lastscoresPlayer2.length - 1]);
            setLastScorePlayer2(lastscoresPlayer2[lastscoresPlayer2.length - 2]);
            setDartsThrownPlayer2(dartsThrownPlayer2 - 3);
            setThreeDartAvgPlayer2(((score - scorePlayer2 ) / dartsThrownPlayer2) * 3);
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
                        <Text style={HomeStyle.gameLegsText}>Sets: {setsPlayer1}</Text>
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
                        <Text style={HomeStyle.gameLegsText}>Sets: {setsPlayer2}</Text>
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

                <Pressable style={HomeStyle.gameNumberInputButtonBlack} onPress={() => navigate('Camera')}>
                    <Camera size={48} color={colors.black} fill={colors.white} />
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