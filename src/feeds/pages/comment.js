import {
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  Image,
  Text,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Divider, Avatar} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {surprise_state, user_state} from '../../redux';
import {useNavigation} from '@react-navigation/native';
import {AppStatusBar} from '../../components/status-bar';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {BackIcon} from '../../../assets/icons/auth-icons';
import {LabelTexts} from '../components/texts';
import {Color} from '../../components/theme';
import {OutlinedInput} from '../../components/inputs';
import {FeedHeader} from '../components/feed-header';
import {Style} from '../../../assets/styles';
import {NameDisplayCard} from '../../components/name-display-card';
import {Header} from '../../messaging/components/header';
import {CommentsComponent} from '../components/comments';
import {CommentInput} from '../components/commentInput';
import {ChatInput} from '../../messaging/components/chatInput';
import {NoComment} from '../components/icons';
import {db} from '../../../firebase';
import {collection, onSnapshot, query} from 'firebase/firestore';
import CommentFlatList from '../models/CommentFlatList';
import {commentonpost} from '../apis/comment';

const {height, width} = Dimensions.get('window');
const Colors = Color();
let ImgUrl =
  'https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/311838830_3341516792834673_1624830650213567335_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG2I4ezOTyJWd1Q6SaGyWtTt0TqlRk4Rf63ROqVGThF_hMhAEUxrZPmz-YfwDVqi9XSOwJeMBUHJjjW2mK1cXwG&_nc_ohc=tMcuz-iePZwAX-IlhsR&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AfAvDZURMf1osfZvCjNmFOAq3WF5xqNQrwbghpiwEBotoQ&oe=64D287F2';
function Profile({route, appState}) {
  const User = appState.User;
  const {post} = route?.params;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [message, setMessage] = useState('');
  const [tempmessage, setTempMessage] = useState('');
  const [postComments, setPostComments] = useState();
  const postaction = async () => {
    try {
      setTempMessage(message);
      setMessage('');
      await commentonpost(User?.mykey, post.postid, message);
      setTempMessage('');
    } catch (err) {
      setMessage(tempmessage);
      Alert.alert('Comment', 'Couldnt send comment at this time');
    }
  };
  useEffect(() => {
    const q = query(
      collection(db, 'posts', post.postid, 'comments'), // Order by 'sent' field in ascending order (oldest first)
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      let comments = [];
      querySnapshot.forEach(doc => {
        comments.push({id: doc.id, ...doc.data()}); // Assuming the comments are stored as document IDs
      });
      setPostComments(comments);
      // Check if the user's ID is in the likes array
    });

    // Cleanup: Unsubscribe from real-time updates when component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Include necessary dependencies in the dependency array

  return (
    <>
      <Header navigation={navigation} />

      {/* no comment */}
      {/* <View style={{
                flex: 1,
                backgroundColor: "red",
                marginTop: 90,
                justifyContent: "center",
                alignItems: "center"
            }} >

                <NoComment />
            </View> */}

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          paddingTop: 80,
          paddingBottom: 40,
          // padding: 20
        }}>
        <AppStatusBar StatusBar={StatusBar} useState={useState} />

        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            marginTop: 20,
            // backgroundColor: "red"
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              // backgroundColor: "blue"
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
                // backgroundColor: "blue"
              }}>
              <BackIcon />
            </TouchableOpacity>
            <LabelTexts style={{marginLeft: 15}} text="Comments" />
          </View>
        </View>
        <Divider style={{marginTop: 30, backgroundColor: Colors.primary}} />
        <View
          style={{
            height: '100%',
            width: '100%',
            padding: 15,
          }}>
          <CommentFlatList data={postComments} />
        </View>

        <CommentInput
          setMessage={setMessage}
          message={message}
          sendComment={() => postaction()}
        />
        {/* <ChatInput setMessage={setMessage} message={message} /> */}
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
    disp_surprise: payload => dispatch(surprise_state(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    // backgroundColor:"red"
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.light, // red color with 50% transparency
    opacity: 0.8,
    marginTop: -20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
});
