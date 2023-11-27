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
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Color} from '../../components/theme';
import {connect} from 'react-redux';
import {surprise_state, user_state} from '../../redux';
import {useNavigation} from '@react-navigation/native';
import {HeaderComponent} from '../../components/header';
import {AppStatusBar} from '../../components/status-bar';
import {LabelTexts} from '../../events/components/texts';
import {SearchIcon} from '../../events/components/icons';
import {PrimaryButton} from '../../components/buttons/primary';
import {NameDisplayCard} from '../../components/name-display-card';
import {BottomTab} from '../../events/components/bottomTab';
import {Header} from '../../messaging/components/header';
import UsersFlatlist from './UsersFlatlist';
import {db} from '../../../firebase';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {usersprofile} from '../../user/apis/firebaseprofile';

const {height, width} = Dimensions.get('window');
const Colors = Color();
const fetchUserProfiles = async userId => {
  const profile = await usersprofile(userId);

  return profile;
};
function Profile({route, appState, disp_surprise}) {
  const User = appState.User;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [data, setData] = useState('');
  const [followingData, setfollowingData] = useState('');
  const [component, setcomponent] = useState('SUGGESTION');
  const suggestedUsers = () => {
    const currentUserID = User?.mykey; // Assuming this represents the current user's ID
    const q = query(collection(db, 'profile'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        const userID = doc.id;
        if (userID !== currentUserID) {
          users.push({id: userID, ...doc.data()});
        }
      });

      setData(users);
    });
  };

  const friends = () => {
    const q = query(collection(db, 'profile', User?.mykey, 'following'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      let userProfiles = []; // To store user profiles with associated IDs
      querySnapshot.forEach(doc => {
        const userId = doc.id;

        fetchUserProfiles(userId)
          .then(profile => {
            // Include user ID in the user profile object
            const userProfileWithId = {...profile, id: userId};
            userProfiles.push(userProfileWithId);
            setfollowingData([...userProfiles]); // Update the state with profiles including IDs
          })
          .catch(error => {});
      });
    });
  };

  const initizeUsers = async () => {
    if (component == 'SUGGESTION') {
      suggestedUsers();
    } else if (component == 'FRIENDS') {
      friends();
    }
  };

  useEffect(() => {
    initizeUsers();
  }, [component]);
  useEffect(() => {}, [data, followingData]);

  return (
    <>
      <BottomTab page="MusterPoint" navigation={navigation} />
      <Header />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          paddingTop: 80,
          paddingBottom: 80,
          // padding: 20
        }}>
        <AppStatusBar StatusBar={StatusBar} useState={useState} />

        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            // backgroundColor: "red"
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              // backgroundColor: "blue"
            }}>
            <LabelTexts style={{marginLeft: 15}} text="Muster Point" />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              // backgroundColor: "blue",
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}
              style={{
                // backgroundColor: "green",
                flex: 1,
                width: 100,
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: 15,
              }}>
              <SearchIcon />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            // backgroundColor: "red",
            marginTop: 10,
            // alignItems: "center",
            padding: 15,
            gap: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <PrimaryButton
              callBack={() => {
                setcomponent('SUGGESTION');
              }}
              title="Suggestions"
              style={{
                height: 36,
                justifyContent: 'center',
                width: 130,
                marginRight: 10,
              }}
              noBG={component == 'FRIENDS' ? true : false}
            />

            <PrimaryButton
              callBack={() => {
                setcomponent('FRIENDS');
              }}
              noBG={component == 'SUGGESTION' ? true : false}
              title="Your Friends"
              style={{
                height: 36,
                justifyContent: 'center',
                width: 130,
              }}
            />
          </View>
          <UsersFlatlist
            navigation={navigation}
            data={component == 'SUGGESTION' ? data : followingData}
            component={component}
          />
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
