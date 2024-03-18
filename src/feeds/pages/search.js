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
import {searchusers} from '../oldapis/search';

const {height, width} = Dimensions.get('window');
const Colors = Color();
const removePassword = data => {
  delete data.password;
  return data;
};
function Profile({route, appState, disp_surprise}) {
  const User = appState.User;
  const {mykey, mskl} = User;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [data, setData] = useState('');
  const [searchedUsers, setSearchedUsers] = useState();
  const makeconvid = friend => {
    const conversationId = [User?.mykey, friend?.id].sort().join('_');

    navigation.navigate('Chat', {
      screen: 'chat person',
      params: {
        conversationId: conversationId,
        friendid: friend?.id,
        friend: friend,
      },
    });
  };
  const searchUsers = async value => {
    const result = await searchusers(mykey, mskl, value, 'fna');
  };

  const handleInputChange = async event => {
    const newValue = event; // Convert to lowercase
    setData(newValue);

    try {
      searchUsers(newValue);
    } catch (error) {
      // console.error('Error searching users:', error);
    }
  };

  useEffect(() => {}, []);
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
              setData={value => handleInputChange(value)}
              placeholder="Search"
              multiline={false}
            />
            <Text
              style={[
                Style.Text,
                {
                  marginTop: 15,
                  marginBottom: 15,
                  color: Colors.grey,
                  textAlign: 'left',
                },
              ]}>
              Try typing a keyword or username
            </Text>
            <View style={{height: '100%', width: '100%'}}>
              <UsersFlatlist
                data={searchedUsers}
                navigation={navigation}
                component={'SEARCH'}
                conversationId={makeconvid}
              />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  } catch (err) {
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
