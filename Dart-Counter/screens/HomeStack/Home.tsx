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
            <BigButton title="New game"/>
            <BigButton title='Play online'/>
            <BigButton title='Let our MasterCaller announce your name'/>
            <BigButton title='View your statistics'/>
        </View>
    )
}