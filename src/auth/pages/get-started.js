import {
    StyleSheet,
    View,
    Text,
    Pressable, Dimensions, Alert,
    StatusBar,
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { TextInput, Button, Icon, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faEye, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../../components/icons';
import { InactiveButton, PrimaryButton, SecondaryButton } from '../../components/buttons/primary';
import { Color } from '../../components/theme';
import { CustomLogin, SaveMetadata, fetchMetadata, localstorageSaveUserMedata, signinService, signupService } from '../../controllers/auth/authController';
import { Loader } from '../../components/loader';
import { connect } from 'react-redux';
import { surprise_state, user_state } from '../../redux';
import { Style } from '../../../assets/styles';
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"
import { LoginController } from '../controllers/auth-controller';
import { fetchFcmToken } from '../../utilities/fcntoken';
import { AddPhotoIcon, BackIcon } from '../../../assets/icons/auth-icons';
import { OutlinedInput } from '../../components/inputs';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function SignIn({ navigation, disp_Login, appState, disp_surprise, route }) {
    const [text, setText] = useState('');
    const [gender, setGender] = useState('');
    const { height } = Dimensions.get('window');
    const handleTextChange = useCallback((value) => {
        setText(value);
    }, [setText]);

    const [Fcmoken, setFcmoken] = useState(null)
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        console.log("OK")
        fetchFcmToken(setFcmoken)

    }, [setFcmoken])

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
            Fcmoken
        })
    }

    return (

        <>
            {console.log(Fcmoken)}
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor={Colors.background}
                    barStyle={statusBarStyle}
                    showHideTransition={statusBarTransition}
                    hidden={hidden}
                />
                <ScrollView >
                    <View style={{ width: "100%" }} >
                        <Pressable
                            onPress={() => {
                                navigation.pop()
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
                        </Pressable>


                        <View style={{
                            marginTop: 60,
                            // width:"70%"
                            justifyContent: "center",
                            alignItems: "center",
                        }} >
                            <Text style={[Style.boldText]}>
                                Profile Info
                            </Text>
                            <Text style={[Style.LabelText, { marginTop: 10 }]}>
                                Provide your username and a profile picture
                            </Text>
                        </View>


                        {/* Input holder */}
                        <View style={{

                        }} >
                            <TouchableOpacity style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginVertical: 40
                            }} >
                                <AddPhotoIcon />
                            </TouchableOpacity>

                            <OutlinedInput
                                data={data}
                                setData={setData}
                                dataCount
                                count={24}
                                placeholder="Enter your username"
                            />
                            <Text
                                style={{
                                    marginTop: 5,
                                    color: Colors.grey,
                                    fontSize: 17
                                }}
                            >
                                {data.length}/24
                            </Text>

                            {/* <InactiveButton
                                loading={loading}
                                textColor={Colors.light}
                                style={{
                                    width: "100%",
                                    textTransform: 'uppercase',
                                    marginTop: 50,
                                    backgroundColor: Colors.inactiveButton,
                                }} callBack={() => {
                                    Login()
                                }} title={`Confirm`} /> */}
                            <PrimaryButton
                                loading={loading}
                                style={{
                                    width: "100%",
                                    textTransform: 'uppercase',
                                    marginTop: 50,
                                    backgroundColor: data.length < 3 ? Colors.inactiveButton : Colors.primary,
                                }} callBack={() => {
                                    navigation.replace('Dashboard', { screen: 'FEEDS' });
                                }} title={`Confirm `} />
                        </View>

                    </View>


                </ScrollView>
            </SafeAreaView>
        </>

    );
}


const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        disp_Login: (payload) => dispatch(user_state(payload)),
        disp_surprise: (payload) => dispatch(surprise_state(payload)),
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

