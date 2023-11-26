import {
    StyleSheet,
    View,
    Text,
    Pressable, Image, Dimensions, Alert,
    StatusBar
} from 'react-native';
import { Divider, Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { TextInput, Button, Icon, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../../components/icons';
import { PrimaryButton } from '../../components/buttons/primary';
import { Color } from '../../components/theme';
import { CustomLogin, SaveMetadata, fetchMetadata, localstorageSaveUserMedata, signinService, signupService } from '../../controllers/auth/authController';
import { Loader } from '../../components/loader';
import { connect } from 'react-redux';
import { surprise_state, user_state } from '../../redux';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Style } from '../../../assets/styles';
// import { monthNames } from '../../utilities';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function Add_details({ navigation, disp_user, appState, disp_surprise, route }) {
    const [text, setText] = useState('');
    const [gender, setGender] = useState('');
    const { height } = Dimensions.get('window');
    const handleTextChange = useCallback((value) => {
        setText(value);
    }, [setText]);

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [checked, setChecked] = useState('first');
    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const [data, setData] = useState({});
    const [authReroute, setAuthReroute] = useState({});
    const [loading, setLoading] = useState(false)

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setData({ ...data, date: currentDate })
    };

    const [PageState, setPageState] = useState("")
    const [remote, setRemote] = useState("")

    const [currentFellowship, setFellowship] = useState(null)
    const [selectedValue, setselectedValue] = useState("Dues")


    const [monthNames, setmonthNames] = useState(
        [
            {
                name: "Jan",
                paid: true,
                picked: false,
                pay: false
            },
            {
                name: "Feb",
                paid: true,
                picked: false,
                pay: false
            },
            {
                name: "Mar",
                paid: false,
                picked: false,
                pay: false
            },
            {
                name: "Apr",
                paid: false,
                picked: false,
                pay: false
            },
            {
                name: "May",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Jun",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Jul",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Aug",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Sept",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Oct",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Nov",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Dec",
                paid: false,
                picked: false,
                pay: false
            },
        ]
    )

    const [monthNamesAlt, setmonthNamesAlt] = useState(
        [
            {
                name: "Jan",
                paid: true,
                picked: false,
                pay: false
            },
            {
                name: "Feb",
                paid: true,
                picked: false,
                pay: false
            },
            {
                name: "Mar",
                paid: false,
                picked: false,
                pay: false
            },
            {
                name: "Apr",
                paid: false,
                picked: false,
                pay: false
            },
            {
                name: "May",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Jun",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Jul",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Aug",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Sept",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Oct",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Nov",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Dec",
                paid: false,
                picked: false,
                pay: false
            },
        ]
    )


    useEffect(() => {
        console.log("Auth screen")
        if (route.params) {
            if (route.params.data && route.params.data.Auth) {
                setAuthReroute({
                    data: route.params.data.CartItems,
                    route: "Checkout"
                })
            } else {
                setAuthReroute({
                    data: {},
                    route: "Home"
                })
            }

            console.log(route.params.data)
        } else {
            console.log("No data")
        }

        const unsubscribe = navigation.addListener('focus', async () => {
            let selectedFellowship = await AsyncStorage.getItem("FELLOWSHIP")
            console.log(selectedFellowship)
            setFellowship(JSON.parse(selectedFellowship))
            setPageState("SELECT PAYMENT TYPE")
        });

        return unsubscribe;

    }, [navigation])

    const selectMonth = (data) => {
        // console.log(data)
        let select = monthNames.filter(e => e.name == data.name)[0]
        // console.log(select)
        let index = monthNames.findIndex(e => e.name == data.name)
        if (select.picked == true) {
            let newSelect = {
                ...select,
                picked: false
            }
            let newSelectAlt = {
                ...select,
                pay: false
            }
            monthNames.splice(index, 1, newSelect)
            monthNamesAlt.splice(index, 1, newSelectAlt)
            setmonthNames(monthNames)
            setmonthNamesAlt(monthNamesAlt)
            console.log("unselect")
        } else {
            let newSelect = {
                ...select,
                picked: true
            }
            let newSelectAlt = {
                ...select,
                pay: true
            }

            monthNames.splice(index, 1, newSelect)
            monthNamesAlt.splice(index, 1, newSelectAlt)
            setmonthNames(monthNames)
            setmonthNamesAlt(monthNamesAlt)
            console.log("select")
        }

        setRemote(Date.now())
    }

    //=======================================================

    let currentYear = new Date().getFullYear()
    const [Years, setYears] = useState(
        [
            {
                name: currentYear,
                paid: true,
                picked: false
            },
            {
                name: currentYear + 1,
                paid: false,
                picked: false
            },
            {
                name: currentYear + 2,
                paid: false,
                picked: false
            }, {
                name: currentYear + 3,
                paid: false,
                picked: false
            }, {
                name: currentYear + 4,
                paid: false,
                picked: false
            }, {
                name: currentYear + 5,
                paid: false,
                picked: false
            }, {
                name: currentYear + 6,
                paid: false,
                picked: false
            }, {
                name: currentYear + 7,
                paid: false,
                picked: false
            },
        ]
    )

    const [YearsAlt, setYearsAlt] = useState(
        [
            {
                name: currentYear,
                paid: true,
                picked: false,
                pay: false
            },
            {
                name: currentYear + 1,
                paid: false,
                picked: false,
                pay: false
            },
            {
                name: currentYear + 2,
                paid: false,
                picked: false,
                pay: false
            }, {
                name: currentYear + 3,
                paid: false,
                picked: false,
                pay: false
            }, {
                name: currentYear + 4,
                paid: false,
                picked: false,
                pay: false
            }, {
                name: currentYear + 5,
                paid: false,
                picked: false,
                pay: false
            }, {
                name: currentYear + 6,
                paid: false,
                picked: false,
                pay: false
            }, {
                name: currentYear + 7,
                paid: false,
                picked: false,
                pay: false
            },
        ]
    )

    const selectYear = (data) => {
        // console.log(data)
        let select = Years.filter(e => e.name == data.name)[0]
        // console.log(select)
        let index = Years.findIndex(e => e.name == data.name)
        if (select.picked == true) {
            let newSelect = {
                ...select,
                picked: false
            }
            let newSelectAlt = {
                ...select,
                pay: false
            }
            Years.splice(index, 1, newSelect)
            YearsAlt.splice(index, 1, newSelectAlt)
            setYears(Years)
            setYearsAlt(YearsAlt)
            console.log("unselect")
        } else {
            let newSelect = {
                ...select,
                picked: true
            }
            let newSelectAlt = {
                ...select,
                pay: true
            }

            Years.splice(index, 1, newSelect)
            YearsAlt.splice(index, 1, newSelectAlt)
            setYears(Years)
            setYearsAlt(YearsAlt)
            console.log("select")
        }

        setRemote(Date.now())
    }


    const ProceedToPay = () => {
        let monthCount = monthNamesAlt.filter(e => e.pay == true)
        let yearCount = YearsAlt.filter(e => e.pay == true)

        if (selectedValue == "Registration") {
            if (yearCount < 1) {
                Alert.alert("Error", "Select at least one year before you can proceed to make payment",
                    [
                        {
                            text: "Close",
                        }
                    ]
                );
            } else {

            }
        } else {
            if (monthCount < 1) {
                Alert.alert("Error", "Select at least one month before you can proceed to make payment",
                    [
                        {
                            text: "Close",
                        }
                    ]
                );
            } else {

            }
        }
        console.log(monthCount.length) //month count
        console.log(yearCount.length) //year count
        console.log(selectedValue) // payment for dues or reg
        console.log(currentFellowship) // selected fellowship
    }



    const STYLES = ['default', 'dark-content', 'light-content'];
    const TRANSITIONS = ['fade', 'slide', 'none'];
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
    const [statusBarTransition, setStatusBarTransition] = useState(
        TRANSITIONS[0],
    );
    const changeStatusBarVisibility = () => setHidden(!hidden);
    const changeStatusBarStyle = () => {
        const styleId = STYLES.indexOf(statusBarStyle) + 1;
        if (styleId === STYLES.length) {
            setStatusBarStyle(STYLES[0]);
        } else {
            setStatusBarStyle(STYLES[styleId]);
        }
    };
    const changeStatusBarTransition = () => {
        const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
        if (transition === TRANSITIONS.length) {
            setStatusBarTransition(TRANSITIONS[0]);
        } else {
            setStatusBarTransition(TRANSITIONS[transition]);
        }
    };
    return (

        <>
            <View style={{
                display: "flex",
                flexDirection: "column",
                // marginTop: 10,
                // backgroundColor: Colors.light,
                // backgroundColor: "red",
                marginBottom: 5,
                position: 'absolute',
                // top: 10,
                // right: 19,
                zIndex: 2000,
                width: "100%",
                // height: 50,
                paddingTop: 15,
                paddingBottom: 10,
            }} >
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                    height: 40,
                    // paddingBottom:10
                }} >
                    <View style={{
                        borderBottomWidth: 0, borderBottomColor: Colors.white,
                        backgroundColor: Colors.primary,
                        flex: 1, alignItems: "center", borderRadius: 8,
                        paddingTop: 10, marginLeft: 10
                    }} >
                        <Text style={{
                            fontSize: 13, color: Colors.light, flex: 1, fontWeight: 900
                        }} > Dues / Reg </Text>
                    </View>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("pay-tithe")
                        }}
                        style={{
                            borderBottomWidth: 0, borderBottomColor: Colors.white,
                            //  backgroundColor:Colors.light,
                            paddingTop: 10,
                            borderRadius: 8,
                            flex: 1, alignItems: "center"
                        }} >
                        <Text style={{
                            fontSize: 13, color: Colors.dark, flex: 1, fontWeight: 900
                        }} >Pay Tithe </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Donations")
                        }}
                        style={{
                            borderBottomWidth: 0, borderBottomColor: Colors.light,
                            // backgroundColor: "red",
                            paddingTop: 10,
                            borderRadius: 8,
                            flex: 1, alignItems: "center"
                        }} >
                        <Text style={{
                            fontSize: 13, color: Colors.dark, flex: 1, fontWeight: 900
                        }} >Donations </Text>
                    </Pressable>
                </View>

                <Pressable
                    onPress={() => {
                        navigation.navigate("finance-history")
                    }}
                    style={[{ marginTop: 15, marginRight: 30 }]} >
                    <Text style={[Style.TextLink,{textAlign:"right"}]} >View histories</Text></Pressable>
                <Divider style={{ marginTop: 20 }} />
            </View >
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor={Colors.light}
                    barStyle={statusBarStyle}
                    showHideTransition={statusBarTransition}
                    hidden={hidden}
                />
                <View style={styles.content}>
                    <View
                        style={{
                            width: "100%"
                        }}
                    >

                        {currentFellowship == null ? <>
                            <Pressable
                                onPress={() => { navigation.navigate("Select-fellowship") }}
                                style={{
                                    backgroundColor: Colors.light,
                                    padding: 15,
                                    borderRadius: 10,
                                    marginTop: 20,
                                    marginBottom: 20,
                                    borderColor: Colors.lightgrey,
                                    borderWidth: 2,


                                }}
                            >
                                <Text
                                    style={{
                                        color: Colors.dark,
                                        fontSize: 14,
                                        // fontWeight: 900
                                    }}>
                                    Select your fellowship
                                </Text>
                            </Pressable>

                        </> : <>
                            <View
                                style={{
                                    // backgroundColor:"#E1ECF4",
                                    backgroundColor: Colors.light,
                                    padding: 18,
                                    // borderRadius: 10,
                                    marginTop: 20,
                                    marginBottom: 20,
                                    borderRadius: 6,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around"
                                }}
                            >
                                <Text
                                    style={{
                                        color: Colors.dark,
                                        fontSize: 20,
                                        // textAlign:"center",
                                        fontWeight: 900,
                                        flex: 9,
                                        // backgroundColor:"red",
                                        textAlign: "center"
                                    }}>
                                    {currentFellowship.label}
                                </Text>
                                <Pressable
                                    onPress={() => { navigation.navigate("Select-fellowship") }}
                                    style={{ flex: 1 }}
                                >
                                    <FontAwesomeIcon size={16} style={{
                                        flex: 1,
                                        color: Colors.primary,
                                        opacity: 0.8,
                                        marginLeft: 10
                                        // margin: 20,
                                    }}
                                        icon={faEdit} />
                                </Pressable>
                            </View>

                        </>}

                        {currentFellowship != null &&
                            <>
                                <Text style={{ marginTop: 5, marginBottom: 4 }}>Payment Duration</Text>
                                <Picker

                                    style={{
                                        backgroundColor: Colors.lightgrey,
                                        color: Colors.dark,
                                        borderRadius: 80,
                                        marginBottom: 10,
                                        borderWidth: 20,
                                        borderColor: "red"
                                    }}
                                    dropdownIconColor={Colors.dark}
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setselectedValue(itemValue)
                                    }
                                    }
                                >
                                    <Picker.Item label="Dues" value="Dues" />
                                    <Picker.Item label="Registration" value="Registration" />
                                </Picker>

                                {
                                    selectedValue == "Dues" ? <>
                                        <View style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}>
                                            <Text style={{
                                                marginLeft: 10, marginTop: 20, marginBottom: -1,
                                                textAlign: "left"
                                            }}> You can select multiple months</Text>

                                        </View>

                                        <View
                                            style={{
                                                // backgroundColor: "red"
                                            }}
                                        >
                                            <View style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-around"
                                            }}>
                                                {
                                                    monthNames.slice(0, 4).map((e, key) => {
                                                        return (
                                                            <Pressable
                                                                key={key}
                                                                onPress={() => {
                                                                    if (e.paid != true) {
                                                                        selectMonth(e)
                                                                    }
                                                                }}
                                                                style={{
                                                                    backgroundColor: e.paid == true ? "#E1ECF4" : e.picked == true ? "#fbf1e3" : Colors.light, height: 60, width: 60,
                                                                    justifyContent: "center", alignItems: "center",
                                                                    margin: 15,
                                                                    borderRadius: 7
                                                                }}><Text style={{ fontWeight: 900, color: Colors.dark }} >{e.name}</Text></Pressable>
                                                        )
                                                    })
                                                }
                                            </View>

                                            <View style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-around",
                                                marginTop: -20
                                            }}>
                                                {
                                                    monthNames.slice(4, 8).map((e, key) => {
                                                        return (
                                                            <Pressable
                                                                key={key}
                                                                onPress={() => {
                                                                    if (e.paid != true) {
                                                                        selectMonth(e)
                                                                    }
                                                                }}
                                                                style={{
                                                                    backgroundColor: e.paid == true ? "#E1ECF4" : e.picked == true ? "#fbf1e3" : Colors.light, height: 60, width: 60,
                                                                    justifyContent: "center", alignItems: "center",
                                                                    margin: 15, borderRadius: 7
                                                                }}><Text style={{ fontWeight: 900, color: Colors.dark }} >{e.name}</Text></Pressable>
                                                        )
                                                    })
                                                }
                                            </View>

                                            <View style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-around",
                                                marginTop: -20
                                            }}>
                                                {
                                                    monthNames.slice(8, 12).map((e, key) => {
                                                        return (
                                                            <Pressable
                                                                key={key}
                                                                onPress={() => {
                                                                    if (e.paid != true) {
                                                                        selectMonth(e)
                                                                    }
                                                                }}
                                                                style={{
                                                                    backgroundColor: e.paid == true ? "#E1ECF4" : e.picked == true ? "#fbf1e3" : Colors.light, height: 60, width: 60,
                                                                    justifyContent: "center", alignItems: "center",
                                                                    margin: 15, borderRadius: 7
                                                                }}><Text style={{ fontWeight: 900, color: Colors.dark }} >{e.name}</Text></Pressable>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>

                                    </> :
                                        <>
                                            <View style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between"
                                            }}>
                                                <Text style={{
                                                    marginLeft: 10, marginTop: 20, marginBottom: -1,
                                                    textAlign: "left"
                                                }}>
                                                    You can select multiple years
                                                </Text>

                                            </View>

                                            <View
                                                style={{
                                                    // backgroundColor: "red"
                                                }}
                                            >
                                                <View style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-around"
                                                }}>
                                                    {
                                                        Years.slice(0, 4).map((e, key) => {
                                                            console.log(e)
                                                            return (
                                                                <Pressable
                                                                    key={key}
                                                                    onPress={() => {
                                                                        if (e.paid != true) {
                                                                            selectYear(e)
                                                                        }
                                                                    }}
                                                                    style={{
                                                                        backgroundColor: e.paid == true ? "#E1ECF4" : e.picked == true ? "#fbf1e3" : Colors.light, height: 60, width: 60,
                                                                        justifyContent: "center", alignItems: "center",
                                                                        margin: 15,
                                                                        borderRadius: 7
                                                                    }}><Text style={{ fontWeight: 900, color: Colors.dark }} >{e.name}</Text></Pressable>
                                                            )
                                                        })
                                                    }
                                                </View>

                                                <View style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-around",
                                                    marginTop: -20
                                                }}>
                                                    {
                                                        Years.slice(4, 8).map((e, key) => {
                                                            return (
                                                                <Pressable
                                                                    key={key}
                                                                    onPress={() => {
                                                                        if (e.paid != true) {
                                                                            selectYear(e)
                                                                        }
                                                                    }}
                                                                    style={{
                                                                        backgroundColor: e.paid == true ? "#E1ECF4" : e.picked == true ? "#fbf1e3" : Colors.light, height: 60, width: 60,
                                                                        justifyContent: "center", alignItems: "center",
                                                                        margin: 15, borderRadius: 7
                                                                    }}><Text style={{ fontWeight: 900, color: Colors.dark }} >{e.name}</Text></Pressable>
                                                            )
                                                        })
                                                    }
                                                </View>
                                            </View>

                                        </>

                                }

                                <View style={{ display: "flex", flexDirection: "row" }} >
                                    <Text style={{
                                        marginTop: 10, marginBottom: -7, color: Colors.dark,
                                        textAlign: "left", marginLeft: 15
                                    }}>
                                        Dues : ₦50
                                    </Text>
                                    <Text style={{
                                        marginTop: 10, marginBottom: -7, color: Colors.dark,
                                        textAlign: "left", marginLeft: 20
                                    }}>
                                        Registration : ₦100
                                    </Text>
                                </View>

                            </>
                        }
                    </View>

                    {currentFellowship != null &&
                        <PrimaryButton style={{ width: "100%", textTransform: 'uppercase', marginTop: 30 }} callBack={() => { ProceedToPay() }} title={`Make payment`} />}

                </View>
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
        disp_user: (payload) => dispatch(user_state(payload)),
        disp_surprise: (payload) => dispatch(surprise_state(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Add_details);



const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 90,
        // backgroundColor: "red"
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
        // backgroundColor:"red", 
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

