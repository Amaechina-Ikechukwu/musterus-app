import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
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
import {db, storage} from '../../../firebase';
import Header from '../components/header';
import {MessagingHeads} from '../components/messageHeads';
import {ChatHead} from '../components/chatHeads';
import {ChatScreen, SentMessage} from '../components/mesages';
import {ChatInput} from '../components/chatInput';
import {sendgroupmessage} from '../apis/sendgroupmessage';
import {fullgroupinfo} from '../apis/groupinfo';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import {getgroupsview} from '../oldapis/groups/groupsview';
import {Style} from '../../../assets/styles';
import {PrimaryButton} from '../../components/buttons/primary';
import {subscribetogroup} from '../oldapis/groups/subscribetogroup';
import {getgroupsposts} from '../oldapis/groups/groupposts';
import GroupFlatListComponent from '../components/GroupPostFlatlist';
const Colors = Color();

function SignIn({navigation, appState, route, setgroupmessages}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUserMember, setIsUserMember] = useState();
  const user = appState.User;
  const {mykey, mskl} = user;
  const group = appState.Group;
  const {Profile} = appState;
  // const getGroupInfo = async () => {
  //   const result = await getgroupsview(
  //     user?.mykey,
  //     user?.mskl,
  //     group?.groupkey,
  //   );
  //   // console.log(JSON.stringify(result, null, 2));
  //   // setData(result.data.group);
  //   for (let index = 0; index < result?.Members.length; index++) {
  //     const element = result?.Members[index];

  //     if (element.profilekey === Profile.profilekey) {
  //       setIsUserMember(true);
  //       getGroupPost();
  //     } else {
  //       setIsUserMember(false);
  //     }
  //   }
  // };
  const memoizedGetGroupInfo = useMemo(() => {
    const getGroupInfo = async () => {
      const result = await getgroupsview(
        user?.mykey,
        user?.mskl,
        group?.groupkey,
      );
      // console.log(JSON.stringify(result, null, 2));
      // setData(result.data.group);
      let isUserMember = false;

      for (let index = 0; index < result?.Members.length; index++) {
        const element = result?.Members[index];

        if (element.profilekey === Profile.profilekey) {
          isUserMember = true;
          getGroupPost();
          break; // No need to continue loop if found
        } else {
          isUserMember = false;
        }
      }

      setIsUserMember(isUserMember);
    };

    return getGroupInfo;
  }, [group]);

  useLayoutEffect(() => {
    memoizedGetGroupInfo();
  }, [isUserMember]);
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
  const [isSending, setIsSending] = useState('');
  const sendMessage = async () => {
    setIsSending('Uploading');
    let url = '';
    if (image) {
      url = await uploadImageToFirebase();
    }
    setIsSending('Uploaded');
    try {
      setTempMessage(message);
      setMessage('');
      await sendgroupmessage(groupid, message, user?.mykey, url);
      setIsSending('');
      setImage();
    } catch {
      setMessage(tempmessage);
      setTempMessage(message);
    }
  };
  const [pickImage, setpickImage] = useState(false);
  const [image, setImage] = useState(null);

  const getGroupPost = async () => {
    const result = await getgroupsposts(
      mykey,
      mskl,
      Profile?.uid,
      group?.groupkey,
      0,
    );

    setData(result.Posts);
  };
  const subscribeToGroup = async () => {
    const result = await subscribetogroup(
      mykey,
      mskl,
      Profile?.uid,
      group?.groupkey,
    );

    setIsUserMember(result.status == 1 || result.status == 0);
    getGroupPost();
  };

  useEffect(() => {}, [group]);
  if (!isUserMember) {
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator />
      </View>
    </SafeAreaView>;
  }
  if (isUserMember == false) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '80%',

              backgroundColor: Colors.light,
              padding: 10,
              borderRadius: 5,
              gap: 20,
              paddingVertical: 20,
            }}>
            <Text
              style={[
                Style.boldText,
                {fontSize: 20, color: Colors.primary, fontWeight: '700'},
              ]}>
              {group?.groupname}
            </Text>
            <Text style={Style.boldText2}>
              Group Description: {group?.groupintro}
            </Text>
            <Text style={Style.Text}>
              Group Owner: {group?.firstname + ' ' + group?.lastname}
            </Text>
            <Text style={Style.Text}>
              Group Type: {group?.groupstatus == 1 ? 'Public' : 'Private'}
            </Text>
            <Text style={Style.Text}>Group Policy: {group?.grouppolicy}</Text>
            <View style={{marginTop: 10}}>
              <PrimaryButton
                title={'Subscribe To Group'}
                callBack={() => {
                  subscribeToGroup();
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
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
          groupname={group?.groupname}
          groupid={groupid}
          groupphoto={'https://www.musterus.com' + group?.groupheader}
          navigation={navigation}
          isadmin={group?.profilekey == user?.mykey}
        />
        <ChatHead navigation={navigation} />

        <View style={{flex: 1, width: '100%', height: '100%'}}>
          <View
            style={{
              marginTop: 25,
              height: '100%',
              flex: 1,
            }}>
            {data ? (
              <GroupFlatListComponent data={data} />
            ) : (
              <ActivityIndicator />
            )}
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
