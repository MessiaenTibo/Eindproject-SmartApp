import { Text, View, Button, Pressable } from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import ProfileHeader from '../../Components/ProfileHeader';
import BigButton from '../../Components/BigButton';


export default () => {
    const { navigate, setOptions, goBack } = useNavigation<StackNavigationProp<ParamListBase, 'HomeStack'>>()

    return (
        <View>
            <ProfileHeader />
            <BigButton/>
            <BigButton/>
            <BigButton/>
            <BigButton/>
        </View>
    )
}