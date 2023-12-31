import {
    StyleSheet,
    View,
    Text,
    Pressable, Alert,
    Image, Dimensions, ImageBackground,
} from 'react-native';
import { Divider, Avatar } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import Header from '../../components/header2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faAngleUp, faAngleLeft, faAngleRight, faBasketShopping, faCheck, faCheckDouble, faGifts, faLocationDot, faTree, faTreeCity, faTvAlt, faVideo, faArrowRight, faArrowLeft, faArrowUp, faArrowDown, faUser, faCheckSquare, faUserAlt, faGlobeAfrica, faPhoneAlt, faMessage, faEnvelope, faDotCircle, faBriefcase, faPeopleArrows, faMoneyBill, faQrcode }
    from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAuth } from '../../controllers/auth/authController';
import { Color } from '../../components/theme';
import { Loader } from '../../components/loader';
import { BackIcon, CartIcon, HomeIcon, OpenDrawer } from '../../components/icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { connect } from "react-redux";
import {
    surprise_state
} from "../../redux";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import { NoItems } from '../../utilities/404';
import { PrimaryButton, SecondaryButton } from '../../components/buttons/primary';
import { Details } from '../compnents/details-list';
import { Certificates } from '../../components/certification/cert-list';
import { HistoryCard } from '../components/history-cards';
import FloatingButton from '../../components/buttons/FloatingBtn';


const { height, width } = Dimensions.get('window');
const Colors = Color()

function FinanceHistory({ route, appState, disp_surprise }) {
    const [userState, setUserState] = useState()
    const User = appState.User;
    const navigation = useNavigation();
    const GetUser = () => {
        if (User == undefined) {
            isAuth().then(res => {
                console.log(res)
                if (res == false) return navigation.pop()
                setUserState(res)
            })
        } else {
            setUserState(User)
        }
    }
    const AllSurprises = appState.SurpriseState;
    useEffect(() => {
        // console.log(AllSurprises.length)
        // console.log("Account page")
        // GetUser()
        // if (route.params && route.params != undefined) {
        //     console.log(route.params)
        //     let routeParams = route.params.data
        // } else {
        //     console.log("No params")
        // }
        console.log("Finance history")
    }, [setUserState])




    return (
        <>
            {/* <FloatingButton title="Pay" onPress={() => {
                navigation.navigate("Payments")
            }} /> */}
            {/* <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                // marginTop: 10,
                backgroundColor: Colors.white,
                // backgroundColor: "red",
                marginBottom: 5,
                position: 'absolute',
                // top: 10,
                // right: 19,
                zIndex: 2000,
                width: "100%",
                height: 40,
                // paddingBottom:10
            }} >
                <View style={{
                    borderBottomWidth: 0, borderBottomColor: Colors.lightgrey,
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
            </View > */}
            <SafeAreaView>
                <ScrollView>

                    <View style={{
                        borderRadius: 7,
                        flexDirection: "column",
                        // backgroundColor:"red",
                        display: "flex",
                        flex: 1,
                        justifyContent: "space-between",
                        alignContent: "space-around",
                        marginTop: 20
                        // alignItems: "center"

                    }} >



                        {/* <Divider style={{ marginBottom: 30, }} /> */}

                        {
                            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((e, key) => {
                                return (
                                    <HistoryCard navigation={navigation} key={key} />
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </SafeAreaView >
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        disp_surprise: (payload) => dispatch(surprise_state(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(FinanceHistory);




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
        marginTop: -20
    },
});