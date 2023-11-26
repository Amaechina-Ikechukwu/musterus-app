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
import {surprise_state, user_state} from '../../redux';
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

const Colors = Color();

function SignIn({navigation, appState}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [CreatePost, showCreatePost] = useState(false);
  const [pickImage, setpickImage] = useState(false);

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

  const UnlikeReaction = data => {
    // get index
    let Index = posts.findIndex(e => e.text == data.text);
    let newData = {
      ...data,
      liked: false,
    };
    posts.splice(Index, 1, newData);
    setPosts(posts);
    console.log('unliked');
  };

  const LikeReaction = data => {
    // get index
    let Index = posts.findIndex(e => e.text == data.text);
    let newData = {
      ...data,
      liked: true,
    };
    posts.splice(Index, 1, newData);
    setPosts(posts);
    console.log('liked');
  };

  return (
    <>
      <CreatePostModal
        pickImage={pickImage}
        setpickImage={setpickImage}
        showCreatePost={showCreatePost}
        data={data}
        setData={setData}
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
