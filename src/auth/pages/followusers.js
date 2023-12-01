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
import * as ImagePicker from 'expo-image-picker';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {Color} from '../../components/theme';
import {connect} from 'react-redux';
import {setMyProfile, surprise_state, user_state} from '../../redux';
import {useNavigation} from '@react-navigation/native';
import {AppStatusBar} from '../../components/status-bar';
import {HeaderComponent} from '../../components/header';
import {BackIcon} from '../../../assets/icons/auth-icons';
import {LabelTexts} from '../../events/components/texts';
import {suggestsusers} from '../../muster-points/apis/SuggestedUsers';
import {usefriends} from '../../muster-points/apis/UserFriends';
import UsersFlatlist from '../../muster-points/pages/UsersFlatlist';
import {PrimaryButton} from '../../components/buttons/primary';

const Colors = Color();
const {width} = Dimensions.get('window');
function FollowUsers({route, appState, setmyprofile, navigation}) {
  const {User, Profile} = appState;
  const [data, setData] = useState('');
  const [followingData, setfollowingData] = useState('');
  const [count, setCount] = useState(0);
  const suggestedUsers = async () => {
    const result = await suggestsusers(User?.mykey);

    setData(result);
  };
  const {logged} = route?.params;
  const gotoprofile = item => {
    navigation.navigate('Profile', {user: item});
  };
  const finishSelection = async () => {
    if (count < 4) {
      Alert.alert('Follow Users', 'Please select at least four users');
    } else {
      logged();
    }
  };

  const initizeUsers = async () => {
    suggestedUsers();
  };
  const FollowingCount = () => {
    setCount(prev => prev + 1);
  };
  useEffect(() => {
    initizeUsers();
  }, []);
  useEffect(() => {
    console.log(count);
  }, [data, count]);

  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  return (
    <>
      <HeaderComponent page="Profile" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          paddingTop: 80,
          // padding: 20
        }}>
        <AppStatusBar StatusBar={StatusBar} useState={useState} />

        <ScrollView style={{height: '100%'}}>
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
              <BackIcon />
              <LabelTexts style={{marginLeft: 15}} text="People to follow" />
            </View>
          </View>
          <View
            style={{
              height: '100%',
              width: '100%',
              padding: 20,
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <UsersFlatlist
              gotoprofile={gotoprofile}
              navigation={navigation}
              data={data}
              component="FollowUsers"
              count={FollowingCount}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <PrimaryButton
              title="Finish"
              style={{width: width * 0.9}}
              callBack={() => {
                finishSelection();
              }}
            />
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
    disp_surprise: payload => dispatch(surprise_state(payload)),
    setmyprofile: userData => dispatch(setMyProfile(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowUsers);

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
  circularButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circularImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
