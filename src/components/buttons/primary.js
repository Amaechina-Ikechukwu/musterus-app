import React from "react"
import { Pressable, StyleSheet, View, Text, ActivityIndicator } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBars, faBasketShopping, faCalendar, faCheckDouble } from "@fortawesome/free-solid-svg-icons"
import IconBadge from 'react-native-icon-badge';
import { Color } from "../theme";
import { Style } from "../../../assets/styles";
import { CalenderIcon } from "../../../assets/icons/auth-icons";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const Colors = Color()
export function SecondaryButton({ title, callBack, style, titleColor, icon }) {
    const count = 2
    return (
        <>
            <Pressable
                android_ripple={{ color: "white" }}
                onPress={() => {
                    // if (navigate == true) {
                    //     route == "back" ? navigation.goBack() : navigation.navigate(route, { data })
                    // }
                    callBack()
                }}
                style={[{
                    // backgroundColor:Colors.lightgrey,
                    height: 46,
                    // width: "90%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // elevation: 2,
                    borderRadius: 9,
                    paddingHorizontal: 10,
                    // marginLeft:"5%"
                }, style && style]}>
                <Text style={[Style.Text, { textAlign: "center", color: !titleColor ? Colors.light : titleColor }]} >{title}</Text>
                {icon &&

                    <CalenderIcon />
                }
            </Pressable>
        </>
    )
}

export function PrimaryButton({ title, callBack, style, loading, noBG }) {
    const count = 2
    return (
        <>
            {loading && loading == true ? <ActivityIndicator style={{ marginVertical: 25 }} /> :
                <TouchableOpacity
                    android_ripple={{ color: "white" }}
                    onPress={() => {
                        // if (navigate == true) {
                        //     route == "back" ? navigation.goBack() : navigation.navigate(route, { data })
                        // }
                        callBack()
                    }}
                    style={[{
                        backgroundColor: noBG && noBG == true ? Colors.light : Colors.primary,
                        height: 53,
                        width: "90%",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        elevation: 2,
                        borderRadius: 20,
                        paddingHorizontal: 10,

                    }, style && style]}>
                    {/* <View style={[style && style]} >
                    </View> */}
                    <Text style={{ textAlign: "center", fontSize: 15, color: noBG && noBG == true ? Colors.primary : Colors.light }} >{title}</Text>
                    {/* <FontAwesomeIcon style={{
                    flex: 1,
                    color: Colors.light,
                }} size={25} icon={faHeart} /> */}
                </TouchableOpacity>
            }

        </>
    )
}

export function InactiveButton({ title, callBack, style, loading, textColor }) {
    const count = 2
    return (
        <>
            {loading && loading == true ? <ActivityIndicator style={{ marginVertical: 25 }} /> :
                <Pressable
                    android_ripple={{ color: "white" }}
                    onPress={() => {
                        // if (navigate == true) {
                        //     route == "back" ? navigation.goBack() : navigation.navigate(route, { data })
                        // }
                        callBack()
                    }}
                    style={[{
                        backgroundColor: Colors.background,
                        height: 53,
                        width: "90%",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        // elevation: 2,
                        borderRadius: 20,
                        paddingHorizontal: 10,

                    }, style && style]}>
                    <Text style={[Style.TextLink, { textAlign: "center", color: textColor && textColor }]} >{title}</Text>
                    {/* <FontAwesomeIcon style={{
                    flex: 1,
                    color: Colors.light,
                }} size={25} icon={faHeart} /> */}
                </Pressable>
            }

        </>
    )
}

export function CallbackBtn({ title, callback, data }) {
    const count = 2
    return (
        <>
            <Pressable
                android_ripple={{ color: "white" }}
                onPress={() => {
                    callback()
                }}
                // key={index}
                style={{
                    backgroundColor: Colors.primary,
                    height: 60,
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 2,
                    borderRadius: 9,
                    marginTop: 20,
                    marginBottom: 30,
                }}>
                <Text style={{ textAlign: "center", fontSize: 20, color: Colors.light }} >{title}</Text>
                {/* <FontAwesomeIcon style={{
                    flex: 1,
                    color: Colors.light,
                }} size={25} icon={faHeart} /> */}
            </Pressable>
        </>
    )
}

const style = StyleSheet.create({
    primary: {
        backgroundColor: "red"
    }
})

