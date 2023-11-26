import React, { useEffect } from 'react';
import { Image } from "react-native"
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';

import { connect } from "react-redux";


 import notification from "../notification/page/index"
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

function HomeStack({ appState }) {
    const CartItems = appState.CartItems;

    const totalAmount = CartItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.qty;
    }, 0);

    return (
        <Stack.Navigator
            initialRouteName="Notification"
            screenOptions={{
                // header: (props) => {
                //   <Header {...props} />
                // }, 
                transitionSpec: transition.transitionSpec,
                cardStyleInterpolator: transition.cardStyleInterpolator,
                headerStyle: {
                    backgroundColor: headerColor,
                },
            }}
        >
            <Stack.Screen name='noti' component={notification} options={{
                header: () => null,
            }} /> 



            {/* <Stack.Screen name='Payments' component={payments} options={{ title: "Make payment" }} /> */}
        </Stack.Navigator>
    )
}

const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        // disp_category: (payload) => dispatch(categories(HomeStack)),
        // disp_ath: () => dispatch(initAuth()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeStack);
