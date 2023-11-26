import {
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Divider, Avatar} from 'react-native-paper';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {Color} from '../../components/theme';
import {connect} from 'react-redux';
import {surprise_state, setMyProfile} from '../../redux';
import {useNavigation} from '@react-navigation/native';
import {AppStatusBar} from '../../components/status-bar';
import {HeaderComponent} from '../../components/header';
import {BackIcon} from '../../../assets/icons/auth-icons';
import {LabelTexts} from '../../events/components/texts';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {Style} from '../../../assets/styles';
import {PrimaryButton} from '../../components/buttons/primary';
import {FeedCard} from '../../events/components/feed-card';
import {ThreeDots} from '../../events/components/icons';
import {StaticImage} from '../../utilities';
import {profile} from '../apis/profile';

const {height, width} = Dimensions.get('window');
const Colors = Color();
function Profile({route, appState, setMyProfile}) {
  const User = appState?.User;
  const Profile = appState?.Profile;
  const userProfile = Profile?.MyProfile;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const getProfile = async () => {
    const result = await profile(User.mykey, User.mskl);

    setMyProfile(result);
  };
  useLayoutEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {}, [Profile]);
  if (Profile == null) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <HeaderComponent page="Profile" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          paddingTop: 100,
          // padding: 20
        }}>
        <AppStatusBar StatusBar={StatusBar} useState={useState} />

        <ScrollView>
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
              <LabelTexts style={{marginLeft: 15}} text="Profile" />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                // backgroundColor: "blue",
                justifyContent: 'flex-end',
              }}>
              {/* <TouchableOpacity style={{
                                // backgroundColor: "green", 
                                flex: 1,
                                width: 100,
                                justifyContent: "center",
                                alignItems: "flex-end",
                                paddingRight:15
                            }}>
                                <ThreeDots />
                            </TouchableOpacity> */}
            </View>
          </View>

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
                src={StaticImage}
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
              {userProfile?.firstname + ' ' + userProfile?.lastname}
            </Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={[
                  Style.TinyText,
                  {
                    margin: 10,
                  },
                ]}>
                {Profile?.MyPosts?.length} post
              </Text>

              <Text
                style={[
                  Style.TinyText,
                  {
                    margin: 10,
                  },
                ]}>
                {Profile?.MyFriends?.length} following
              </Text>

              <Text
                style={[
                  Style.TinyText,
                  {
                    margin: 10,
                  },
                ]}>
                {Profile?.MyFollowers?.length} followers
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
              I believe that a lot of how you look is to do with how you feel
              about yourself and your life
            </Text>

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

            <View
              style={{
                marginTop: 20,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  padding: 15,
                }}>
                <Text
                  style={{
                    borderBottomWidth: 2.6,
                    borderBottomColor: Colors.primary,
                    width: 58,
                    paddingBottom: 9,
                    color: Colors.grey,
                    fontWeight: 500,
                    fontSize: 15,
                  }}>
                  My posts
                </Text>
              </View>
              <FeedCard image />
              <FeedCard />
              <FeedCard image />
              <FeedCard />
              <FeedCard image />
              <FeedCard />
            </View>
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
    setMyProfile: userData => dispatch(setMyProfile(userData)),
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
