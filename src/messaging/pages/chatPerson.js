import {StyleSheet, View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {surprise_state, user_state} from '../../redux';
import {Color} from '../../components/theme';
import {DividerIcon} from '../../events/components/icons';
import {Divider, Avatar} from 'react-native-paper';
import {BottomTab} from '../../events/components/bottomTab';
import {Header} from '../components/header';
import {MessagingHeads} from '../components/messageHeads';
import {ChatHead} from '../components/chatHeads';
import {ChatScreen, SentMessage} from '../components/mesages';
import {ChatInput} from '../components/chatInput';
import {ChatMessages} from '../components/chatmessages';
import {sendmessage} from '../apis/sendDM';

const Colors = Color();

function SignIn({navigation, appState, route}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {friendid} = route?.params;
  const {User} = appState;
  useEffect(() => {
    // console.log(route)
  }, []);

  const STYLES = ['default', 'dark-content', 'light-content'];
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const [message, setMessage] = useState('');
  const [tempmessage, setTempMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const sendMessage = async () => {
    try {
      setTempMessage(message);
      setMessage('');
      await sendmessage(User?.mykey, friendid, message);
      setTempMessage('');
    } catch (err) {
      setMessage(tempmessage);
      Alert.alert('Sending', 'Couldnt send message at this time');
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
        <Header page="Chat" />
        <ChatHead navigation={navigation} page="PERSON" />
        <ScrollView>
          <View style={{width: '100%'}}>
            <View
              style={{
                marginTop: 25,
                // marginHorizontal: 15
              }}>
              <ChatMessages
                message={message}
                setMessage={setMessage}
                user={User}
                route={route}
              />
            </View>
          </View>
        </ScrollView>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9FBFB',
    flex: 1,
  },
});
