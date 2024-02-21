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
import {login} from '../apis/login';
import {mylogin} from '../apis/mylogin';
// import RNPaystack from 'react-native-paystack';

const Colors = Color();

function SignIn({navigation, disp_Login, setUser, route}) {
  const [text, setText] = useState('');
  const [gender, setGender] = useState('');
  const {height} = Dimensions.get('window');
  const handleTextChange = useCallback(
    value => {
      setText(value);
    },
    [setText],
  );
  const {logged} = route.params;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [Fcmoken, setFcmoken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    try {
      const result = await login(email, password);
      if (result) {
        if (result.err == undefined) {
          setUser(result);
          navigation.replace('Dashboard', {screen: 'FEEDS'});
          logged();
        } else {
          Alert.alert('Login', 'Please ensure your login details are correct');
        }
      } else {
        Alert.alert('Login', 'Please ensure your login details are correct');
      }
    } catch (err) {
      Alert.alert('Login', 'Could not log you in at this time');
    }
  };
  useEffect(() => {}, [email, password]);

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
            {/* <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Signup")
                            }}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }} >
                            <View style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "row",
                                alignItems: "center"
                            }} >
                                <BackIcon />
                            </View>
                        </TouchableOpacity> */}

            <View
              style={{
                marginTop: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[Style.boldText]}>Login Account</Text>
            </View>

            {/* Input holder */}
            <View
              style={{
                marginTop: 50,
              }}>
              <OutlinedInput
                data={email}
                setData={setEmail}
                placeholder="Enter your email"
              />
              <OutlinedInput
                data={password}
                setData={setPassword}
                placeholder="Password"
              />
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RESET PWD');
                }}>
                <Text
                  style={{
                    marginTop: 10,
                    color: Colors.red,
                  }}>
                  forgot password?
                </Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                android_ripple={{color: 'white'}}
                onPress={() => loginUser()}
                // onPress={() => {
                //   navigation.replace('Dashboard', {screen: 'FEEDS'});
                // }}
                style={[
                  {
                    backgroundColor: Colors.primary,
                    height: 53,
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 2,
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    marginTop: 20,
                  },
                ]}>
                <View style={{}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      color: Colors.light,
                    }}>
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                <Text
                  style={{
                    marginTop: 15,
                    color: Colors.textColor,
                  }}>
                  Don’t Have An Account?
                  <Text style={[Style.TextLink]}> Sign Up</Text>
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
