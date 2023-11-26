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
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../../components/theme';
import { connect } from "react-redux";
import {
    surprise_state, user_state
} from "../../redux";
import { useNavigation } from '@react-navigation/native';
import { HeaderComponent } from '../../components/header';
import { AppStatusBar } from '../../components/status-bar';
import { LabelTexts } from '../../events/components/texts';
import { SearchIcon } from '../../events/components/icons';
import { PrimaryButton } from '../../components/buttons/primary';
import { NameDisplayCard } from '../../components/name-display-card';
import { BottomTab } from '../../events/components/bottomTab';
import { Header } from '../../messaging/components/header';

const { height, width } = Dimensions.get('window');
const Colors = Color()
let ImgUrl = "https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/311838830_3341516792834673_1624830650213567335_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG2I4ezOTyJWd1Q6SaGyWtTt0TqlRk4Rf63ROqVGThF_hMhAEUxrZPmz-YfwDVqi9XSOwJeMBUHJjjW2mK1cXwG&_nc_ohc=tMcuz-iePZwAX-IlhsR&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AfAvDZURMf1osfZvCjNmFOAq3WF5xqNQrwbghpiwEBotoQ&oe=64D287F2"
function Profile({ route, appState, disp_surprise }) {
    const User = appState.User;
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState(null);
    const [data, setData] = useState("")
    const [component, setcomponent] = useState("SUGGESTION")
    useEffect(() => {
        console.log("Account page")

    }, [])






    return (
        <>
            <BottomTab page="MusterPoint" navigation={navigation} />
            <Header />
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Colors.background,
                paddingTop: 80,
                paddingBottom: 80,
                // padding: 20
            }}>
                <AppStatusBar StatusBar={StatusBar} useState={useState} />

                <ScrollView>
                    <View style={{
                        flexDirection: "row",
                        padding: 10,
                        // backgroundColor: "red"
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            // backgroundColor: "blue"
                        }}>
                            <LabelTexts style={{ marginLeft: 15 }} text="Muster Point" />
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            // backgroundColor: "blue",
                            justifyContent: "flex-end"
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Search")
                                }}
                                style={{
                                    // backgroundColor: "green", 
                                    flex: 1,
                                    width: 100,
                                    justifyContent: "center",
                                    alignItems: "flex-end",
                                    paddingRight: 15
                                }}>
                                <SearchIcon />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        // backgroundColor: "red",
                        marginTop: 10,
                        // alignItems: "center",
                        padding: 15
                    }}>

                        <View style={{
                            flexDirection: "row"
                        }} >
                            <PrimaryButton
                                callBack={() => {
                                    setcomponent("SUGGESTION")
                                }}
                                title="Suggestions" style={{
                                    height: 36,
                                    justifyContent: "center",
                                    width: 130, marginRight: 10
                                }}
                                noBG={component == "FRIENDS" ? true : false}
                            />

                            <PrimaryButton
                                callBack={() => {
                                    setcomponent("FRIENDS")
                                }}
                                noBG={component == "SUGGESTION" ? true : false}
                                title="Your Friends"
                                style={{
                                    height: 36,
                                    justifyContent: "center",
                                    width: 130,
                                }} />
                        </View>

                        {component == "FRIENDS" ? <>
                            <View>
                                {
                                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                                        .map((e, index) => {
                                            return <View key={index} style={{
                                                marginTop: 25
                                            }}>
                                                <NameDisplayCard  navigation={navigation}  />
                                            </View>
                                        })
                                }
                            </View>
                        </> : <>
                            <View>
                                {
                                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                                        .map((e, index) => {
                                            return <View key={index} style={{
                                                marginTop: 25
                                            }}>
                                                <NameDisplayCard  navigation={navigation}  muster />
                                            </View>
                                        })
                                }
                            </View>
                        </>}


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


export default connect(mapStateToProps, mapDispatchToProps)(Profile);




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