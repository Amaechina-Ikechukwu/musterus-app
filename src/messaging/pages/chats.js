import {StyleSheet, View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {setChatlist, surprise_state, user_state} from '../../redux';
import {Color} from '../../components/theme';
import {DividerIcon} from '../../events/components/icons';
import {Divider, Avatar} from 'react-native-paper';
import {BottomTab} from '../../events/components/bottomTab';
import {Header} from '../components/header';
import {MessagingHeads} from '../components/messageHeads';
import {chatlist} from '../apis/chatlist';
import {ChatMessagingHeads} from '../components/ChatMessageHead';
import ChatFlatlist from '../components/ChatFlatlist';

const Colors = Color();

function SignIn({navigation, appState, setchatlist}) {
  const {User, Profile} = appState;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getChatList = async () => {
    const result = await chatlist(User?.mykey);
    setchatlist(result.chats);
  };

  useEffect(() => {
    getChatList();
  }, []);
  useEffect(() => {}, [data]);
  const STYLES = ['default', 'dark-content', 'light-content'];
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <BottomTab page="Chat" navigation={navigation} />
      <Header
        page="Chat"
        navigation={navigation}
        profile={Profile}
        user={User?.mykey}
      />
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.light}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <View style={{width: '100%', height: '100%'}}>
          <View
            style={{
              marginBottom: 80,
              marginTop: 80,
              width: '100%',
              height: '100%',
            }}>
            <View style={{width: '100%', height: '100%'}}>
              <ChatFlatlist
                navigation={navigation}
                data={data}
                mykey={User?.mykey}
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
    setchatlist: payload => dispatch(setChatlist(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});
