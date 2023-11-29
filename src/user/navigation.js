import React, {useState, useEffect} from 'react';
import {DefaultTheme} from '@react-navigation/native';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Onbording from '../components/onboarding';
import {Onborded} from '../controllers/auth/authController';
import Web from '../screens/web';
import EditProfile from './screens/edit-profile';
import Reset_Pwd from './screens/reset-pwd';
import profile from './screens/profile';

import HelloFriday from '../components/drawerContents';

const headerColor = '#fffdfb';
const navTheme = DefaultTheme;
navTheme.colors.background = headerColor;

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

export default function ProfileStack({navigation, route}) {
  const [isOnoarded, setOnboarded] = useState();
  const {close, user} = route.params;

  Onborded().then(res => {
    if (res == 1) {
      setOnboarded(true);
    } else {
      setOnboarded(false);
    }
  });

  return (
    <Drawer.Navigator
      drawerContent={props => (
        <HelloFriday {...props} navigate={() => close()} />
      )}
      // initialRouteName={isOnoarded == true ? "WEB" : "Home"}
      initialRouteName="Home"
      screenOptions={{
        transitionSpec: transition.transitionSpec,
        cardStyleInterpolator: transition.cardStyleInterpolator,
        headerStyle: {
          backgroundColor: headerColor,
        },
      }}>
      <Drawer.Screen
        initialParams={{user: user}}
        name="Home"
        component={profile}
        options={{
          header: () => null,
        }}
      />

      <Drawer.Screen
        name="Edit profile"
        component={EditProfile}
        options={{
          header: () => null,
        }}
      />

      <Drawer.Screen
        name="Reset pwd"
        component={Reset_Pwd}
        options={{
          header: () => null,
        }}
      />
    </Drawer.Navigator>
  );
}
