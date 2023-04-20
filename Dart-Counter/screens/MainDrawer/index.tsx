import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";

import Settings from "./Settings"
import Overview from "./Overview"
import Profile from "./Profile"
import { Text, View } from 'react-native';

import { colors } from '../../Styles/colors';

import { Home } from 'lucide-react';

import Icon from 'react-native-vector-icons/FontAwesome'

const Drawer = createDrawerNavigator();

export function MainDrawer () {
    return (
        <Drawer.Navigator initialRouteName="Overview"
            screenOptions={{
                drawerActiveBackgroundColor: colors.orange,
                drawerInactiveBackgroundColor: colors.darkGrey,
                drawerStyle: {
                    backgroundColor: colors.darkGrey,
                },
                drawerLabelStyle: {
                    color: colors.white,
                },
            }}
        >
            <Drawer.Screen name="Overview" component={Overview} options={{headerShown: false, drawerIcon: () => (
                <Icon name="home" size={32} color={colors.white} />
            )}}/>
            <Drawer.Screen name="Profile" component={Profile} options={{title: 'Profile', drawerIcon: () => (
                <View style={{width: 32}}><Icon name="user" size={32} color={colors.white} /></View>
            )}}/>
            <Drawer.Screen name="Settings" component={Settings} options={{title: 'Settings', drawerIcon: () => (
                <Icon name="gear" size={32} color={colors.white} />
            )}}/>
        </Drawer.Navigator>
    );
}