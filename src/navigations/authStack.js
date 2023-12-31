import React, {useState, useEffect} from 'react';
import {DefaultTheme} from '@react-navigation/native';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Onbording from '../components/onboarding';
import {Onborded} from '../controllers/auth/authController';
import Web from '../screens/web';
import EditProfile from '../user/screens/edit-profile';
import Add_details from '../user/screens/reset-pwd';

import {HelloFriday} from '../components/drawerContents';
import Signin from '../auth/pages/signin';
import Signup from '../auth/pages/signup';
import AddProfilePicture from '../auth/pages/add-photo';
import Getstarted from '../auth/pages/get-started';
import SendOTP from '../auth/pages/add-email';
import EnterOTP from '../auth/pages/enter-otp';
import ResetPWD from '../auth/pages/reset-pwd';
import Logout from '../auth/pages/logout';

import {Color} from '../components/theme';
import followusers from '../auth/pages/followusers';

const headerColor = '#fffdfb';
const navTheme = DefaultTheme;
navTheme.colors.background = headerColor;

const Colors = Color();
const transition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({current, layouts}) => {
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AuthStack({appState, route}) {
  const [isOnoarded, setOnboarded] = useState();
  const {logged} = route.params;
  Onborded().then(res => {
    if (res == 1) {
      setOnboarded(true);
    } else {
      setOnboarded(false);
    }
  });
  return (
    <Stack.Navigator
      // initialRouteName={isOnoarded == true ? "WEB" : "Home"}
      initialRouteName="Signin"
      screenOptions={{
        transitionSpec: transition.transitionSpec,
        cardStyleInterpolator: transition.cardStyleInterpolator,
        headerStyle: {
          backgroundColor: headerColor,
        },
      }}>
      <Stack.Screen
        name="Signin"
        component={Signin}
        initialParams={{logged: () => logged()}}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        initialParams={{logged: () => logged()}}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Get Started"
        component={Getstarted}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Add email"
        component={SendOTP}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Add-Photo"
        component={AddProfilePicture}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Follow-Users"
        component={followusers}
        options={{header: () => null}}
        initialParams={{logged: () => logged()}}
      />
      <Stack.Screen
        name="Enter OTP"
        component={EnterOTP}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="RESET PWD"
        component={ResetPWD}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
