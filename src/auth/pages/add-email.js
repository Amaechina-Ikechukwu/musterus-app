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
import { BackIcon } from '../../../assets/icons/auth-icons';
import { OutlinedInput } from '../../components/inputs';
import { SuccessAlert } from '../components/success';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function SignIn({ navigation, disp_Login, appState, disp_surprise, route }) {
    const [text, setText] = useState('');
    const [gender, setGender] = useState('');
    const { height } = Dimensions.get('window');
    const handleTextChange = useCallback((value) => {
        setText(value);
    }, [setText]);

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [Fcmoken, setFcmoken] = useState(null)
    const [data, setData] = useState({
        phone: ""
    });
    const [loading, setLoading] = useState(false)

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setData({ ...data, date: currentDate })
    };

    useEffect(() => {
        console.log("OK")
        fetchFcmToken(setFcmoken)

    }, [setDate])

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
    const [modalVisible, setModalVisible] = useState(false);
    return (

        <>
            {modalVisible &&
                <SuccessAlert
                    loading={loading}
                    navigation={navigation}
                    setModalVisible={setModalVisible}
                />
            }
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor={Colors.light}
                    barStyle={statusBarStyle}
                    showHideTransition={statusBarTransition}
                    hidden={hidden}
                />
                <ScrollView >
                    <View style={{ width: "100%" }} >
                        <Pressable
                            onPress={() => {
                                navigation.navigate("Select state")
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
                            justifyContent: "center",
                            alignItems: "center",
                        }} >
                            <Text style={[Style.boldText, { color: Colors.dark }]}>
                                Enter Your Email Address
                            </Text>
                        </View>


                        {/* Input holder */}
                        <View style={{
                            marginTop: 50
                        }} >
                            <OutlinedInput
                                data={data}
                                setData={setData}
                                placeholder="Enter your email"
                            />

                            <PrimaryButton
                                loading={loading}
                                style={{
                                    width: "100%",
                                    textTransform: 'uppercase',
                                    marginTop: 70
                                }} callBack={() => {
                                    // navigation.navigate("Enter OTP")
                                    setModalVisible(true)
                                }} title={`Authenticate `} />

                            <InactiveButton
                                loading={loading}
                                textColor={Colors.dark}
                                style={{
                                    width: "100%",
                                    textTransform: 'uppercase',
                                    marginTop: 20,
                                    borderWidth: 1,
                                    borderColor: Colors.inputOutline
                                }} callBack={() => {
                                    setModalVisible(true)
                                }} title={`Later `} />
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

