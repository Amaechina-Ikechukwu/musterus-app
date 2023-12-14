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
import creategroup from '../pages/creategroup';
import SingleGroupInfo from '../pages/SingleGroupInfo';
import AddUserToGroup from '../components/AddUserToGroup';
import {getgroups} from '../oldapis/groups/groups';
import GroupPostViewFlatlist from '../components/GroupPostViewFlatlist';

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
  const {User, Groups, Profile} = appState;
  const [data, setData] = useState([]);
  const getGroups = async () => {
    const result = await getgroups(User.mykey, User?.mskl, Profile.uid, 3);
    console.log(JSON.stringify(result, null, 2));
    // setData(result?.groups);
    setgroups(result?.Groups);
  };
  useEffect(() => {
    getGroups();
  }, []);
  useEffect(() => {}, [Groups]);

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
        name="group post"
        component={GroupPostViewFlatlist}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="group info"
        component={SingleGroupInfo}
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
      <Stack.Screen
        name="create group"
        component={creategroup}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="addusertogroup"
        component={AddUserToGroup}
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
