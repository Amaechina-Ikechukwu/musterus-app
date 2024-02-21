import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import {TextInput, Button, Icon, RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendar,
  faEye,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import {Logo} from '../../components/icons';
import {PrimaryButton, SecondaryButton} from '../../components/buttons/primary';
import {Color} from '../../components/theme';
import {
  CustomLogin,
  SaveMetadata,
  fetchMetadata,
  localstorageSaveUserMedata,
  signinService,
  signupService,
} from '../../controllers/auth/authController';
import {Loader} from '../../components/loader';
import {connect} from 'react-redux';
import {surprise_state, user_state, setUser} from '../../redux';
import {Style} from '../../../assets/styles';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';
import {LoginController} from '../controllers/auth-controller';
import {BackIcon} from '../../../assets/icons/auth-icons';
import {OutlinedInput} from '../../components/inputs';
import {signup} from '../apis/signup';
// import RNPaystack from 'react-native-paystack';

const Colors = Color();

function SignIn({navigation, disp_Login, appState, setUser, route}) {
  const [text, setText] = useState('');
  const [gender, setGender] = useState('');
  const {height} = Dimensions.get('window');
  const handleTextChange = useCallback(
    value => {
      setText(value);
    },
    [setText],
  );

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [Fcmoken, setFcmoken] = useState(null);
  const [data, setData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    birtdate: new Date(),
  });
  const {logged} = route.params;
  const [loading, setLoading] = useState(false);

  const onInputChange = (name, value) => {
    setData({...data, [name]: value});
  };
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Close the picker on iOS after selection
    setData({...data, birtdate: currentDate});
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  const formatDate = inputDate => {
    const year = inputDate.getFullYear();
    const month =
      inputDate.getMonth() + 1 < 10
        ? `0${inputDate.getMonth() + 1}`
        : inputDate.getMonth() + 1;
    const day =
      inputDate.getDate() < 10
        ? `0${inputDate.getDate()}`
        : inputDate.getDate();
    return `${year}-${month}-${day}`;
  };

  // useEffect(() => {

  // }, [data]);
  const signupUser = async () => {
    const {username, firstname, lastname, email} = data;

    try {
      if (!firstname || !lastname || !email || !username) {
        Alert.alert('Please fill in all fields');
      } else {
        await signup(firstname, lastname, email, username);

        Alert.alert(
          'Signup Success',
          'You will be notified once we go live. Thank you.',
        );
      }
    } catch (err) {
      Alert.alert('Error Signing');
    }
  };

  const STYLES = ['default', 'dark-content', 'light-content'];
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const Login = () => {
    LoginController({
      phone: data.phone,
      navigation,
      setLoading,
      Alert,
      disp_Login,
      Fcmoken,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.background}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <ScrollView>
          <View style={{width: '100%'}}>
            <Pressable
              onPress={() => {
                navigation.pop();
              }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <BackIcon />
              </View>
            </Pressable>

            <View
              style={{
                marginTop: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[Style.boldText]}>Create Account</Text>
            </View>

            {/* Input holder */}
            <View
              style={{
                marginTop: 50,
              }}>
              <OutlinedInput
                data={data.firstname}
                setData={value => onInputChange('firstname', value)}
                placeholder="Enter your firstname"
              />
              <OutlinedInput
                data={data.lastname}
                setData={value => onInputChange('lastname', value)}
                placeholder="Enter your lastname"
              />
              <OutlinedInput
                data={data.email}
                setData={value => onInputChange('email', value)}
                placeholder="Enter your email"
              />

              <OutlinedInput
                data={data.username}
                setData={value => onInputChange('username', value)}
                placeholder="Enter Username"
              />
              {/* <OutlinedInput
                data={data.password}
                setData={value => onInputChange('password', value)}
                placeholder="Enter Password"
              />
              <OutlinedInput
                data={data.confirmPassword}
                setData={value => onInputChange('confirmPassword', value)}
                placeholder="Confirm Password"
              />
              <View style={{marginBottom: 20}}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={showDatepicker}>
                  <Text style={[Style.Text]}>
                    {`Click to add your date of birth: `}
                  </Text>
                  <Text style={[Style.boldText]}>
                    {` ${formatDate(data.birtdate)}`}
                  </Text>
                </TouchableOpacity>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={data.birtdate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )} */}
              <PrimaryButton
                loading={loading}
                style={{
                  width: '100%',
                  textTransform: 'uppercase',
                  marginTop: 25,
                }}
                callBack={() => {
                  signupUser();
                }}
                title={`Register `}
              />

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Signin');
                }}>
                <Text
                  style={{
                    marginTop: 15,
                    color: Colors.dark,
                    textAlign: 'center',
                  }}>
                  Already Have An Account? Sign In
                </Text>
              </TouchableOpacity>
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
    disp_Login: payload => dispatch(user_state(payload)),
    disp_surprise: payload => dispatch(surprise_state(payload)),
    setUser: userData => dispatch(setUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    // marginBottom: 10,
    width: '100%',
  },
  inputIcon: {
    marginRight: 10,
  },

  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: '92%',
  },
});
