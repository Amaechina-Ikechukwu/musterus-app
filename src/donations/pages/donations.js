import {
    StyleSheet,
    View,
    Text,
    Pressable, Image, Dimensions, Alert, ActivityIndicator,
    Modal
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
import { faCalendar, faCheckCircle, faCheckSquare, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../../components/icons';
import { PrimaryButton } from '../../components/buttons/primary';
import { Color } from '../../components/theme';
import { CustomLogin, SaveMetadata, fetchMetadata, localstorageSaveUserMedata, signinService, signupService } from '../../controllers/auth/authController';
import { Loader } from '../../components/loader';
import { connect } from 'react-redux';
import { surprise_state, user_state } from '../../redux';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CampaignCard, DonationCard } from '../components/campaign-card';
import { GetApp_Campaigns } from '../controllers/campaign-contrller';
import { ViewCampaignCard } from '../components/view-campaign-card';
import CustomBottomDrawer from '../../components/bottomDrawer';
import { AddUser_meta } from '../../user/models/user-model';
// import { monthNames } from '../../utilities';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function Donations({ navigation, disp_user, appState, disp_surprise, route }) {
    const [text, setText] = useState('');
    const User = appState.User;
    const [gender, setGender] = useState('');
    const { height } = Dimensions.get('window');
    const handleTextChange = useCallback((value) => {
        setText(value);
    }, [setText]);

    const [dataToView, setdateToView] = useState({
        type: "",
        data: {}
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [amount, setamount] = useState("")
    useEffect(() => {
        function AllowFinanceFunction() {
            setLoading(true)
            let New_meta = {
                ...User.meta,
                finance: [],
            }
            const payload = {
                data: New_meta,
                user: User.phone
            }
            disp_user({ ...User, meta: New_meta })
            AddUser_meta(payload)
                .then(res => {
                    if (res.error == null) {
                        disp_user({ ...User, meta: New_meta })
                    }
                    setLoading(false)
                })
        }


        const unsubscribe = navigation.addListener('focus', async () => {
            GetApp_Campaigns({
                setLoading,
                setData
            })

            if (!User.meta.finance) {
                AllowFinanceFunction()
            }
        });

        return unsubscribe;

    }, [navigation])

    return (

        <>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                // marginTop: 20,
                backgroundColor: Colors.white,
                // backgroundColor: "red",
                marginBottom: 5,
                position: 'absolute',
                // top: 0,
                // right: 19,
                zIndex: 2000,
                width: "100%",
                height: 50,
                paddingBottom: 10,
                paddingTop: 10,
                display: "none"
            }} >
                <Pressable
                    onPress={() => {
                        navigation.navigate("Payments")
                    }} style={{
                        borderBottomWidth: 0, borderBottomColor: Colors.lightgrey,
                        //  backgroundColor:Colors.light,
                        padding: 5,
                        borderRadius: 8,
                        flex: 1, alignItems: "center"
                    }} >
                    <Text style={{
                        fontSize: 13, color: Colors.dark, flex: 1, fontWeight: 900
                    }} > Dues / Reg </Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        navigation.navigate("pay-tithe")
                    }}
                    style={{
                        borderBottomWidth: 0, borderBottomColor: Colors.lightgrey,
                        // backgroundColor: "red",
                        padding: 5,
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
                    }} style={{
                        borderBottomWidth: 0, borderBottomColor: Colors.light,
                        backgroundColor: Colors.primary,
                        flex: 1, alignItems: "center", borderRadius: 8,
                        paddingTop: 8, marginRight: 10
                    }} >
                    <Text style={{
                        fontSize: 13, color: Colors.light, flex: 1, fontWeight: 900
                    }} >Donations </Text>
                </Pressable>
            </View >
            <>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        {
                            loading == true &&
                            <>
                                <View style={{
                                    justifyContent: "center",
                                    flex: 1
                                }} >
                                    <ActivityIndicator />
                                </View>
                            </>
                        }
                        {
                            data && data.map((e, index) => {
                                return (
                                    <DonationCard
                                        data={e}
                                        navigation={navigation}
                                        key={index}
                                        setdateToView={setdateToView}
                                        setModalVisible={setModalVisible}
                                    />
                                )
                            })
                        }
                    </ScrollView>
                </SafeAreaView>

                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            // Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>

                        <View style={styles.centeredView}>
                            {dataToView &&
                                dataToView.type != "IMAGE" ?
                                <ViewCampaignCard
                                    setModalVisible={setModalVisible}
                                    setLoading={setLoading}
                                    data={dataToView.data}
                                    User={User}
                                    loading={loading}
                                    amount={amount}
                                    setamount={setamount} 
                                    setData={setData}
                                />
                                :
                                <Image
                                    style={[styles.imageBackground, {
                                        width: "95%", height: "60%",
                                        // marginTop: 50,
                                        borderRadius: 4,
                                        marginLeft: "2.5%",
                                        position: "relative",
                                        top: "10%"
                                    }]}
                                    // source={require('../../assets/user.png')}
                                    // source={require('../../../assets/img2.jpg')}
                                    // source={require('@expo/snack-static/react-native-logo.png')}
                                    source={require('../../../assets/img2.jpg')}
                                    // source={`https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/${dataToView.data && dataToView.data.img}`}
                                    // src={`https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/${dataToView.data && dataToView.data.img}`}
                                    resizeMode={'cover'} />
                            }

                        </View>
                    </Modal>
                </View>
            </>

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


export default connect(mapStateToProps, mapDispatchToProps)(Donations);



const styles = StyleSheet.create({


    centeredView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: "red",
        // padding: 10
        // marginTop: 22,
    },
});

