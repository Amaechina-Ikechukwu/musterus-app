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
import {db, storage} from '../../../firebase';
import {Header} from '../components/header';
import {MessagingHeads} from '../components/messageHeads';
import {ChatHead} from '../components/chatHeads';
import {ChatScreen, SentMessage} from '../components/mesages';
import {ChatInput} from '../components/chatInput';
import {sendgroupmessage} from '../apis/sendgroupmessage';
import {fullgroupinfo} from '../apis/groupinfo';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
const Colors = Color();

function SignIn({navigation, appState, route, setgroupmessages}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = appState.User;
  const group = appState.Group;
  const getGroupInfo = async () => {
    const result = await fullgroupinfo(user?.mykey, group?.groupID);

    setData(result.data.group);
  };

  useEffect(() => {
    getGroupInfo();
  }, []);
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
  const [recentImages, setRecentImages] = useState([]);
  const ChooseImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      quality: 1,
    });

    if (!result.canceled) {
      // Use "canceled" instead of "cancelled"
      setImage(result.assets[0].uri);
      setpickImage(true);
    }
  };

  // Function to upload image to Firebase Storage

  useEffect(() => {}, [uploadProgress]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');

  const uploadImageToFirebase = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(image);
        const blob = await response.blob();

        const storageRef = ref(
          storage,
          `groupchatschats/${groupid}/${image.split('/').pop()}`,
        );
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            setUploadProgress(progress);
          },
          error => {
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

              setDownloadURL(downloadURL);
              resolve(downloadURL);
            } catch (downloadError) {
              console.error('Error getting download URL: ', downloadError);
              reject(downloadError);
            }
          },
        );
      } catch (error) {
        console.error('Error uploading image: ', error);
        reject(error);
      }
    });
  };

  return (
    <>
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={() => sendMessage()}
        image={image}
        ChooseImage={ChooseImage}
        isSending={isSending}
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
          isadmin={data?.admin == user?.mykey}
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
