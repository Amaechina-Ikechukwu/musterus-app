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
import {MusterCards, MusterCards2} from '../components/ustercards';
import {amifollwoing} from '../../muster-points/apis/amifollowing';
import UsersFlatlist from '../../muster-points/pages/UsersFlatlist';
import {
  and,
  collection,
  getDocs,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import {db} from '../../../firebase';
import {sendmessage} from '../../messaging/apis/sendDM';
import {initializechat} from '../../messaging/apis/initializechat';
import {suggestsusers} from '../../muster-points/apis/SuggestedUsers';
const {height, width} = Dimensions.get('window');
const Colors = Color();
const removePassword = data => {
  delete data.password;
  return data;
};
function BirthdayWish({route, appState, disp_surprise}) {
  const User = appState.User;
  const navigation = useNavigation();
  const {image, user} = route?.params;
  const [imageUri, setImageUri] = useState(null);
  const [message, setMessage] = useState('');

  const makeconvid = async () => {
    try {
      if (message.length < 5) {
        Alert.alert(
          'Trying to send a card',
          'You can show more love by sending message longer than 5 words',
        );
      } else {
        const conversationId = [User?.mykey, user?.id].sort().join('_');
        await initializechat(User?.mykey, user?.id);
        await sendmessage(User?.mykey, user?.id, message, image, 'image');
        navigation.navigate('Chat', {
          screen: 'chat person',
          params: {
            conversationId: conversationId,
            userid: user?.id,
            user: user,
          },
        });
      }
    } catch (err) {
      Alert.alert(
        'Trying to send a card',
        'We have encountered an error on our end',
      );
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          paddingTop: 80,
          // padding: 20,
          justifyContent: 'space-around',
        }}>
        <View>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              // backgroundColor: "blue"
              alignItems: 'center',
            }}>
            <LabelTexts style={{marginLeft: 15}} text="Send A Card" />
          </View>

          <View
            style={{
              padding: 15,
            }}>
            <View style={{marginBottom: 5}}>
              <Image
                style={{width: '100%', height: 400}}
                source={{uri: image}}
              />
              <TextInput
                value={message}
                onChangeText={text => setMessage(text)}
                label={'Add a message'}
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: 'transparent',
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{alignItems: 'center', width: '100%', position: 'relative'}}>
          <TouchableOpacity
            onPress={() => makeconvid()}
            style={{
              backgroundColor: Colors.primary,
              height: 50,
              width: width * 0.9,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: Colors.light}}>Send to {user?.name}</Text>
          </TouchableOpacity>
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
    disp_surprise: payload => dispatch(surprise_state(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BirthdayWish);

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
