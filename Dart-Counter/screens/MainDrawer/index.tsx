import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";

import Settings from "./Settings"
import Overview from "./Overview"
import { Text } from 'react-native';

const Drawer = createDrawerNavigator();

export function MainDrawer () {
    return (
        <Drawer.Navigator initialRouteName="Home"
            // screenOptions={{
            //     headerShown: false,
            // }}
        >
            <Drawer.Screen name="Overview" component={Overview} options={{headerShown: false,}}/>
            <Drawer.Screen name="Settings" component={Settings} options={{title: 'Settings'}}/>
        </Drawer.Navigator>
    );
}