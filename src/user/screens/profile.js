import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
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
const ProfileHeader = ({Profile, user, mykey, postlength}) => {
  useEffect(() => {
    console.log(Profile);
  }, [Profile]);
  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
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
              width: 65,
              height: 65,
              borderRadius: 65,
            }}
            src={Profile?.user?.photourl || emptyimage}
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
          {Profile?.user?.firstname + ' ' + Profile?.user?.lastname}
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={[
              Style.TinyText,
              {
                margin: 10,
              },
            ]}>
            {postlength} post
          </Text>

          <Text
            style={[
              Style.TinyText,
              {
                margin: 10,
              },
            ]}>
            {Profile?.followingCount} following
          </Text>

          <Text
            style={[
              Style.TinyText,
              {
                margin: 10,
              },
            ]}>
            {Profile?.followersCount} followers
          </Text>
        </View>
        <Text
          style={[
            Style.TinyText,
            {
              margin: 10,
              textAlign: 'center',
            },
          ]}>
          {Profile?.user?.bio}
        </Text>
        {user && user !== mykey && (
          <View
            style={{
              // backgroundColor: "red",
              // height: 20
              width: '100%',
              marginTop: 15,
            }}>
            <PrimaryButton title="Messages" style={{width: '100%'}} />
            <PrimaryButton
              title="Muster"
              style={{
                width: '100%',
                marginTop: 10,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const Colors = Color();

const Profile = ({route, appState, setMyProfile}) => {
  const User = appState?.User;
  const Profile = appState?.Profile;
  const navigation = useNavigation();
  const user = route?.params?.user || User?.mykey;

  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const getProfile = async () => {
    const result = await usersfullprofile(user);
    setProfileData(result);
    setMyProfile(result);
  };

  const getUserPosts = async () => {
    const result = await myposts(user);
    setUserPosts(result);
  };

  useEffect(() => {
    getProfile();
    getUserPosts();
  }, [user]);
  useEffect(() => {}, [Profile]);

  if (profileData === null) {
    return <ActivityIndicator />;
  }

  const isCurrentUser = user === User?.mykey;
  const pageTitle = isCurrentUser
    ? 'Your Profile'
    : `${profileData?.user?.firstname}'s Profile`;

  return (
    <>
      <HeaderComponent page={pageTitle} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          paddingTop: 100,
          // padding: 20
        }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.header}>
            <BackIcon />
            <Text style={styles.headerText}>{pageTitle}</Text>
          </View>
          <View style={styles.profileContainer}>
            <UserPostFlatlist
              navigation={navigation}
              Header={
                <ProfileHeader
                  Profile={profileData}
                  user={user}
                  mykey={User?.mykey}
                  postlength={userPosts.length}
                  navigation={navigation}
                />
              }
              userData={Profile?.user}
              data={userPosts}
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
    setMyProfile: userData => dispatch(setMyProfile(userData)),
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
