import React, { useState, useEffect } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import MusterPoint from './pages/index';
import { Color } from '../components/theme';
 
const headerColor = '#fffdfb'
const navTheme = DefaultTheme;
navTheme.colors.background = headerColor;

const Colors = Color()
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


const Stack = createStackNavigator()

export default function MusterPointNavigation({ appState }) {

    return (
        <Stack.Navigator
            // initialRouteName={isOnoarded == true ? "WEB" : "Home"}
            initialRouteName="Index"
            screenOptions={{
                transitionSpec: transition.transitionSpec,
                cardStyleInterpolator: transition.cardStyleInterpolator,
                headerStyle: {
                    backgroundColor: headerColor,
                },
            }}
        >

            <Stack.Screen name='Signin' component={MusterPoint} options={{
                header: () => null
            }} />


        </Stack.Navigator>
    )
} 