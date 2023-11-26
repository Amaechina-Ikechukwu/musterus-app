import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Style } from '../../../assets/styles';
import { OutlinedInput } from '../../components/inputs';
import { Color } from '../../components/theme';
import { surprise_state, user_state } from '../../redux';
import { fetchFcmToken } from '../../utilities/fcntoken';
import { LoginController } from '../controllers/auth-controller';


import axios from 'axios';

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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
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

    const authenticate = async (username,password)=>{
        
        try{
            

            const url = `https://www.musterus.com/ws/authenticate?username=${username}&password=${password}`;
    
            const response = await axios.get(url);
    
            if (response.status ===200 ){
                const responseData = response.data;
    
                console.log("Response Data:", responseData.mykey);

                if (responseData.mykey){
                    navigation.replace('Dashboard', { screen: 'FEEDS' });
                }
                else{
                    alert("Incorrect Credentials")
                }
            }else{
                console.error("Request Failed with response code:", response.status);
            }
        }catch(error){
            console.error("Authentication Failed:", error.message);
        }
    };

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
                    
                        <View style={{
                            marginTop: 60,
                            justifyContent: "center",
                            alignItems: "center",
                        }} >
                            <Text style={[Style.boldText]}>
                                Login  Account
                            </Text>
                        </View>


                        {/* Input holder */}
                        <View style={{
                            marginTop: 50
                        }} >
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
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("RESET PWD")
                            }} >
                                <Text
                                    style={{
                                        marginTop: 10,
                                        color: Colors.red,
                                    }}
                                >
                                    forgot password?
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                android_ripple={{ color: "white" }}
                                onPress={async() => {
                                    // navigation.replace('Dashboard', { screen: 'FEEDS' });
                                    // webman1995      AcK888777
                                    const username= email;
                                    const password1=password;
                                    await authenticate(username,password1);
                                
                                    
                                }}
                                style={[{
                                    backgroundColor: Colors.primary,
                                    height: 53,
                                    width: "100%",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    elevation: 2,
                                    borderRadius: 20,
                                    paddingHorizontal: 10,
                                    marginTop: 20

                                }]}>
                                <View style={{}} >
                                    <Text style={{ textAlign: "center", fontSize: 15, color: Colors.light }} >Login</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Signup")
                                }}
                            >
                                <Text
                                    style={{
                                        marginTop: 15,
                                        color: Colors.textColor,
                                    }}
                                >
                                    Don’t Have An Account?
                                    <Text style={[Style.TextLink]} > Sign Up</Text>

                                </Text>
                            </TouchableOpacity>
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

