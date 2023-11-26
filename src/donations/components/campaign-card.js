import React from 'react';
import { View, StyleSheet, Text, Pressable, ImageBackground, Image } from 'react-native';
import { Color } from '../../components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBandage, faCheckCircle, faCheckDouble, faDonate, faGroupArrowsRotate, faIdBadge, faRotate } from '@fortawesome/free-solid-svg-icons';
import { Style } from '../../../assets/styles';
import { Avatar, Divider } from 'react-native-paper';
import { getTotalAmount } from './view-campaign-card';
import { NumberWithCommas } from '../../utilities';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Colors = Color()
export function DonationCard({
    Navigation,
    data,
    setModalVisible,
    setdateToView,
    Alert,
    AlertCallback,
    user

}) {
    return (
        <Pressable

            style={[styles.container, {

            }]}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                // marginTop: 10
            }} >
                <View style={{
                    // flex: 0.3,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                    // backgroundColor:"green"
                }} >

                    <FontAwesomeIcon style={{
                        flex: 1,
                        color: Colors.primary,
                        // marginLeft: 10,
                        marginTop: 2,

                    }} size={15} icon={faCheckDouble} />

                </View>

                <View style={{ flex: 5 }} >




                    <Text style={[Style.boldText, { marginTop: 9,color:Colors.dark }]}>
                        {data && data.meta.title}
                    </Text>
                    <Pressable
                        onPress={() => {
                            // Navigation.navigate("view-user")
                            if (setdateToView) {
                                setdateToView({
                                    type: "VIEW MORE",
                                    data: data
                                })
                                setModalVisible(true)
                            }

                            // When user wants to invite other to support a campaign
                            if (Alert) {
                                Alert.alert("Proceed", `${user} will be invited to support ${data.meta.title}`, [
                                    {
                                        text: "Cancel"
                                    },
                                    {
                                        text: "Invite", onPress: () => {
                                            AlertCallback()
                                        }
                                    }
                                ])
                            }
                        }}
                        style={[Style.Text, { marginTop: 5, }]}>
                        {data && data.meta.description.length > 100 ? <>
                            <Text style={{color:Colors.dark}} > {data && data.meta.description.slice(0, 120) + "...."} <Text style={[Style.Text]} >See more</Text></Text>

                        </> : data && data.meta.description}
                    </Pressable>

                    {
                        data && !data.meta.img &&
                        <Pressable
                            onPress={() => {
                                // Navigation.navigate("view-user")
                                if (setdateToView) {
                                    setdateToView({
                                        type: "IMAGE",
                                        data: data
                                    })
                                    setModalVisible(true)
                                }

                                // When user wants to invite other to support a campaign
                                if (Alert) {
                                    Alert.alert("Proceed", `${user} will be invited to support ${data.meta.title}`, [
                                        {
                                            text: "Cancel"
                                        },
                                        {
                                            text: "Invite", onPress: () => {
                                                AlertCallback()
                                            }
                                        }
                                    ])
                                }

                            }}
                            style={{
                                width: '100%',
                                height: 200,
                                // backgroundColor: "green"
                            }}>
                            <Image
                                style={[styles.imageBackground, {
                                    width: "100%", height: "100%",
                                    marginTop: 10,
                                    borderRadius: 10,
                                }]}
                                // source={require('../../assets/user.png')}
                                source={require('../../../assets/img2.jpg')}
                                resizeMode={'cover'} />
                        </Pressable>
                    }
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        marginVertical: 10
                    }} >
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                        }} >
                            <Text style={[Style.LabelText, { marginTop: 2 }]}>
                                {data && data.meta.poster}
                            </Text>
                            <FontAwesomeIcon style={{
                                flex: 1,
                                color: Colors.lightgrey,
                                marginLeft: 5,
                                marginTop: 6,

                            }} size={10} icon={faCheckCircle} />
                        </View>



                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            // backgroundColor:"red",
                            flex: 1
                        }} >
                            <Text style={[Style.LabelText, { marginLeft: 10, marginTop: 5 }]}>
                                ₦{NumberWithCommas(getTotalAmount(data.donations))}
                            </Text>
                            <FontAwesomeIcon style={{
                                flex: 1,
                                color: Colors.lightgrey,
                                marginLeft: 3,
                                marginTop: 7

                            }} size={13} icon={faDonate} />
                        </View>

                    </View>


                    <Divider style={{ marginBottom: -15 }} />
                </View>


            </View>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fffdfd",
        // backgroundColor: "red",
        // borderRadius: 10,
        elevation: 1,
        padding: 16,
        width: "100%",
        // marginBottom:15
    },

    imageBackground: {
        flex: 1,
        resizeMode: "stretch",
        // backgroundColor: "red"
    },
});
