import {StyleSheet, View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {setGroupsMessages, surprise_state, user_state} from '../../redux';
import {Color} from '../../components/theme';
import {
  onSnapshot,
  doc,
  collection,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import {db} from '../../../firebase';
import {Header} from '../components/header';
import {MessagingHeads} from '../components/messageHeads';
import {ChatHead} from '../components/chatHeads';
import {ChatScreen, SentMessage} from '../components/mesages';
import {ChatInput} from '../components/chatInput';
import {sendgroupmessage} from '../apis/sendgroupmessage';

const Colors = Color();

function SignIn({navigation, appState, route, setgroupmessages}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = appState.User;
  const group = appState.Group;

  const {groupid, groupname} = route.params;
  useEffect(() => {}, [group]);
  const STYLES = ['default', 'dark-content', 'light-content'];
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const [tempmessage, setTempMessage] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const sendMessage = async () => {
    try {
      setTempMessage(message);
      setMessage('');
      await sendgroupmessage(groupid, message, user?.mykey);
    } catch {
      setMessage(tempmessage);
      setTempMessage(message);
    }
  };
  return (
    <>
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={() => sendMessage()}
      />
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.light}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <Header
          page="chat group"
          groupname={group?.data?.name}
          groupid={groupid}
          groupphoto={group?.data?.photourl}
          navigation={navigation}
        />
        <ChatHead navigation={navigation} />

        <View style={{flex: 1, width: '100%', height: '100%'}}>
          <View
            style={{
              marginTop: 25,
              height: '100%',
              flex: 1,
            }}>
            <ChatScreen groupid={groupid} page="GROUP" user={user} />
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
    setgroupmessages: payload => dispatch(setGroupsMessages(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9FBFB',
    flex: 1,
  },
});
