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
import {Header} from '../../messaging/components/header';
import UsersFlatlist from '../../muster-points/pages/UsersFlatlist';
import {
  and,
  collection,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import {db} from '../../../firebase';
const {height, width} = Dimensions.get('window');
const Colors = Color();
let ImgUrl =
  'https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/311838830_3341516792834673_1624830650213567335_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG2I4ezOTyJWd1Q6SaGyWtTt0TqlRk4Rf63ROqVGThF_hMhAEUxrZPmz-YfwDVqi9XSOwJeMBUHJjjW2mK1cXwG&_nc_ohc=tMcuz-iePZwAX-IlhsR&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AfAvDZURMf1osfZvCjNmFOAq3WF5xqNQrwbghpiwEBotoQ&oe=64D287F2';
function Profile({route, appState, disp_surprise}) {
  const User = appState.User;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [data, setData] = useState('');
  const [searchedUsers, setSearchedUsers] = useState();

  const suggestedUsers = () => {
    try {
      const currentUserID = User?.mykey;
      let q = collection(db, 'profile');

      if (data.length > 0) {
        q = query(
          q,
          and(where('firstname', '>=', data)),
          or(
            where('lastname', '>=', data),
            where('lastname', '<=', data + '\uf8ff'),
          ),
        );
      }

      const unsubscribe = onSnapshot(q, querySnapshot => {
        let users = [];
        querySnapshot.forEach(doc => {
          const userID = doc.id;
          if (userID !== currentUserID) {
            users.push({id: userID, ...doc.data()});
          }
        });

        console.log(users);
        setSearchedUsers(users);
      });

      return unsubscribe; // Return a function to unsubscribe
    } catch (err) {
      console.error('Error in suggestedUsers:', err);
      // Handle the error or display a specific message
    }
  };

  useEffect(() => {
    const unsubscribe = suggestedUsers();
    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, [data]);
  try {
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
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  // backgroundColor: "blue"
                }}>
                <LabelTexts style={{marginLeft: 15}} text="Search" />
              </View>
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
                setData={setData}
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

              <UsersFlatlist
                data={searchedUsers}
                navigation={navigation}
                component={'SEARCH'}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  } catch (err) {
    console.log(err);
    return (
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          // backgroundColor: "blue"
        }}>
        <LabelTexts style={{marginLeft: 15}} text="Little Error" />
      </View>
    );
  }
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
