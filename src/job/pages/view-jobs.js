import {
    StyleSheet,
    View,
    Text,
    Pressable,
     Dimensions, Alert,
    StatusBar,
    Modal
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import { Divider} from 'react-native-paper'; 
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView  } from 'react-native-gesture-handler'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBriefcase} from '@fortawesome/free-solid-svg-icons'; 
import { PrimaryButton } from '../../components/buttons/primary';
import { Color } from '../../components/theme';  
import { connect } from 'react-redux';
import { Connect_user, user_state } from '../../redux'; 
import { Style } from '../../../assets/styles';
import { ApplyForJob } from '../models';
import { NumberWithCommas } from '../../utilities';
import { UserCard } from '../../bcs-connect/components/user-cards'; 

const Colors = Color()


function ViewJob({ navigation,  appState, route, disp_viewUser }) { 
    const [modalVisible, setModalVisible] = useState(false)
    const User = appState.User; 

    const [data, setData] = useState(); 
    const [loading, setLoading] = useState(false)
    const [HaveApplied, setHaveApplied] = useState(false)

    useEffect(() => { 
        if (route.params) { 
            setData(route.params.data) 
        } else {
            console.log("No data")
        }


        let Check = route.params.data.applications.filter(e => e.phone == User.phone)
        // console.log(Check)
        if (Check.length > 0) {
            setHaveApplied(true)
        } else {
            setHaveApplied(false)
        }


        // console.log(HaveApplied)
    }, [navigation])
 

    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['20%', '50%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    // renders
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
            />
        ),
        []
    );


    const STYLES = ['default', 'dark-content', 'light-content'];
    const TRANSITIONS = ['fade', 'slide', 'none'];


    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
    const [statusBarTransition, setStatusBarTransition] = useState(
        TRANSITIONS[0],
    );
 
    function proceedToApply() {
        setLoading(true)
        // const applicationData = {
        //     name: User.name,
        //     phone: User.phone,
        //     email: User.meta.email,
        //     gender: User.meta.gender,
        //     state: User.state,
        //     skills: User.skills,
        //     course: User.study
        // }
        data.applications.push(User)
        ApplyForJob({ job: data.id, application: data.applications }).then(res => {
            Alert.alert("Success", "Your application have been submitted successfully.",
                [
                    {
                        text: "Close",
                        onPress: () => { navigation.pop() }
                    }
                ]
            );
        }).catch(error => {
            alert("A network error occurred.")
            setLoading(false)
        })
        // navigation.pop()
    }

    return (

        <>

            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor={Colors.light}
                    barStyle={statusBarStyle}
                    showHideTransition={statusBarTransition}
                    hidden={hidden}
                />
                <ScrollView>
                    <View style={styles.content}>
                        <View
                            style={{
                                width: "100%"
                            }}
                        >
                            <View >
                                <View
                                    style={{
                                        // backgroundColor:"#E1ECF4",
                                        backgroundColor: Colors.light,
                                        padding: 18,
                                        // borderRadius: 10,
                                        // marginTop: 20,
                                        // marginBottom: 20,
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
                                        {data && data.meta.title}
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
                                            icon={faBriefcase} />
                                    </Pressable>
                                </View>


                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 30, padding: 5 }} >
                                    <Text style={{ color: Colors.grey, fontSize: 16 }}>
                                        Recruiting company -
                                    </Text>
                                    <Text style={[Style.boldText]}>{data && data.meta.company}</Text>

                                </View>


                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 30, padding: 5 }} >
                                    <Text style={{ color: Colors.grey, fontSize: 16 }}>
                                        Job type -
                                    </Text>
                                    <Text style={[Style.boldText]}>{data && data.meta.jobtype} </Text>

                                </View>

                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 30, padding: 5 }} >
                                    <Text style={{ color: Colors.grey, fontSize: 16 }}>
                                        Work-place type -
                                    </Text>
                                    <Text style={[Style.boldText]}>{data && data.meta.worktplaceype} </Text>

                                </View>

                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 30, padding: 5 }} >
                                    <Text style={{ color: Colors.grey, fontSize: 16 }}>
                                        Salary range -
                                    </Text>
                                    <Text style={[Style.boldText]}> ₦{data && NumberWithCommas(data.meta.salary)} </Text>

                                </View>

                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 30, padding: 5 }} >
                                    <Text style={{ color: Colors.grey, fontSize: 16, }}>
                                        Job location -
                                    </Text>
                                    <Text style={[Style.boldText]}> {data && data.meta.location} </Text>

                                </View>

                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 30, padding: 5 }} >
                                    <Text style={{ color: Colors.grey, fontSize: 16, }}>
                                        Application deadline -
                                    </Text>
                                    <Text style={[Style.boldText]}> {data && data.deadline}</Text>
                                </View>



                                <Text style={{ color: Colors.grey, fontSize: 16, marginTop: 30 }}>
                                    Job description
                                </Text>

                                <Text style={[Style.Text, { padding: 5 }]}>
                                    {data && data.meta.description}
                                </Text>
                            </View>


                        </View>

                        {
                            data && data.meta.poster_id == User.meta.email ?
                                <>
                                    {
                                        data && data.applications.length > 0 ?
                                            <>

                                                <View style={{ width: "100%", marginTop: 30 }}>
                                                    <View style={{
                                                        // justifyContent: "flex-start",
                                                        // alignItems: "flex-start",
                                                        marginVertical: 10,
                                                        marginHorizontal: 10
                                                        // alignContent:"flex-start"
                                                    }}>
                                                        <Text style={{
                                                            color: Colors.dark,
                                                        }} >
                                                            Application(s)
                                                        </Text>
                                                    </View>
                                                    {data && data.applications.map((e, index) => {
                                                        return (
                                                            <View style={{ width: "100%" }} key={index} >
                                                                <UserCard
                                                                    disp_viewUser={disp_viewUser}
                                                                    data={e}
                                                                    setModalVisible={setModalVisible}
                                                                    // Navigation={navigation}
                                                                    action={() => {
                                                                        navigation.navigate("Applicants")
                                                                    }}
                                                                />
                                                            </View>
                                                        )
                                                    })}

                                                </View>
                                            </> :
                                            <>
                                                <Divider />
                                                <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: 30, padding: 5 }} >
                                                    <Text style={{ color: Colors.grey, fontSize: 16, }}>
                                                        No application submitted yet
                                                    </Text>
                                                </View>
                                            </>
                                    }
                                </>
                                :
                                <>
                                    {HaveApplied == true ?
                                        <>
                                            <Divider />
                                            <View style={{ margin: 40 }} >
                                                <Text style={{ color: Colors.dark }} >
                                                    You already applied
                                                </Text>
                                            </View>
                                        </> :
                                        <>
                                            <PrimaryButton
                                                loading={loading}
                                                style={{
                                                    width: "100%", textTransform: 'uppercase', marginBottom: 10,
                                                    marginVertical: 30
                                                }}
                                                callBack={() => { handleSnapPress(1) }} title={`Proceed to apply`} />
                                        </>
                                    }
                                </>
                        }

                    </View>

                </ScrollView>
                <BottomSheet
                    enablePanDownToClose
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    onChange={handleSheetChanges}
                >

                    <View style={styles.content}>
                        <View style={{ width: "100%", justifyContent: "flex-start" }} >
                            <Text style={[Style.BoldText2, { marginLeft: 20, color: Colors.dark }]}>Note,</Text>
                            <Text style={{ marginLeft: 20, color: Colors.dark, marginTop: 20 }}>
                                Your basic information will be shared with the recruiter for further assessment.
                            </Text>

                            <Text style={{ marginLeft: 20, color: Colors.dark, marginTop: 20, marginRight: 10 }}>

                                If your profile is not up to date, kindly update your profile before you proceed
                            </Text>
                        </View>





                        {HaveApplied == true ?
                            <></> :
                            <>
                                <PrimaryButton style={{
                                    // width: "90%",
                                    // marginLeft: "5%",
                                    textTransform: 'uppercase', marginBottom: 30

                                }}
                                    loading={loading}
                                    callBack={() => {
                                        proceedToApply()
                                    }} title={`Send application`} />
                            </>}
                    </View>

                </BottomSheet>
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
        disp_viewUser: (payload) => dispatch(Connect_user(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewJob);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 200,
    },
    contentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },


    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 30,
        // backgroundColor: "red"
    },
    textInput: {
        alignSelf: "stretch",
        marginHorizontal: 12,
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "grey",
        color: "white",
        textAlign: "center",
    },

    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 10,
        // backgroundColor:"red", 
    },
});

