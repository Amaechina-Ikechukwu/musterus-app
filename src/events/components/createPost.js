import { View, Text, StyleSheet, Image } from "react-native";
import { Color } from "../../components/theme";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { CreateFeedHeader } from "./createpost-header";
import { Divider } from 'react-native-paper';
import { AddPhoto, DividerIcon } from "./icons";
import { NameDisplayCard } from "../../components/name-display-card";
import { BackIcon } from "../../../assets/icons/auth-icons";
import { LabelTexts } from "./texts";
import { FlatInput, OutlinedInput } from "../../components/inputs";
import { PrimaryButton } from "../../components/buttons/primary";
import { UpcomingBirthdays } from "./upcoming-birthdays";
import { SuggestedImages } from "./suggested-images";

const Colors = Color()
let ImgUrl = 'https://scontent.flos5-1.fna.fbcdn.net/v/t39.30808-6/365829873_1016100516058333_6015341126608603872_n.jpg?stp=dst-jpg_p417x417&_nc_cat=101&cb=99be929b-59f725be&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFhta-ZpH4vs3ZRXKyDA4fLCNFFD1WaOycI0UUPVZo7J9tIwwcQ-ZXyRZReZhgTTlHKX8ZgAXopa_HMLIe42MaA&_nc_ohc=-Oqlq4aOC9cAX_W1cK-&_nc_zt=23&_nc_ht=scontent.flos5-1.fna&oh=00_AfDuP-vuOtplNOqoz7Rt9cKXJ4Ybry4ZdvuYcLYupdutkg&oe=64D44A4A'
const IMAGE_WIDTH = "100%";
const IMAGE_HEIGHT = 380;

export function CreatePostModal({
    data, setData, showCreatePost,
    pickImage, setpickImage
}) {
    return (<>
        <View style={{
            display: "flex",
            // flexDirection: "row",
            // justifyContent: "space-around",
            backgroundColor: Colors.background,
            // marginLeft: "5%",
            position: 'absolute',
            zIndex: 2000,
            width: "100%",
            height: "100%",
            elevation: 20
            // paddingBottom: 22
        }} >
            <CreateFeedHeader />


            <ScrollView>
                <View style={{
                    // margin: 15,
                }} >
                    <View style={{
                        padding: 15,
                        flexDirection: "row"
                    }} >
                        <TouchableOpacity onPress={() => {
                            showCreatePost(false)
                        }} >
                            <BackIcon />
                        </TouchableOpacity>
                        <LabelTexts text="Create a post" style={{ marginLeft: 20 }} />
                    </View>
                    <View style={{
                        padding: 5
                    }} >
                        <DividerIcon />

                    </View>
                    <View style={{
                        padding: 15
                    }} >
                        <NameDisplayCard />
                    </View>

                    {/* post input */}
                    {/* {data.length < 1 && <LabelTexts text="Say something about ths photo..." style={{ marginLeft: 20, color: "gray" }} />} */}
                    <FlatInput
                        data={data}
                        setData={setData}
                        placeholder="Say something about ths photo..."
                    />
                </View>

                {pickImage == true &&
                    < View style={styles.imageWrapper}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: ImgUrl
                                }}
                            />
                            <View style={styles.textWrapper}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setpickImage(false)
                                    }}
                                    style={{
                                        // backgroundColor: "red",
                                        width: 40,
                                        height: 40,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }} >
                                    <Text style={[styles.centerText]}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }



                {/* <View style={{ flexDirection: 'row',}}>
                    
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{}}>
                            {Array.from({ length: 10 }, (_, index) => (
                                <AddPhoto />
                            ))}
                        </View>
                    </ScrollView>
                </View> */}

            </ScrollView >

            <SuggestedImages setpickImage={setpickImage} data={data} />

            <View>
                <PrimaryButton
                    // loading={loading}
                    style={{
                        width: "90%",
                        marginLeft: "5%",
                        textTransform: 'uppercase',
                        marginTop: 20,
                        marginBottom: 40,
                        backgroundColor: data.length > 500 ? Colors.inactiveButton
                            : data.length < 1 ? Colors.inactiveButton : pickImage == true ? Colors.primary : Colors.inactiveButton,
                    }} callBack={() => {
                        // navigation.replace('Dashboard', { screen: 'FEEDS' });
                    }} title={`Post `} />

            </View>


        </View >
    </>)
}

const styles = StyleSheet.create({

    imageWrapper: {
        // width: IMAGE_WIDTH,
        // height: IMAGE_HEIGHT,
        // marginHorizontal: 25,
        marginTop: 20
    },
    imageContainer: {
        // flex: 1,
        alignItems: 'center',
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        resizeMode: 'cover',
        // borderRadius: 13
    },

    textWrapper: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'flex-end',
        justifyContent: "flex-start",
        flex: 1,
        // backgroundColor: Colors.grey,
        // opacity: 0.8,
        height: "100%",
        bottom: 0,
        width: "100%",
        padding: 5
        // borderRadius: 13, 
    },
    centerText: {
        color: 'white',
        fontSize: 13,
        fontFamily: "Montserrat",
        fontWeight: "bold",
        zIndex: 1000
    },
});