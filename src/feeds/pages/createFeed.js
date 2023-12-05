import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Alert,
  StatusBar,
  BackHandler,
  Modal,
  Image,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Logo} from '../../components/icons';
import {PrimaryButton} from '../../components/buttons/primary';
import {Color} from '../../components/theme';
import {connect} from 'react-redux';
import {setPosts, surprise_state, user_state} from '../../redux';
import {Style} from '../../../assets/styles';
import {fetchFcmToken} from '../../utilities/fcntoken';
import {AddPhotoIcon, BackIcon} from '../../../assets/icons/auth-icons';
import {OutlinedInput} from '../../components/inputs';
import {FeedHeader} from '../components/feed-header';
import {UpcomingBirthdays} from '../components/upcoming-birthdays';
import {FeedCard, ImgUrl} from '../components/feed-card';
import {BottomTab} from '../components/bottomTab';
import {CreatePostModal} from '../components/createPost';
import {Posts} from '../../utilities/data';
// import RNPaystack from 'react-native-paystack';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

import * as ImagePicker from 'expo-image-picker';
import {createpost} from '../apis/createpost';
import {getposts} from '../apis/home';
import {storage} from '../../../firebase';
// import * as MediaLibrary from 'expo-media-library';

const Colors = Color();

function SignIn({navigation, appState, setposts}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [mediaurl, setMediaurl] = useState('');
  const [CreatePost, showCreatePost] = useState(false);
  const [pickImage, setpickImage] = useState(false);
  const {User} = appState;
  const [postToView, setPostToView] = useState();

  useEffect(() => {
    const handleBackPress = () => {
      if (CreatePost == true) {
        showCreatePost(false);
        // Return true to prevent the default behavior (app exit)
      }
      return true;
    };

    // Add event listener for hardware back button press
    // BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // // Cleanup the event listener when the component is unmounted
    // return () => {
    //     BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    // };
  }, [showCreatePost]);
  useEffect(() => {}, [uploadProgress]);
  const STYLES = ['default', 'dark-content', 'light-content'];
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );
  const [progress, onProgress] = useState();
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
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Use "canceled" instead of "cancelled"
      setImage(result.assets[0].uri);
      setpickImage(true);
    }
  };

  // Function to upload image to Firebase Storage
  useEffect(() => {}, [mediaurl]);
  useEffect(() => {}, [uploadProgress]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');

  const uploadImageToFirebase = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(image);
        const blob = await response.blob();

        const storageRef = ref(storage, `posts/${image.split('/').pop()}`);
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
            console.error('Error uploading image: ', error);
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

  const createPost = async () => {
    try {
      // Upload image before updating group data
      if (image) {
        const token = User?.mykey;
        const url = await uploadImageToFirebase();

        if (url) {
          await createpost(token, data, url);
        }
      } else {
        const token = User?.mykey;
        await createpost(token, data);
      }
    } catch (err) {
      Alert.alert('Error creating post');
    }
  };

  const getHomeFeed = async () => {
    setTimeout(async () => {
      const result = await getposts(User?.mykey);
      setposts(result.data);

      navigation.goBack();
    }, 3000);
  };

  return (
    <>
      <CreatePostModal
        pickImage={pickImage}
        setpickImage={setpickImage}
        showCreatePost={showCreatePost}
        data={data}
        chooseimage={() => ChooseImage()}
        image={image}
        setData={setData}
        progress={uploadProgress}
        createpost={() => createPost()}
        fetchposts={() => getHomeFeed()}
      />

      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.background}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
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
    setposts: payload => dispatch(setPosts(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  tweetImage: {
    width: '95%',
    height: '50%',
    // borderRadius: 10,
    // margin: "2.5%",
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    with: '100%',
    backgroundColor: Colors.background,
  },
});
