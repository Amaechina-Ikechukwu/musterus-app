import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Alert,
  StatusBar,
  BackHandler,
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
import {FeedCard} from '../components/feed-card';
import {BottomTab} from '../components/bottomTab';
import {CreatePostModal} from '../components/createPost';
// import RNPaystack from 'react-native-paystack';

const Colors = Color();

function SignIn({navigation, appState}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [CreatePost, showCreatePost] = useState(false);
  const [pickImage, setpickImage] = useState(false);

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
  //     const getEvents = () => {
  //     const result = await events
  // }

  useEffect(() => {}, []);
  return (
    <>
      {/* create post modal */}
      {CreatePost == true && (
        <CreatePostModal
          pickImage={pickImage}
          setpickImage={setpickImage}
          showCreatePost={showCreatePost}
          data={data}
          setData={setData}
        />
      )}

      <FeedHeader showCreatePost={showCreatePost} navigation={navigation} />
      <BottomTab page="Home" navigation={navigation} />
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.background}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <ScrollView>
          <View style={{marginTop: 80}}>
            <UpcomingBirthdays />

            <View
              style={{
                marginTop: 10,
                marginBottom: 80,
              }}>
              <FeedCard navigation={navigation} image />
              <FeedCard navigation={navigation} />
              <FeedCard navigation={navigation} image />
              <FeedCard navigation={navigation} />
              <FeedCard navigation={navigation} image />
              <FeedCard navigation={navigation} />
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
    flex: 1,
    with: '100%',
    backgroundColor: Colors.background,
  },
});
