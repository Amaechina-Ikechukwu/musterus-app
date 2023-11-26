import {
    StyleSheet,
    Dimensions,
    StatusBar,
    View,
    Image,
    Text
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Divider, Avatar } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import {
    surprise_state, user_state
} from "../../redux";
import { useNavigation } from '@react-navigation/native';
import { AppStatusBar } from '../../components/status-bar';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { BackIcon } from '../../../assets/icons/auth-icons';
import { LabelTexts } from '../components/texts';
import { Color } from '../../components/theme';
import { OutlinedInput } from '../../components/inputs';
import { FeedHeader } from '../components/feed-header';
import { Style } from '../../../assets/styles';
import { NameDisplayCard } from '../../components/name-display-card';
import { Header } from '../../messaging/components/header';
import { MusterCards, MusterCards2 } from '../components/ustercards';


const { height, width } = Dimensions.get('window');
const Colors = Color()
let ImgUrl = "https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/311838830_3341516792834673_1624830650213567335_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG2I4ezOTyJWd1Q6SaGyWtTt0TqlRk4Rf63ROqVGThF_hMhAEUxrZPmz-YfwDVqi9XSOwJeMBUHJjjW2mK1cXwG&_nc_ohc=tMcuz-iePZwAX-IlhsR&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AfAvDZURMf1osfZvCjNmFOAq3WF5xqNQrwbghpiwEBotoQ&oe=64D287F2"
function MuterCards({ route, appState, disp_surprise }) {
    const User = appState.User;
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState(null);
    const [data, setData] = useState("")
    useEffect(() => {
        console.log("Account page")

    }, [])






    return (
        <>
            <Header navigation={navigation} />

            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Colors.background,
                paddingTop: 80,
                // padding: 20
            }}>
                <AppStatusBar StatusBar={StatusBar} useState={useState} />

                <ScrollView>
                    <View style={{
                        flexDirection: "row",
                        padding: 10,
                        marginTop: 20
                        // backgroundColor: "red"
                    }}>
                        <View style={{
                            // flex: 1,
                            flexDirection: "row",
                            // backgroundColor: "blue"
                        }}>
                            <TouchableOpacity onPress={() => {
                                navigation.pop()
                            }} style={{
                                flex: 1,
                                flexDirection: "row",
                                // backgroundColor: "blue"
                            }}>
                                <BackIcon />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            // flex: 3,
                            flexDirection: "row",
                            // backgroundColor: "blue"
                        }}>
                            <LabelTexts style={{ marginLeft: 25 }} text="Muster Cards" />
                        </View>
                    </View>

                    <View style={{

                    }}>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            // backgroundColor:"red",
                            padding: 15

                        }} >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("SelectCard")
                                }} >
                                <Image
                                    style={{
                                        width: 150,
                                        height: 200,
                                        borderRadius: 20
                                        // aspectRatio:1
                                    }}
                                    source={require("../../../assets/card1.png")}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("SelectCard")
                                }} >
                                <Image
                                    style={{
                                        width: 150,
                                        height: 200,
                                        borderRadius: 20
                                        // aspectRatio:1
                                    }}
                                    source={require("../../../assets/card2.png")}
                                />
                            </TouchableOpacity>
                        </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(MuterCards);




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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
});