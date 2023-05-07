// React Native
import { Text, View, Pressable } from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Styles
import { HomeStyle } from '../../Styles/generic';


export default () => {
    // Navigation
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()
    
    return (
        <View style={HomeStyle.container2}>
            <Pressable style={HomeStyle.button3} onPress={() => {navigate('Match');}}>
                <Text style={HomeStyle.buttonText}>Match</Text>
            </Pressable>

            <Pressable style={HomeStyle.button3Disabled}>
                <Text style={HomeStyle.buttonText}>Cricket/Tactics</Text>
            </Pressable>

            <Pressable style={HomeStyle.button3Disabled}>
                <Text style={HomeStyle.buttonText}>Bob's 27</Text>
            </Pressable>

            <Pressable style={HomeStyle.button3Disabled}>
                <Text style={HomeStyle.buttonText}>Singles training</Text>
            </Pressable>

            <Pressable style={HomeStyle.button3Disabled}>
                <Text style={HomeStyle.buttonText}>Doubles training</Text>
            </Pressable>

            <Pressable style={HomeStyle.button3Disabled}>
                <Text style={HomeStyle.buttonText}>Score training</Text>
            </Pressable>

        </View>
    )
}