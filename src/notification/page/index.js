import {
    StyleSheet,
    View,
    Text,
    StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { surprise_state, user_state } from '../../redux';
import { Divider, Avatar } from 'react-native-paper';
import { BottomTab } from '../../events/components/bottomTab';
import { Color } from '../../components/theme';
import { Header } from '../../messaging/components/header';
import { NameDisplayCard } from '../../components/name-display-card';
import { PeopleIcon } from '../../events/components/icons';
import { Style } from '../../../assets/styles';
import { BellIcon, FolowedIcon, Nodata } from '../components/icon';
import { LabelTexts } from '../../events/components/texts';


const Colors = Color()


function SignIn({ navigation, appState, }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {

    }, [])

    const STYLES = ['default', 'dark-content', 'light-content'];
    const TRANSITIONS = ['fade', 'slide', 'none'];
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
    const [statusBarTransition, setStatusBarTransition] = useState(
        TRANSITIONS[0],
    );


    const [modalVisible, setModalVisible] = useState(false);
    return (

        <>
            <BottomTab page="Notification" navigation={navigation} />
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor={Colors.light}
                    barStyle={statusBarStyle}
                    showHideTransition={statusBarTransition}
                    hidden={hidden}
                />

                {/* <View style={{
                    justifyContent: "center",
                    alignItems:"center",
                    flex:1
                }} >
                    <Nodata />
                    <LabelTexts style={{marginTop:10}} text="There’s no notification, come back later" />
                </View> */}


                <Header page="Notification" />
                <ScrollView >
                    <View style={{ width: "100%" }} >

                        <View style={{
                            marginBottom: 80,
                            marginTop: 80,
                            marginHorizontal: 15
                        }}>

                            <View style={{ marginTop: 20 }}>
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <FolowedIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > Segun followed you</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} muster />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <BellIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > Birthday Alert</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} tag="Today is princess  Dala’s birthday, wish her well" />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <BellIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > New Reels</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} tag="Princess Uploaded a new reels" />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <BellIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > New Post</Text>
                                </View>
                                <NameDisplayCard tag="Started following you " />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <FolowedIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > Segun followed you</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} tag="Started following you " muster />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <FolowedIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > Segun followed you</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} tag="Started following you " muster />
                            </View>


                            <View style={{ marginTop: 20 }}>
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <FolowedIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > Segun followed you</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} muster />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <BellIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > Birthday Alert</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} tag="Today is princess  Dala’s birthday, wish her well" />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <BellIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > New Reels</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} tag="Princess Uploaded a new reels" />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <BellIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > New Post</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} tag="Started following you " />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <FolowedIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > Segun followed you</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} tag="Started following you " muster />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <FolowedIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > Segun followed you</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} tag="Started following you " muster />
                            </View>


                            <View style={{ marginTop: 20 }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <FolowedIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > Segun followed you</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} muster />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <BellIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > Birthday Alert</Text>
                                </View>
                                <NameDisplayCard navigation={navigation} tag="Today is princess  Dala’s birthday, wish her well" />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <BellIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > New Reels</Text>
                                </View>
                                <NameDisplayCard tag="Princess Uploaded a new reels" />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <BellIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > New Post</Text>
                                </View>
                                <NameDisplayCard tag="Started following you " />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <FolowedIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > Segun followed you</Text>
                                </View>
                                <NameDisplayCard tag="Started following you " muster />
                            </View>

                            <View style={{
                                marginTop: 20
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 12
                                }}>
                                    <FolowedIcon color={Colors.primary} />
                                    <Text style={[Style.LabelText, { color: Colors.dark }]} > Segun followed you</Text>
                                </View>
                                <NameDisplayCard tag="Started following you " muster />
                            </View>


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
        backgroundColor: Colors.background,
        flex: 1
    }

});

