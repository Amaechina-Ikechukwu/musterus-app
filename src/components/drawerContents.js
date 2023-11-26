import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {Divider, Avatar} from 'react-native-paper';
import {Color} from './theme';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  faAdd,
  faBookBible,
  faBookOpen,
  faBookOpenReader,
  faBriefcase,
  faCheckCircle,
  faChevronRight,
  faDonate,
  faEnvelopeSquare,
  faGear,
  faLock,
  faMessage,
  faMoneyBill,
  faPlusSquare,
  faSearch,
  faSignIn,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {isAuth} from '../auth/models/auth-models';
import {Style} from '../../assets/styles';
import {FadedIcon} from './fadedIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Svg, {Path} from 'react-native-svg';
import {logout} from './apis/logout';

export function ArrowRight() {
  return (
    <>
      <Svg xmlns="http://www.w3.org/2000/svg" width={6} height={12} fill="none">
        <Path
          fill="#FFFDF8"
          d="M.155 11.344a.534.534 0 0 1-.051-.693l.051-.06L4.722 6 .155 1.409A.535.535 0 0 1 .104.716l.051-.06a.527.527 0 0 1 .69-.052l.059.052 4.94 4.968a.535.535 0 0 1 .052.693l-.051.06-4.941 4.967a.527.527 0 0 1-.749 0Z"
        />
      </Svg>
    </>
  );
}

let ImgUrl =
  'https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/324293849_3370804233196602_134225334160101172_n.jpg?_nc_cat=105&cb=99be929b-59f725be&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeHadWpDKaZmTwsY24VIN19Srl1RPqtckHSuXVE-q1yQdH9o_yt1WuoQps5qnC42voWOdi1D4OlIYaq39e7I1Ht6&_nc_ohc=K3fXPsmAaa0AX-QqmYs&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&oh=00_AfBawaPypJwhLdAEc4K91wS6y2OfCsPbIDv4rwW0QBKSFw&oe=64D92A6E';

function HelloFriday({appState, navigate}) {
  const Colors = Color();
  const navigation = useNavigation();
  const closeDrawer = () => navigation.dispatch(DrawerActions.closeDrawer());
  const [auth, setAuth] = useState();
  const {mykey} = appState.User;

  const forlogOut = async () => {
    // Ensure mykey is defined correctly or passed as a parameter
    logout(mykey);
    navigate();
  };

  return (
    <>
      <View style={{backgroundColor: Colors.primary, flex: 1}}>
        <ScrollView style={{backgroundColor: Colors.primary}}>
          <View
            style={{
              flex: 1,
              // backgroundColor:"red"
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 70,
              }}>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate("Profile")
                }}>
                <Image
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 65,
                  }}
                  src={ImgUrl}
                  resizeMode={'cover'}
                />
              </TouchableOpacity>

              <Text
                style={[
                  Style.bolder,
                  {
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 19,
                    color: Colors.light,
                  },
                ]}>
                Princess Dala
              </Text>
            </View>

            <View>
              <Divider
                style={{
                  marginBottom: 30,
                  marginTop: 30,
                  backgroundColor: Colors.primary,
                }}
              />

              {/* edit profile */}

              <TouchableOpacity
                android_ripple={{color: Colors.secondary}}
                onPress={() => {
                  navigation.navigate('Edit profile');
                  closeDrawer();
                }}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 17,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  // backgroundColor: "red",
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    Style.Text,
                    {
                      marginLeft: 20,
                      flex: 1,
                      color: Colors.lightgrey,
                    },
                  ]}>
                  Edit profile
                </Text>

                <ArrowRight />
              </TouchableOpacity>

              {/* <Divider style={{}} /> */}

              {/* reset password */}
              <TouchableOpacity
                android_ripple={{color: Colors.secondary}}
                onPress={() => {
                  navigation.navigate('Reset pwd');
                  closeDrawer();
                }}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 17,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  // backgroundColor: "red",
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    Style.Text,
                    {
                      marginLeft: 20,
                      flex: 1,
                      color: Colors.lightgrey,
                    },
                  ]}>
                  Reset password
                </Text>

                <ArrowRight />
              </TouchableOpacity>

              {/* <Help and suport /> */}
              <TouchableOpacity
                android_ripple={{color: Colors.secondary}}
                onPress={() => {
                  navigation.navigate('Edit profile');
                  closeDrawer();
                }}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 17,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  // backgroundColor: "red",
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    Style.Text,
                    {
                      marginLeft: 20,
                      flex: 1,
                      color: Colors.lightgrey,
                    },
                  ]}>
                  Help and suport
                </Text>

                <ArrowRight />
              </TouchableOpacity>

              {/*Terms */}
              <TouchableOpacity
                android_ripple={{color: Colors.secondary}}
                onPress={() => {
                  navigation.navigate('Edit profile');
                  closeDrawer();
                }}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 17,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  // backgroundColor: "red",
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    Style.Text,
                    {
                      marginLeft: 20,
                      flex: 1,
                      color: Colors.lightgrey,
                    },
                  ]}>
                  Terms of use
                </Text>

                <ArrowRight />
              </TouchableOpacity>

              {/* Privacy policy */}
              <TouchableOpacity
                android_ripple={{color: Colors.secondary}}
                onPress={() => {
                  navigation.navigate('Edit profile');
                  closeDrawer();
                }}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 17,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  // backgroundColor: "red",
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    Style.Text,
                    {
                      marginLeft: 20,
                      flex: 1,
                      color: Colors.lightgrey,
                    },
                  ]}>
                  Privacy policy
                </Text>

                <ArrowRight />
              </TouchableOpacity>
            </View>

            {/* <Divider style={{ marginBottom: 30, marginTop: 30, }} /> */}
          </View>
        </ScrollView>
        <View
          style={{
            // justifyContent: "center",
            alignItems: 'center',
            marginBottom: 50,
          }}>
          <TouchableOpacity
            onPress={forlogOut}
            style={{
              backgroundColor: '#E72A2A',
              width: 138,
              height: 55,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>LogOut</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const mapStateToProps = state => {
  return {
    appState: state.user,
  };
};
export default connect(mapStateToProps)(HelloFriday);
