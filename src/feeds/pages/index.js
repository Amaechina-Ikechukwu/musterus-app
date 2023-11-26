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
import {StaticImage} from '../../utilities';
import {home} from '../apis/home';
// import RNPaystack from 'react-native-paystack';

const Colors = Color();

function SignIn({navigation, appState}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [CreatePost, showCreatePost] = useState(false);
  const [pickImage, setpickImage] = useState(false);
  const {mykey, mskl} = appState.User;
  const [posts, setPosts] = useState([
    {
      liked: false,
      likes: 29,
      img: 'https://scontent.flos5-1.fna.fbcdn.net/v/t39.30808-6/365930383_1704466810016730_2304620973566095090_n.jpg?_nc_cat=103&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeFQCZj2Gu_YgyEXaDpIH6wjN8lR4hyexhI3yVHiHJ7GEount4bRklHmINGzGL6q5dGVGKnhabl2Tj8vRQIrWWJb&_nc_ohc=QlH2_T-hvBgAX_2xcVk&_nc_zt=23&_nc_ht=scontent.flos5-1.fna&oh=00_AfClAYxNvoQR6ihjJc_M23dbiIJJEyQockauZg-hfJOL_g&oe=64D2F207',
      text: 'Sleep in Sunday is the best day of the week! #sunspot',
    },
    {
      liked: false,
      likes: 29,
      img: null,
      text: `Be kind to your Area Boys because "leave am, na my Person" has saved many Lives💯.`,
    },
    {
      liked: false,
      likes: 29,
      img: 'https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/366285437_1497485217455202_3661828716509574265_n.jpg?_nc_cat=110&cb=99be929b-59f725be&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHDXT9hnKM3CdMHQ_WaNfwywq4HRutzPG3CrgdG63M8bcpcK8tirjT5w3eL1Nnw79uI1KTuHh_54SjSxJIgmpCW&_nc_ohc=lsWkoJAgyq4AX_JXqWw&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&oh=00_AfBZKXXXETFQTtFmtNCgtcWWARdk_FbIq55HBqzIhU8XfA&oe=64D6124C',
      text: `All Glory to Our Lord And God for it was a Successful Anniversary. Thank You Father for another beautiful Victory. It's now Back to Back to Back to Back for Green Rivers 💚💚💚💚`,
    },
    {
      liked: false,
      likes: 29,
      img: `https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/366289061_876050154322477_3479542894035639082_n.jpg?_nc_cat=1&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeHOtrcw_prbUV_6YWsZjvk2vtZvw9hNPmG-1m_D2E0-YUn7ejsx9MRfev_9OJJFqUWuclySpuIK9SAIoVDTp-11&_nc_ohc=BAUjDkbFhLcAX-2Wa93&_nc_oc=AQliHeEsvhr-Y3CiXcODonM-2cbXqNyXVJ8XaC_zg-yGgS5QfW4wDTiW9TryhUQgwSk&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&oh=00_AfBrfPZzxvI8-m8VnDSWhAlGURjEM9-EqvFKLHB4c6bpeA&oe=64D72A76`,
      text: `🚨 𝐄𝐗𝐂𝐋𝐔𝐒𝐈𝐕𝐄: Man City sent formal proposal for new contract to Bernardo Silva 🔵🇵🇹 ◉ City told Barça & PSG they will NOT negotiate for Silva. ◉ New contract now been offered and sent to Bernardo. ◉ Man City are optimistic to receive answer soon. Where do you see Bernardo Silva’s future? 🪄`,
    },
    {
      liked: false,
      likes: 29,
      img: null,
      text: `Breaking:.....One 200l student for engineering don mistakenly go call lecturer "werey" for faculty group,thinking he's a student`,
    },
    {
      liked: false,
      likes: 29,
      img: `https://external.fabb1-2.fna.fbcdn.net/emg1/v/t13/10796092930233825341?url=https%3A%2F%2Fwww.channelstv.com%2Fwp-content%2Fuploads%2F2023%2F08%2FKeyamo_2.jpg&fb_obo=1&utld=channelstv.com&stp=c0.5000x0.5000f_dst-jpg_flffffff_p500x261_q75&_nc_eui2=AeE21IIScxzB-fvhuNKckh5_s0cLbSVRrC-zRwttJVGsL-kbcuJZY53O1DW8mFiyvo8Q9Fz9TpbtrFgxfrHRbBJS&ccb=13-1&oh=06_AbG-_yuMIju4IryxprdnNf9279g76qgi_5F6AutvY76g2g&oe=64D38AC9&_nc_sid=8afd86`,
      text: `A Senator representing Abia Central Senatorial District, Darlington Nwokocha, on Monday, moved a motion for the suspension of the ministerial screening of a ministerial nominee from Delta State, Festus Keyamo.`,
    },
    {
      liked: false,
      likes: 29,
      img: `https://scontent.fabb1-1.fna.fbcdn.net/v/t39.30808-6/365267754_741385797995511_2817710514902809732_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&cb=99be929b-59f725be&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFgxf-pJh56mjeQf_ETett3Gy97I-uCdUobL3sj64J1SnJRvh8ZsXASR3aMZo_ppHcOBv2C_vd3AIZuDcYst3xX&_nc_ohc=KWnKmoXQbzkAX-kR9ja&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&oh=00_AfASYowoBXGIIqOJsX2rK3UoB_B_v85tZgWD6AmRABxMIw&oe=64D5D96A`,
      text: `Be reminded that the future is a result of the past. Take the right steps now, and thank yourself later. Have a lovely week! #mondaymotivation #hertechtrail #womenintech`,
    },
    {
      liked: false,
      likes: 29,
      img: null,
      text: `𝕀𝕋'𝕊 𝕎𝔼𝔼𝕂𝔼ℕ𝔻 Time to relax, evaluate and re-strategize. Pick a pen and paper answer the following questions for yourself When you're done answering this questions, prepare your mind to have a bigger win next week. 𝑭𝒊𝒏𝒂𝒍𝒍𝒚...  𝑺𝒎𝒊𝒍𝒆, 𝒈𝒐 𝒐𝒖𝒕𝒔𝒊𝒅𝒆 𝒂𝒏𝒅 𝒃𝒖𝒚 𝒚𝒐𝒖𝒓𝒔𝒆𝒍𝒇 𝒔𝒐𝒎𝒆𝒕𝒉𝒊𝒏𝒈 (𝒂𝒏𝒚𝒕𝒉𝒊𝒏𝒈) 𝒋𝒖𝒔𝒕 𝒕𝒐 𝒄𝒆𝒍𝒆𝒃𝒓𝒂𝒕𝒆, 𝒚𝒐𝒖'𝒓𝒆 𝒕𝒓𝒚𝒊𝒏𝒈.
            #georgegodwin #godwingeorge  #themediatechie`,
    },
  ]);
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
  const getHomeFeed = async () => {
    const result = await home(mykey, mskl);
    console.log(home, JSON.stringify(result, null, 2));
  };
  useEffect(() => {
    getHomeFeed();
  }, []);
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
            <UpcomingBirthdays navigation={navigation} />

            <View
              style={{
                marginTop: 10,
                marginBottom: 80,
              }}>
              {posts.map((e, index) => {
                return (
                  <>
                    <FeedCard
                      setPostToView={setPostToView}
                      data={e}
                      setModalVisible={setModalVisible}
                      navigation={navigation}
                      UnlikeReaction={UnlikeReaction}
                      LikeReaction={LikeReaction}
                      setpickImage={setpickImage}
                      posts={posts}
                      setPosts={setPosts}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  </>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
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
          <Image style={styles.tweetImage} src={StaticImage} />
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
