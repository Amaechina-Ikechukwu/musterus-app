import {
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  Image,
  Text,
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
import Header from '../../messaging/components/header';
import {CommentsComponent} from '../components/comments';
import {CommentInput} from '../components/commentInput';
import {ChatInput} from '../../messaging/components/chatInput';
import {NoComment} from '../components/icons';

const {height, width} = Dimensions.get('window');
const Colors = Color();
let ImgUrl =
  'https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/311838830_3341516792834673_1624830650213567335_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG2I4ezOTyJWd1Q6SaGyWtTt0TqlRk4Rf63ROqVGThF_hMhAEUxrZPmz-YfwDVqi9XSOwJeMBUHJjjW2mK1cXwG&_nc_ohc=tMcuz-iePZwAX-IlhsR&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AfAvDZURMf1osfZvCjNmFOAq3WF5xqNQrwbghpiwEBotoQ&oe=64D287F2';
function Profile({route, appState, disp_surprise}) {
  const User = appState.User;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [message, setMessage] = useState('');
  useEffect(() => {}, []);

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

        <ScrollView>
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
              // backgroundColor: "red",
              // marginTop: 5,
              // alignItems: "center",
              padding: 15,
            }}>
            {[1, 2, 3, 4, 3, 2, 4, 3, 2, 4].map((e, index) => {
              return (
                <View key={index}>
                  <CommentsComponent />
                </View>
              );
            })}
          </View>
        </ScrollView>

        <CommentInput setMessage={setMessage} message={message} />
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
