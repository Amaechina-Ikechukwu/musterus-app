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
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Logo} from '../../components/icons';
import {PrimaryButton} from '../../components/buttons/primary';
import {Color} from '../../components/theme';
import {connect} from 'react-redux';
import {
  setMyFriends,
  setMyProfile,
  setPosts,
  surprise_state,
  user_state,
} from '../../redux';

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
import {homepage} from '../oldapis/home';
import emptyimage from '../../../emptyimage';
import {Style} from '../../../assets/styles';
import AdPage from '../components/AdPage';

const Colors = Color();

function Homepage({
  navigation,
  appState,
  setposts,
  setmyprofile,
  setmyfriends,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [CreatePost, showCreatePost] = useState(false);
  const [pickImage, setpickImage] = useState(false);
  const {mykey, mskl} = appState?.User;
  const {User, Profile} = appState;
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState();
  const [postToView, setPostToView] = useState();

  useEffect(() => {
    const handleBackPress = () => {
      if (CreatePost == true) {
        showCreatePost(false);
        // Return true to prevent the default behavior (app exit)
      }
      return true;
    };
  }, [showCreatePost]);

  const STYLES = ['default', 'dark-content', 'light-content'];
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const getHomeFeed = async () => {
    const result = await homepage(mykey, mskl);

    setmyprofile(result?.MyProfile);
    setMembers(result?.RecentMembers);
    setmyfriends(result?.MyFriends);
    setPosts(result?.Comments);
  };

  useEffect(() => {
    getHomeFeed();
    // getProfile();
  }, []);

  useEffect(() => {}, [User, Profile]);
  const renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          src={
            item?.avatar && item?.avatar.length > 5
              ? `https://www.musterus.com/${item?.avatar}`
              : emptyimage
          }
          style={{height: 60, width: 60}}
        />
        <Text style={[Style.Text, {fontSize: 10}]}>
          {item?.firstname + ' ' + item?.lastname}
        </Text>
      </View>
    );
  };

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
        Profile={Profile}
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
              paddingHorizontal: 10,
            }}>
            <PostFlatlist
              data={posts}
              loading={loading}
              setLoading={setLoading}
              setModalVisible={setModalVisible}
              navigation={navigation}
              Footer={
                <FlatList
                  data={members}
                  renderItem={renderItem}
                  numColumns={3}
                  columnWrapperStyle={{gap: 20, justifyContent: 'center'}}
                  contentContainerStyle={{gap: 10}}
                  keyExtractor={item => item.uid}
                  // ListFooterComponent={<AdPage mykey={mykey} mskl={mskl} />}
                  ListHeaderComponent={
                    <Text style={Style.Text}>Recent Members</Text>
                  }
                />
              }
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
    setmyfriends: userData => dispatch(setMyFriends(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

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
