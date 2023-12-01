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
import {setMyProfile, setPosts, surprise_state, user_state} from '../../redux';

import {FeedHeader} from '../components/feed-header';
import {UpcomingBirthdays} from '../components/upcoming-birthdays';

import {BottomTab} from '../components/bottomTab';
import {CreatePostModal} from '../components/createPost';
import {Posts} from '../../utilities/data';
import {StaticImage} from '../../utilities';
import {getposts, home} from '../apis/home';
import PostFlatlist from '../models/PostFlatlist';
import {SendACard} from '../components/SendACard';
import {usersfullprofile} from '../../user/apis/profile';
// import RNPaystack from 'react-native-paystack';

const Colors = Color();

function SignIn({navigation, appState, setposts, setmyprofile}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [CreatePost, showCreatePost] = useState(false);
  const [pickImage, setpickImage] = useState(false);
  const {mykey, mskl} = appState?.User;
  const {Posts, Profile} = appState;
  const [posts, setPosts] = useState([]);
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

  const getHomeFeed = async () => {
    const result = await getposts(mykey);
    setposts(result.data);
  };
  const getProfile = async () => {
    const result = await usersfullprofile(mykey);

    setmyprofile(result);
  };
  useEffect(() => {
    getHomeFeed();
    getProfile();
  }, []);
  useEffect(() => {}, [posts, Profile]);

  return (
    <>
      {CreatePost == true && (
        <CreatePostModal
          pickImage={pickImage}
          setpickImage={setpickImage}
          showCreatePost={showCreatePost}
          data={data}
          setData={setData}
          fetchposts={() => getHomeFeed()}
        />
      )}

      <FeedHeader
        showCreatePost={showCreatePost}
        image={Profile?.user?.photourl}
        navigation={navigation}
      />
      <BottomTab page="Home" navigation={navigation} />
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.background}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />

        <View style={{marginTop: 80, width: '100%', height: '100%'}}>
          <View
            style={{
              marginTop: 10,
              marginBottom: 80,
              width: '100%',
              height: '100%',
              gap: 20,
            }}>
            <PostFlatlist
              setPostToView={setPostToView}
              data={Posts}
              loading={loading}
              setLoading={setLoading}
              setModalVisible={setModalVisible}
              navigation={navigation}
              setPosts={setPosts}
              fetchposts={() => getHomeFeed()}
            />
          </View>
        </View>
      </SafeAreaView>

      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onMagicTap={() => {
          setModalVisible(!modalVisible);
          // Alert.alert('Modal has been closed.');
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          // Alert.alert('Modal has been closed.');
        }}>
        <View
          style={{
            backgroundColor: Colors.background,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Image
            style={styles.tweetImage}
            source={{uri: postToView?.mediaurl}}
          />
        </View>
      </Modal>
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
    setmyprofile: userData => dispatch(setMyProfile(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  tweetImage: {
    width: '100%',
    aspectRatio: 1,
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
