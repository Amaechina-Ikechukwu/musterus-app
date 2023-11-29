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
import {Color} from '../../components/theme';
import {connect} from 'react-redux';
import {surprise_state, user_state} from '../../redux';
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
import {OutlinedInput} from '../../components/inputs';
import {editprofile, updateprofile} from '../apis/editprofile';

const {height, width} = Dimensions.get('window');
const Colors = Color();
let ImgUrl =
  'https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/311838830_3341516792834673_1624830650213567335_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG2I4ezOTyJWd1Q6SaGyWtTt0TqlRk4Rf63ROqVGThF_hMhAEUxrZPmz-YfwDVqi9XSOwJeMBUHJjjW2mK1cXwG&_nc_ohc=tMcuz-iePZwAX-IlhsR&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AfAvDZURMf1osfZvCjNmFOAq3WF5xqNQrwbghpiwEBotoQ&oe=64D287F2';
function Profile({route, appState, disp_surprise}) {
  const {User, Profile} = appState;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [firstname, setFirstname] = useState(Profile?.user?.firstname);
  const [lastname, setLastname] = useState(Profile?.user?.lastname);
  const [username, setUsername] = useState(Profile?.user?.username);
  const [bio, setBio] = useState(Profile?.user?.bio);
  const editProfile = async () => {
    try {
      await updateprofile(User?.mykey, firstname, lastname, username, bio).then(
        () => {
          Alert.alert('Updating profile', 'Profile Updated');
          navigation.pop();
        },
      );
    } catch (err) {
      Alert.alert(
        'Error updating profile',
        'Unfortunately, your profile can not be updated at this time',
      );
    }
  };
  useEffect(() => {}, []);

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
              <LabelTexts style={{marginLeft: 15}} text="Edit Profile" />
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
              // alignItems: "center",
              padding: 15,
            }}>
            <View
              style={{
                // backgroundColor: "red",
                marginTop: 10,
                alignItems: 'center',
                padding: 15,
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
                  src={ImgUrl}
                  resizeMode={'cover'}
                />
              </TouchableOpacity>

              <Text
                style={[
                  Style.text,
                  {
                    marginTop: 10,
                    marginBottom: 10,
                    color: Colors.primary,
                  },
                ]}>
                Edit picture
              </Text>
            </View>

            <Text
              style={[
                Style.text,
                {
                  marginTop: 15,
                  marginBottom: -18,
                  color: Colors.grey,
                  textAlign: 'left',
                },
              ]}>
              Name
            </Text>
            <OutlinedInput value={firstname} setData={setFirstname} />
            <OutlinedInput value={lastname} setData={setLastname} />

            <Text
              style={[
                Style.text,
                {
                  marginTop: 25,
                  marginBottom: -18,
                  color: Colors.grey,
                  textAlign: 'left',
                },
              ]}>
              Username
            </Text>

            <OutlinedInput value={username} setData={setUsername} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 25,
              }}>
              <Text
                style={[
                  Style.text,
                  {
                    marginBottom: -18,
                    color: Colors.grey,
                    textAlign: 'left',
                  },
                ]}>
                Bio
              </Text>
              <Text
                style={[
                  Style.text,
                  {
                    marginTop: 15,
                    marginBottom: -18,
                    color: Colors.grey,
                    textAlign: 'left',
                  },
                ]}>
                {100 - (bio ? bio.length : 0)}
              </Text>
            </View>
            <TextInput
              // keyboardType='numeric'
              // autoFocus
              value={bio}
              onChangeText={value => {
                if (value.length <= 100) {
                  setBio(value);
                }
              }}
              style={{
                width: '100%',
                marginTop: 20,
                height: 100,
              }}
              textColor={Colors.dark}
              outlineColor={Colors.inputOutlind}
              activeOutlineColor="#999"
              theme={{
                colors: {
                  primary: Colors.dark,
                  background: Colors.background,
                  placeholder: 'red',
                },
                roundness: 10,
              }}
              mode="outlined"
              multiline
              // label="Update your bio"
            />

            <View
              style={{
                // backgroundColor: "red",
                // height: 20
                width: '100%',
                marginTop: 70,
              }}>
              <PrimaryButton
                title="Update"
                style={{width: '100%'}}
                callBack={() => {
                  editProfile();
                }}
              />
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
