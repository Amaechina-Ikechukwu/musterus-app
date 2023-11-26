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
import {chatlist} from '../apis/chatlist';
import {ChatMessagingHeads} from '../components/ChatMessageHead';

const Colors = Color();

function SignIn({navigation, appState}) {
  const {User, Profile} = appState;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getChatList = async () => {
    const result = await chatlist(User.mykey, User.mskl);
    console.log({result});
  };

  useEffect(() => {
    getChatList();
  }, []);

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
      <Header page="Chat" />
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.light}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <ScrollView>
          <View style={{width: '100%'}}>
            <View
              style={{
                marginBottom: 80,
                marginTop: 80,
                // marginHorizontal: 15
              }}>
              <View>
                <MessagingHeads
                  navigation={navigation}
                  page="chat person"
                  active={true}
                />
                {/* <Divider style={{
                                                    marginVertical: 15
                                                }} /> */}
              </View>
              <View>
                <ChatMessagingHeads
                  navigation={navigation}
                  page="chat person"
                  active={false}
                />
                {/* <Divider style={{
                                                    marginVertical: 15
                                                }} /> */}
              </View>
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
    backgroundColor: Colors.background,
    flex: 1,
  },
});
