import {StyleSheet, View, Text, StatusBar, Alert} from 'react-native';
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
import {ChatHead} from '../components/chatHeads';
import {ChatScreen, SentMessage} from '../components/mesages';
import {ChatInput} from '../components/chatInput';
import {ChatMessages} from '../components/chatmessages';
import {sendmessage} from '../apis/sendDM';
import {initializechat} from '../apis/initializechat';
import {usersfullprofile} from '../../user/apis/profile';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from '../../../firebase';

import * as ImagePicker from 'expo-image-picker';
const Colors = Color();

function SignIn({navigation, appState, route, setchatlist}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {friendid} = route?.params;
  const {User} = appState;
  const getProfile = async () => {
    const result = await usersfullprofile(friendid);
    setData(result);
  };
  useEffect(() => {
    initializechat(User?.mykey, friendid);
    getProfile();
  }, []);
  useEffect(() => {}, [data]);

  const STYLES = ['default', 'dark-content', 'light-content'];
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const [message, setMessage] = useState('');
  const [tempmessage, setTempMessage] = useState('');
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
      await sendmessage(User?.mykey, friendid, message, url);
      setTempMessage('');
      setImage();
      setIsSending('');
    } catch (err) {
      setMessage(tempmessage);
      Alert.alert('Sending', 'Couldnt send message at this time');
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
          `chats/${User?.mykey + '_' + friendid}/${image.split('/').pop()}`,
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
        ChooseImage={() => ChooseImage()}
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
          page="Chat"
          navigation={navigation}
          profile={data}
          user={User.mykey}
        />
        <ChatHead navigation={navigation} page="PERSON" />
        <View style={{flex: 1, width: '100%', height: '100%'}}>
          <View style={{width: '100%', height: '100%'}}>
            <View
              style={{
                marginTop: 25,
                width: '100%',
                height: '100%',
                flex: 1,
              }}>
              <ChatMessages
                message={message}
                setMessage={setMessage}
                user={User}
                route={route}
                image={image}
                ChooseImage={() => ChooseImage()}
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
    backgroundColor: '#E9FBFB',
    flex: 1,
  },
});
