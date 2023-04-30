import { Text, View, Button, Pressable, Dimensions, Alert } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStyle } from '../../Styles/generic';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { colors } from '../../Styles/colors';

import { ArrowRight, Delete, CornerDownLeft, Camera } from 'lucide-react-native';

import useHttpRequests from '../../hooks/useHttpRequests';
import useFirebase from '../../hooks/useFirebase';

export default (props:any) => {

    const { getUserInfo } = useFirebase();

    const [profileUid, onChangeProfileUid] = useState("randomstring");

    useEffect(() => {
        if(getUserInfo().uid != "") onChangeProfileUid(getUserInfo().uid);
    }, [getUserInfo().uid])

    const { postAsync } = useHttpRequests();

    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    let screenHeight = Dimensions.get('window').height;

    const {players, legs, sets, score, throwIn, throwOut}:{players:Array<{name:string, id:number}>,legs:number,sets:number,score:number,throwIn:string,throwOut:string} = props.route.params;
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
    //stats player 1
    const [highestScorePlayer1, setHighestScorePlayer1] = useState(0);
    const [highestCheckoutPlayer1, setHighestCheckoutPlayer1] = useState(0);
    const [checkoutPercentagePlayer1, setCheckoutPercentagePlayer1] = useState(0);
    const [checkoutThrowsPlayer1, setCheckoutThrowsPlayer1] = useState(0);
    const [checkoutHitsPlayer1, setCheckoutHitsPlayer1] = useState(0);
    const [fourtyPlusPlayer1, setFourtyPlusPlayer1] = useState(0);
    const [sixtyPlusPlayer1, setSixtyPlusPlayer1] = useState(0);
    const [eightyPlusPlayer1, setEightyPlusPlayer1] = useState(0);
    const [hundredPlusPlayer1, setHundredPlusPlayer1] = useState(0);
    const [oneTwentyPlusPlayer1, setOneTwentyPlusPlayer1] = useState(0);
    const [oneFourtyPlusPlayer1, setOneFourtyPlusPlayer1] = useState(0);
    const [oneSixtyPlusPlayer1, setOneSixtyPlusPlayer1] = useState(0);
    const [oneEightyPlayer1, setOneEightyPlayer1] = useState(0);


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
    //stats player 2
    const [highestScorePlayer2, setHighestScorePlayer2] = useState(0);
    const [highestCheckoutPlayer2, setHighestCheckoutPlayer2] = useState(0);
    const [checkoutPercentagePlayer2, setCheckoutPercentagePlayer2] = useState(0);
    const [checkoutThrowsPlayer2, setCheckoutThrowsPlayer2] = useState(0);
    const [checkoutHitsPlayer2, setCheckoutHitsPlayer2] = useState(0);
    const [fourtyPlusPlayer2, setFourtyPlusPlayer2] = useState(0);
    const [sixtyPlusPlayer2, setSixtyPlusPlayer2] = useState(0);
    const [eightyPlusPlayer2, setEightyPlusPlayer2] = useState(0);
    const [hundredPlusPlayer2, setHundredPlusPlayer2] = useState(0);
    const [oneTwentyPlusPlayer2, setOneTwentyPlusPlayer2] = useState(0);
    const [oneFourtyPlusPlayer2, setOneFourtyPlusPlayer2] = useState(0);
    const [oneSixtyPlusPlayer2, setOneSixtyPlusPlayer2] = useState(0);
    const [oneEightyPlayer2, setOneEightyPlayer2] = useState(0);
    

    const next = () => {
        // convert score input to int
        if(scoreInput === '') return;
        let scoreInputInt = parseInt(scoreInput);
        if(scoreInputInt > 180)
        {
            Alert.alert("Impossible score", "Score cannot be higher than 180");
            setScoreInput('');
            return;
        }

        // Change score
        if (currentPlayer === 1 && scorePlayer1 - scoreInputInt >= 0) {
            updateStatsPlayer1(scoreInputInt);
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
            updateStatsPlayer2(scoreInputInt);
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
        } else if (currentPlayer === 1 && scorePlayer1 - scoreInputInt < 0) {
            updateStatsPlayer1(0);
            setLastScorePlayer1(0);
            setDartsThrownPlayer1(dartsThrownPlayer1 + 3);
            if(AmountOfPlayers > 1) setCurrentPlayer(2);
            let temp = lastscoresPlayer1
            temp.push(0);
            setLastscoresPlayer1(temp);
            let temp2 = 0;
            temp.map((score:number) => {
                temp2 += score;
            })
            setThreeDartAvgPlayer1(temp2/(temp.length - 1));
        } else if (currentPlayer === 2 && scorePlayer2 - scoreInputInt < 0) {
            updateStatsPlayer2(0);
            setLastScorePlayer2(0);
            setDartsThrownPlayer2(dartsThrownPlayer2 + 3);
            setCurrentPlayer(1);
            let temp = lastscoresPlayer2
            temp.push(0);
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
            setCheckoutHitsPlayer1(checkoutHitsPlayer1 + 1);
            setCheckoutThrowsPlayer1(checkoutThrowsPlayer1 + 1);
            if(scoreInputInt > highestCheckoutPlayer1) setHighestCheckoutPlayer1(scoreInputInt);
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
                    Alert.alert("Save", namePlayer1 + " won!", [
                        {
                            text: "Ok", onPress: () => {
                                const gameResults = GetGameResults();
                                postAsync("https://webappdartcounter.azurewebsites.net/games", gameResults)
                                navigate('GameResults', {gameResults: gameResults});
                            }
                        },
                    ])
                }
                setLegsPlayer1(0);
                setLegsPlayer2(0);
            }
        } else if (currentPlayer === 2 && scorePlayer2 - scoreInputInt === 0) {
            setCheckoutHitsPlayer2(checkoutHitsPlayer2 + 1);
            setCheckoutThrowsPlayer2(checkoutThrowsPlayer2 + 1);
            if(scoreInputInt > highestCheckoutPlayer2) setHighestCheckoutPlayer2(scoreInputInt);
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
                    Alert.alert("Save", namePlayer2 + " won!", [
                        {
                            text: "Ok", onPress: () => {
                                const gameResults = GetGameResults();
                                postAsync("https://webappdartcounter.azurewebsites.net/games", gameResults)
                                navigate('GameResults', {gameResults: gameResults});
                            }
                        },
                    ])
                }
                setLegsPlayer1(0);
                setLegsPlayer2(0);
            }
        }

    }

    const updateStatsPlayer1 = (scoreInputInt: number) => {
        if ( scoreInputInt > highestScorePlayer1) setHighestScorePlayer1(scoreInputInt);
        if ( scoreInputInt > 40) setFourtyPlusPlayer1(fourtyPlusPlayer1 + 1);
        if ( scoreInputInt > 60) setSixtyPlusPlayer1(sixtyPlusPlayer1 + 1);
        if ( scoreInputInt > 80) setEightyPlusPlayer1(eightyPlusPlayer1 + 1);
        if ( scoreInputInt > 100) setHundredPlusPlayer1(hundredPlusPlayer1 + 1);
        if ( scoreInputInt > 120) setOneTwentyPlusPlayer1(oneTwentyPlusPlayer1 + 1);
        if ( scoreInputInt > 140) setOneFourtyPlusPlayer1(oneFourtyPlusPlayer1 + 1);
        if ( scoreInputInt > 160) setOneSixtyPlusPlayer1(oneSixtyPlusPlayer1 + 1);
        if ( scoreInputInt == 180) setOneEightyPlayer1(oneEightyPlayer1 + 1);
        if ( scorePlayer1 < 40 ) {
            setCheckoutThrowsPlayer1(checkoutThrowsPlayer1 + 3);
            setCheckoutPercentagePlayer1((checkoutHitsPlayer1 / checkoutThrowsPlayer1) * 100);
        } else if(scorePlayer1 <= 180){
            setCheckoutThrowsPlayer1(checkoutThrowsPlayer1 + 1);
            setCheckoutPercentagePlayer1((checkoutHitsPlayer1 / checkoutThrowsPlayer1) * 100);
        }
    }

    const updateStatsPlayer2 = (scoreInputInt: number) => {
        if ( scoreInputInt > highestScorePlayer2) setHighestScorePlayer2(scoreInputInt);
        if ( scoreInputInt >= 40) setFourtyPlusPlayer2(fourtyPlusPlayer2 + 1);
        if ( scoreInputInt >= 60) setSixtyPlusPlayer2(sixtyPlusPlayer2 + 1);
        if ( scoreInputInt >= 80) setEightyPlusPlayer2(eightyPlusPlayer2 + 1);
        if ( scoreInputInt >= 100) setHundredPlusPlayer2(hundredPlusPlayer2 + 1);
        if ( scoreInputInt >= 120) setOneTwentyPlusPlayer2(oneTwentyPlusPlayer2 + 1);
        if ( scoreInputInt >= 140) setOneFourtyPlusPlayer2(oneFourtyPlusPlayer2 + 1);
        if ( scoreInputInt >= 160) setOneSixtyPlusPlayer2(oneSixtyPlusPlayer2 + 1);
        if ( scoreInputInt == 180) setOneEightyPlayer2(oneEightyPlayer2 + 1);
        if ( scorePlayer2 < 40 ) {
            setCheckoutThrowsPlayer2(checkoutHitsPlayer2 + 3);
            setCheckoutPercentagePlayer2((checkoutHitsPlayer2 / checkoutThrowsPlayer2) * 100);
        } else if(scorePlayer2 <= 180){
            setCheckoutThrowsPlayer2(checkoutHitsPlayer2 + 1);
            setCheckoutPercentagePlayer2((checkoutHitsPlayer2 / checkoutThrowsPlayer2) * 100);
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

    const GetGameResults = () => {
        const date = new Date(Date.now());
        const dateFormatted = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        let gameResults = {}
        if(AmountOfPlayers == 1)gameResults = {
            title: TotalSets == 1 ? 'First to ' + TotalLegs + ' legs' : 'First to ' + TotalSets + ' sets',
            date: dateFormatted,
            playerAmount: AmountOfPlayers,
            legs: TotalLegs,
            sets: TotalSets,
            score: score,
            throwIn: throwIn,
            throwOut: throwOut,
            player1: {
                playerID: profileUid,
                darts: dartsThrownPlayer1,
                username: namePlayer1,
                won: true,
                threeDartAvg: threeDartAvgPlayer1.toFixed(2),
                highestScore: highestScorePlayer1,
                highestCheckout: highestCheckoutPlayer1,
                checkouts:{
                    hits: checkoutHitsPlayer1 + 1,
                    throws: checkoutThrowsPlayer1 + 1,
                },
                fourtyPlus: fourtyPlusPlayer1,
                sixtyPlus: sixtyPlusPlayer1,
                eightyPlus: eightyPlusPlayer1,
                hundredPlus: hundredPlusPlayer1,
                oneTwentyPlus: oneTwentyPlusPlayer1,
                oneFourtyPlus: oneFourtyPlusPlayer1,
                oneSixtyPlus: oneSixtyPlusPlayer1,
                oneEighty: oneEightyPlayer1,
            },
        }
        else gameResults = {
            title: namePlayer1 + ' vs ' + namePlayer2,
            date: dateFormatted,
            playerAmount: AmountOfPlayers,
            legs: TotalLegs,
            sets: TotalSets,
            score: score,
            throwIn: throwIn,
            throwOut: throwOut,
            player1: {
                playerID: profileUid,
                username: namePlayer1,
                won: setsPlayer1 > setsPlayer2 ? true : false,
                threeDartAvg: threeDartAvgPlayer1.toFixed(2),
                highestScore: highestScorePlayer1,
                highestCheckout: highestCheckoutPlayer1,
                checkouts:{
                    hits: setsPlayer1 > setsPlayer2 ? checkoutHitsPlayer1 + 1 : checkoutHitsPlayer1,
                    throws: setsPlayer1 > setsPlayer2 ? checkoutThrowsPlayer1 + 1 : checkoutThrowsPlayer1,
                },
                fourtyPlus: fourtyPlusPlayer1,
                sixtyPlus: sixtyPlusPlayer1,
                eightyPlus: eightyPlusPlayer1,
                hundredPlus: hundredPlusPlayer1,
                oneTwentyPlus: oneTwentyPlusPlayer1,
                oneFourtyPlus: oneFourtyPlusPlayer1,
                oneSixtyPlus: oneSixtyPlusPlayer1,
                oneEighty: oneEightyPlayer1,
            },
            player2: {
                playerID: 'bcd234',
                darts: dartsThrownPlayer2,
                username: namePlayer2,
                won: setsPlayer1 < setsPlayer2 ? true : false,
                threeDartAvg: threeDartAvgPlayer2.toFixed(2),
                highestScore: highestScorePlayer2,
                highestCheckout: highestCheckoutPlayer2,
                checkouts:{
                    hits: setsPlayer1 < setsPlayer2 ? checkoutHitsPlayer2 + 1 : checkoutHitsPlayer2,
                    throws: setsPlayer1 < setsPlayer2 ? checkoutThrowsPlayer2 + 1 : checkoutThrowsPlayer2,
                },
                fourtyPlus: fourtyPlusPlayer2,
                sixtyPlus: sixtyPlusPlayer2,
                eightyPlus: eightyPlusPlayer2,
                hundredPlus: hundredPlusPlayer2,
                oneTwentyPlus: oneTwentyPlusPlayer2,
                oneFourtyPlus: oneFourtyPlusPlayer2,
                oneSixtyPlus: oneSixtyPlusPlayer2,
                oneEighty: oneEightyPlayer2,
            },
        }
        return gameResults;
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

                        <Text style={HomeStyle.gameScoreText}>3-dart avg.: {threeDartAvgPlayer1.toFixed(2)}</Text>
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

                        <Text style={HomeStyle.gameScoreText}>3-dart avg.: {threeDartAvgPlayer2.toFixed(2)}</Text>
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