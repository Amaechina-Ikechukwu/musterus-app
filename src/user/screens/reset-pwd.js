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
import {changepassword} from '../apis/changepassword';

const {height, width} = Dimensions.get('window');
const Colors = Color();
let ImgUrl =
  'https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/311838830_3341516792834673_1624830650213567335_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG2I4ezOTyJWd1Q6SaGyWtTt0TqlRk4Rf63ROqVGThF_hMhAEUxrZPmz-YfwDVqi9XSOwJeMBUHJjjW2mK1cXwG&_nc_ohc=tMcuz-iePZwAX-IlhsR&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AfAvDZURMf1osfZvCjNmFOAq3WF5xqNQrwbghpiwEBotoQ&oe=64D287F2';
function Profile({route, appState, disp_surprise}) {
  const User = appState.User;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [data, setData] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [reminderHint, setReminderHint] = useState('');
  const [reminderAnswer, setReminderAnswer] = useState('');
  const changePassword = async () => {
    const result = await changepassword(
      User.mykey,
      User.mskl,
      newPassword,
      confirmPassword,
      reminderHint,
      reminderAnswer,
    );
  };
  useEffect(() => {}, []);

  return (
    <>
      <HeaderComponent page="Profile" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          paddingTop: 20,
          // padding: 20
        }}>
        <AppStatusBar StatusBar={StatusBar} useState={useState} />

        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              marginTop: 80,
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
              }}></View>
          </View>

          <View
            style={{
              // backgroundColor: "red",
              marginTop: 30,
              // alignItems: "center",
              padding: 15,
            }}>
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
              Old password
            </Text>
            <OutlinedInput
              value={oldPassword}
              setData={value => setOldPassword(value)}
              // ...other props
            />

            {/* New password */}
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
              New password
            </Text>
            <OutlinedInput
              value={newPassword}
              setData={value => setNewPassword(value)}
              // ...other props
            />

            {/* Confirm password */}
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
              Confirm password
            </Text>
            <OutlinedInput
              value={confirmPassword}
              setData={value => setConfirmPassword(value)}
              // ...other props
            />

            {/* Reminder hint and answer fields */}
            {/* Reminder hint */}
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
              Reminder hint
            </Text>
            <OutlinedInput
              value={reminderHint}
              setData={value => setReminderHint(value)}
              // ...other props
            />

            {/* Reminder answer */}
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
              Reminder answer
            </Text>
            <OutlinedInput
              value={reminderAnswer}
              setData={value => setReminderAnswer(value)}
              // ...other props
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
                callBack={() => changePassword(alert('Updated profile'))}
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
