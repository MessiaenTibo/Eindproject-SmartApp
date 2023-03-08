import { Text, View, Button, Pressable } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()
    return (
        <View>
            <Text>New game</Text>
            <Pressable onPress={() => {navigate('Match');}}>
                <Text>Match</Text>
            </Pressable>
        </View>
    )
}