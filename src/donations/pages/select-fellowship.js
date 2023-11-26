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
        console.log("Sellect")
        // GetUser()
        // if (route.params && route.params != undefined) {
        //     console.log(route.params)
        //     let routeParams = route.params.data
        // } else {
        //     console.log("No params")
        // }
    }, [setUserState])


    const [PageState, setPageState] = useState("")

    const Fellowships = [
        { label: '144 Virgins Body', value: '144 Virgins Body' },
        { label: 'Patriarch Christ Shepherds (PCS)', value: 'Patriarch Christ Shepherds (PCS)' },
        { label: 'Matriarch Christ Shepherds (MCS)', value: 'Matriarch Christ Shepherds (MCS)' },
        { label: 'Archbishops', value: 'Archbishops' },
        { label: 'Eminences', value: 'Eminences' },
        { label: 'Christ Ambassadors', value: 'Christ Ambassadors' },
        { label: 'Bishops', value: 'Bishops' },
        { label: 'Divine Vanguards', value: 'Divine Vanguards' },
        { label: 'Blessed Mothers', value: 'Blessed Mothers' },
        { label: 'Senior Christ Servants (SCS)', value: 'Senior Christ Servants (SCS)' },
        { label: 'True Christ Witness (TCW)', value: 'True Christ Witness (TCW)' },
        { label: 'Christ Natural Preachers (CNP)', value: 'Christ Natural Preachers (CNP)' },
        { label: 'Christ Practical Students (CPS)', value: 'Christ Practical Students (CPS)' },
        { label: 'All Ordained Ones', value: 'All Ordained Ones' },
        { label: 'Christ Universal Elders Fellowship', value: 'Christ Universal Elders Fellowship' },
        { label: 'Christ Universal Spirited Children\'s Fellowship', value: 'Christ Universal Spirited Children\'s Fellowship' },
        { label: 'Christ Universal Men\'s Fellowship (CUMF)', value: 'Christ Universal Men\'s Fellowship (CUMF)' },
        { label: 'Christ Universal Women\'s Fellowship (CUWF)', value: 'Christ Universal Women\'s Fellowship (CUWF)' },
        { label: 'Christ Universal General Fellowship', value: 'Christ Universal General Fellowship' },
        { label: 'Christ Natural Choristers Fellowship (CNCF)', value: 'Christ Natural Choristers Fellowship (CNCF)' },
        { label: 'Christ Universal Children\'s Fellowship (CUCF)', value: 'Christ Universal Children\'s Fellowship (CUCF)' },
        { label: 'Christ Universal Education Fellowship', value: 'Christ Universal Education Fellowship' },
        { label: 'Christ Universal Labour Fellowship', value: 'Christ Universal Labour Fellowship' },
        { label: 'Christ Universal Youth Fellowship (CUYF)', value: 'Christ Universal Youth Fellowship (CUYF)' },
        { label: 'Association of Brotherhood Academic Scholars (ABAS)', value: 'Association of Brotherhood Academic Scholars (ABAS)' },
        { label: 'Christ Universal Mercy Fellowship', value: 'Christ Universal Mercy Fellowship' },
        { label: 'Christ Universal Missionary Crusade Fellowship', value: 'Christ Universal Missionary Crusade Fellowship' },
        { label: 'Blessed Brothers and Sisters Family Fellowship (BBSFF)', value: 'Blessed Brothers and Sisters Family Fellowship (BBSFF)' },
        { label: 'Christ Universal Welfare Fellowship', value: 'Christ Universal Welfare Fellowship' },
        { label: 'Christ Universal Vegetarians Fellowship', value: 'Christ Universal Vegetarians Fellowship' },
        { label: 'Christ Universal Lawyers Fellowship', value: 'Christ Universal Lawyers Fellowship' },
        { label: 'New World Fellowship', value: 'New World Fellowship' },
        { label: 'Christ Universal Traditional Rulers' }
    ];


    return (
        <>
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
                        // marginTop: 10,
                        // padding: 7
                        // alignItems: "center"

                    }} >



                        {/* <Divider style={{ marginBottom: 10, }} /> */}

                        {
                            Fellowships.map((e, key) => {
                                return <Pressable
                                    key={key}
                                    onPress={async () => {
                                        navigation.pop(1)
                                        await AsyncStorage.setItem("FELLOWSHIP", JSON.stringify(e))
                                    }}
                                    style={{
                                        // // display: "flex",
                                        padding: 12,
                                        borderRadius: 5,
                                        // marginBottom: 10,
                                        // // flex:1,
                                        // borderColor: "red",
                                        // // borderWidth: 2,

                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        // marginTop: 3,
                                        zIndex: 2000,
                                        width: "100%",
                                        backgroundColor: Colors.light


                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.dark,
                                            fontSize: 15,
                                            fontWeight: 500
                                        }}>
                                        {e.label}
                                    </Text>
                                    <FontAwesomeIcon style={{
                                        flex: 1,
                                        color: Colors.lightgrey,
                                    }} size={20} icon={faCheckSquare} />
                                </Pressable>
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