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
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';

import * as ImagePicker from 'expo-image-picker';
import {createpost} from '../apis/createpost';
import {getposts} from '../apis/home';
// import * as MediaLibrary from 'expo-media-library';

const Colors = Color();

function SignIn({navigation, appState, setposts}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
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

  const STYLES = ['default', 'dark-content', 'light-content'];
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const [image, setImage] = useState(null);
  const [recentImages, setRecentImages] = useState([]);
  const ChooseImage = async () => {
    console.log('Image me');
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Function to upload image to Firebase Storage

  const uploadImageToFirebase = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const storageRef = ref(
        storage,
        `groupPhotos/${groupid}/${image.split('/').pop()}`,
      );

      // Uploading image to Firebase Storage
      await uploadBytes(storageRef, blob); // Use uploadBytes method to upload the image blob

      const downloadURL = await getDownloadURL(storageRef); // Get the download URL

      setData({...data, photourl: downloadURL}); // Update group data with the downloadURL
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };
  const createPost = async () => {
    try {
      // Upload image before updating group data
      if (image) {
        await uploadImageToFirebase();
      }
      const token = User?.mykey;
      // Update group data

      await createpost(token, data);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert('Error creating post');
    }
  };
  const getHomeFeed = async () => {
    const result = await getposts(User?.mykey);
    setposts(result.data);
  };
  // const getRecentImages = async () => {
  //   try {
  //     const {status} = await MediaLibrary.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       console.log('Permission denied for accessing media library');
  //       return;
  //     }

  //     const mediaAssets = await MediaLibrary.getAssetsAsync({
  //       first: 10, // Fetching the first 10 assets
  //       mediaType: MediaLibrary.MediaType.photo, // Fetch only photos
  //       sortBy: [[MediaLibrary.SortBy.creationTime, false]], // Sort by creation time in descending order
  //     });

  //     // Extracting image URIs from mediaAssets
  //     const imageUris = mediaAssets.assets.map(asset => asset.uri);

  //     setRecentImages(imageUris);
  //   } catch (error) {
  //     console.error('Error fetching recent images:', error);
  //     // Handle errors appropriately
  //   }
  // };

  // useEffect(() => {
  //   console.log(recentImages);
  //   getRecentImages();
  // }, []);
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
