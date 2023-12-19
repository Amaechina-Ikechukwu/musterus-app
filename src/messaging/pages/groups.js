import {StyleSheet, View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {setGroup, surprise_state, user_state} from '../../redux';
import {Color} from '../../components/theme';
import Header, {MessagingHeader} from '../components/header';
import {DividerIcon, PlusIcon} from '../../events/components/icons';
import {Divider, Avatar} from 'react-native-paper';
import {BottomTab} from '../../events/components/bottomTab';
import {MessagingHeads} from '../components/messageHeads';
import {MyGroups} from '../apis/groups';
import {Style} from '../../../assets/styles';
import GroupsList from '../components/groupflatlist';
import SuggestedGroups from '../components/SuggestedGroups';

const Colors = Color();

function SignIn({navigation, appState, route, setgroup}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {User, Groups, Profile} = appState;

  const STYLES = ['default', 'dark-content', 'light-content'];
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const [modalVisible, setModalVisible] = useState(false);
  if (Groups && Groups.length == 0) {
    return (
      <>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: Colors.primary,
            marginLeft: '5%',
            position: 'absolute',
            bottom: 90,
            borderRadius: 50,
            zIndex: 1000,
            width: 40,
            height: 50,
            elevation: 20,
            right: 15,
            // paddingBottom: 22
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('create group');
            }}
            style={{
              justifyContent: 'center',
              flex: 1,
              alignItems: 'flex-start',
            }}>
            <PlusIcon />
          </TouchableOpacity>
        </View>

        <Header
          page="Group Message"
          navigation={navigation}
          profile={Profile}
          user={User?.mykey}
        />
        <BottomTab page="Group" navigation={navigation} />
        <SafeAreaView style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor={Colors.light}
            barStyle={statusBarStyle}
            showHideTransition={statusBarTransition}
            hidden={hidden}
          />

          <View
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 100,
            }}>
            <Text>No groups available</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: Colors.primary,
          marginLeft: '5%',
          position: 'absolute',
          bottom: 90,
          borderRadius: 50,
          zIndex: 1000,
          width: 40,
          height: 50,
          elevation: 20,
          right: 15,
          // paddingBottom: 22
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('create group');
          }}
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'flex-start',
          }}>
          <PlusIcon />
        </TouchableOpacity>
      </View>

      <Header
        page="Group Message"
        navigation={navigation}
        profile={Profile}
        user={User?.mykey}
      />
      <BottomTab page="Group" navigation={navigation} />
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.light}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />

        <View style={{width: '100%'}}>
          <View
            style={{
              marginBottom: 80,
              marginTop: 80,
              // marginHorizontal: 15
            }}>
            <View>
              <GroupsList
                groupsData={Groups}
                navigation={navigation}
                mykey={User?.mykey}
                setSomething={setGroup}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const mapStateToProps = state => {
  return {
    appState: state.user,
  };
};

const mapDispatchToProps = (dispatch, encoded) => {
  return {
    disp_Login: payload => dispatch(user_state(payload)),
    disp_surprise: payload => dispatch(surprise_state(payload)),
    setgroup: payload => dispatch(setGroup(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});
