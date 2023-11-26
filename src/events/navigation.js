import React, { useState, useEffect } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import Comment from "./pages/comment"
// index===================
import Feeds from "./pages/index"

// search ==========================
import Search from "./pages/search"
import { Color } from '../components/theme';
 

const headerColor = '#fffdfb'
const navTheme = DefaultTheme;
navTheme.colors.background = headerColor;


const transition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: ({ current, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        };
    },
};


// const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
// const Drawer = createDrawerNavigator(); 

export default function BCSEventStack({ appState }) {

    const [isOnoarded, setOnboarded] = useState()
 
    const Colors = Color()
    return (
        <Stack.Navigator

            // initialRouteName={isOnoarded == true ? "WEB" : "Home"}
            initialRouteName="index"
            screenOptions={{
                transitionSpec: transition.transitionSpec,
                cardStyleInterpolator: transition.cardStyleInterpolator,
                headerStyle: {
                    backgroundColor: headerColor,
                },
            }}
        >
            {/* feeds=================================== */}
            <Stack.Screen name='index' component={Feeds} options={{
                header: () => null,
                headerTintColor: Colors.DarkBlue,
                title: 'BCS-Connect',
                headerStyle: {
                    backgroundColor: Colors.white
                },
            }} />


            {/* search ================= */}
            <Stack.Screen name='Search' component={Search} options={{
                header: () => null,
            }} />

             {/* comment ================= */}
             <Stack.Screen name='Comment' component={Comment} options={{
                header: () => null,
            }} />


        </Stack.Navigator>
    )
} 