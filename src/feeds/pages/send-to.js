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
const {height, width} = Dimensions.get('window');
const Colors = Color();
const removePassword = data => {
  delete data.password;
  return data;
};
function MuterCards({route, appState, disp_surprise}) {
  const User = appState.User;
  const navigation = useNavigation();
  const {image} = route?.params;
  const [imageUri, setImageUri] = useState(null);
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');
  const [searchedUsers, setSearchedUsers] = useState();
  const makeconvid = async friend => {
    try {
      const conversationId = [User?.mykey, friend?.id].sort().join('_');
      await initializechat(User?.mykey, friend?.id);
      await sendmessage(User?.mykey, friend?.id, message, image, 'image');
      navigation.navigate('Chat', {
        screen: 'chat person',
        params: {
          conversationId: conversationId,
          friendid: friend?.id,
          friend: friend,
        },
      });
    } catch (err) {
      Alert.alert(
        'Trying to send a card',
        'We have encountered an error on our end',
      );
    }
  };
  const usersRef = collection(db, 'profile');
  const handleInputChange = async event => {
    const newValue = event; // Convert to lowercase
    setData(newValue);
    try {
      const q = query(usersRef);
      const querySnapshot = await getDocs(q);

      const usersData = await Promise.all(
        querySnapshot.docs.map(async doc => {
          const userData = doc.data();
          const {firstname, lastname} = userData;
          const lowerCaseFirstname = firstname;
          const lowerCaseLastname = lastname;
          if (
            lowerCaseFirstname.includes(newValue) ||
            lowerCaseLastname.includes(newValue)
          ) {
            const result = await amifollwoing(User?.mykey, doc.id);
            if (doc.id !== User?.mykey && result.message === true) {
              const newData = removePassword(userData);
              return {id: doc.id, ...newData};
            }
          }
          return null;
        }),
      );

      const filteredUsersData = usersData.filter(Boolean); // Remove null values
      setSearchedUsers(filteredUsersData);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const initializeuser = async () => {
    try {
      const q = query(usersRef);
      const querySnapshot = await getDocs(q);

      const usersData = await Promise.all(
        querySnapshot.docs.map(async doc => {
          const userData = doc.data();
          const result = await amifollwoing(User?.mykey, doc.id);

          if (doc.id !== User?.mykey || result.message === true) {
            const newData = removePassword(userData);
            return {id: doc.id, ...newData};
          }
          return null;
        }),
      );

      const filteredUsersData = usersData.filter(Boolean); // Remove null values
      setSearchedUsers(filteredUsersData);
    } catch (error) {
      console.error('Error initializing users:', error);
    }
  };

  useEffect(() => {
    initializeuser();
  }, []);

  useEffect(() => {}, [searchedUsers]);

  return (
    <>
      <Header navigation={navigation} />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          paddingTop: 80,
          // padding: 20
        }}>
        <AppStatusBar StatusBar={StatusBar} useState={useState} />

        <View>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              // backgroundColor: "blue"
            }}>
            <LabelTexts style={{marginLeft: 15}} text="Search" />
          </View>

          <View
            style={{
              // backgroundColor: "red",
              // marginTop: 5,
              // alignItems: "center",
              padding: 15,
            }}>
            <OutlinedInput
              data={data}
              setData={value => handleInputChange(value)}
              placeholder="Search"
              multiline={false}
            />
            <Text
              style={[
                Style.text,
                {
                  marginTop: 15,
                  marginBottom: 15,
                  color: Colors.grey,
                  textAlign: 'left',
                },
              ]}>
              Try typing a keyword or username
            </Text>
            <View style={{flexDirection: 'row', marginBottom: 5}}>
              <Image style={{width: 100, height: 100}} source={{uri: image}} />
              <TextInput
                value={message}
                onChangeText={text => setMessage(text)}
                label={'Add a message'}
                style={{
                  height: 100,
                  width: '100%',
                  backgroundColor: 'transparent',
                }}
              />
            </View>
            <View style={{width: '100%', height: '100%'}}>
              <UsersFlatlist
                data={searchedUsers}
                navigation={navigation}
                component={'SENDCARD'}
                sendACard={makeconvid}
              />
            </View>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MuterCards);

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
