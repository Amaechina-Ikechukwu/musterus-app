import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color} from '../../components/theme';
import {HeaderComponent} from '../../components/header';
import {BackIcon} from '../../../assets/icons/auth-icons';

import {usersfullprofile} from '../apis/profile';
import {myposts} from '../apis/myposts';
import {Style} from '../../../assets/styles';
import {TouchableOpacity} from 'react-native';
import UserPostFlatlist from '../models/UserPostFlatlist';
import {PrimaryButton} from '../../components/buttons/primary';
import {setMyProfile} from '../../redux';
import {amifollwoing} from '../../muster-points/apis/amifollowing';
import {followuser} from '../../muster-points/apis/followuser';
import ProfileInformation from './ProfileInformaton';
import PostFlatlist from '../compnents/PostFlatlist';
const emptyimage =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
const ProfileHeader = ({Profile, user, mykey, postlength, navigation}) => {
  const [following, setFollowing] = useState(Boolean);
  const [modalVisible, setModalVisible] = useState(false);

  const makeconvid = friend => {
    navigation.navigate('Chat', {
      screen: 'chat person',
      params: {
        user,
      },
    });
  };
  const followUser = async () => {
    const result = await followuser(mykey, user);

    setFollowing(result?.message == 'added');
  };
  useEffect(() => {}, []);

  return (
    <View>
      <View
        style={{
          // backgroundColor: "red",
          marginTop: 10,
          alignItems: 'center',
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("Profile")
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 65,
            }}
            src={
              Profile?.avatar
                ? `https://www.musterus.com${Profile?.avatar}`
                : emptyimage
            }
            resizeMode={'cover'}
          />
        </TouchableOpacity>

        <Text
          style={[
            Style.bolder,
            {
              marginTop: 10,
              marginBottom: 10,
            },
          ]}>
          {Profile?.firstname + ' ' + Profile?.lastname}
        </Text>

        <Text
          style={[
            Style.TinyText,
            {
              margin: 10,
              textAlign: 'center',
            },
          ]}>
          {Profile?.profileintro}
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{padding: 10}}>
          <Text>See More</Text>
        </TouchableOpacity>
        {Profile?.profilekey !== mykey && (
          <View
            style={{
              // backgroundColor: "red",
              // height: 20
              width: '100%',
              marginTop: 15,
            }}>
            <PrimaryButton
              callBack={() => {
                makeconvid();
              }}
              title="Messages"
              style={{width: '100%'}}
            />
            <PrimaryButton
              callBack={() => {
                !following && followUser();
              }}
              title={following ? 'Following' : 'Muster'}
              style={{
                width: '100%',
                marginTop: 10,
                backgroundColor: following ? Colors.lightgrey : Colors.primary,
              }}
            />
          </View>
        )}
      </View>
      <ProfileInformation
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        profileData={Profile}
      />
    </View>
  );
};

const Colors = Color();

const Profile = ({route, appState, setmyprofile}) => {
  const User = appState?.User;
  const Profile = appState?.Profile;
  const Posts = appState?.Posts;
  const navigation = useNavigation();
  const user = route?.params?.user;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {}, [Profile]);
  useEffect(() => {}, []);

  if (Profile === null) {
    return <ActivityIndicator />;
  }

  const isCurrentUser = user ? user?.userkey === User?.mykey : true;
  const pageTitle = `Profile`;

  return (
    <>
      <HeaderComponent
        page={pageTitle}
        user={user}
        mykey={User?.mykey}
        navigation={navigation}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          paddingTop: 100,
          // padding: 20
        }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <PostFlatlist
              data={Posts}
              Header={
                <ProfileHeader
                  Profile={isCurrentUser ? Profile : user}
                  user={user}
                  mykey={User?.mykey}
                  postlength={userPosts.length}
                  navigation={navigation}
                />
              }
              navigation={navigation}
              loading={loading}
              setLoading={setLoading}
              setModalVisible={setModalVisible}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = state => {
  return {
    appState: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setmyprofile: userData => dispatch(setMyProfile(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  headerText: {
    marginLeft: 15,
  },
  profileContainer: {
    marginTop: 20,
  },
});
