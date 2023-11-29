import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image} from 'react-native';
import {DefaultTheme} from '@react-navigation/native';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';

import {connect} from 'react-redux';

import groups from '../pages/groups';
import chatgroup from '../pages/chatGroup';

import {Color} from '../../components/theme';
import editgroup from '../pages/editgroup';
import {MyGroups} from '../apis/groups';
import {setGroups} from '../../redux';

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

const Stack = createStackNavigator();

function HomeStack({appState, setgroups}) {
  const User = appState.User;
  const [data, setData] = useState([]);
  const getGroups = async () => {
    const result = await MyGroups(User.mykey);
    setData(result?.groups);
    setgroups(result?.groups);
  };
  useEffect(() => {
    getGroups();
  }, []);
  useEffect(() => {}, []);

  return (
    <Stack.Navigator
      initialRouteName="group"
      screenOptions={{
        // header: (props) => {
        //   <Header {...props} />
        // },
        transitionSpec: transition.transitionSpec,
        cardStyleInterpolator: transition.cardStyleInterpolator,
        headerStyle: {
          backgroundColor: headerColor,
        },
      }}>
      <Stack.Screen
        name="group"
        component={groups}
        initialParams={{groups: data}}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="chat group"
        component={chatgroup}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="update group"
        component={editgroup}
        options={{
          header: () => null,
        }}
      />

      {/* <Stack.Screen name='Payments' component={payments} options={{ title: "Make payment" }} /> */}
    </Stack.Navigator>
  );
}

const mapStateToProps = state => {
  return {
    appState: state.user,
  };
};

const mapDispatchToProps = (dispatch, encoded) => {
  return {
    // disp_category: (payload) => dispatch(categories(HomeStack)),
    setgroups: payload => dispatch(setGroups(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeStack);
