import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../../components/theme';
import { ThreeDots, UnlikeIcon } from './icons';
import { Style } from '../../../assets/styles';


const Colors = Color()
let ImgUrl = 'https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/324293849_3370804233196602_134225334160101172_n.jpg?_nc_cat=105&cb=99be929b-59f725be&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeHadWpDKaZmTwsY24VIN19Srl1RPqtckHSuXVE-q1yQdH9o_yt1WuoQps5qnC42voWOdi1D4OlIYaq39e7I1Ht6&_nc_ohc=K3fXPsmAaa0AX-QqmYs&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&oh=00_AfBawaPypJwhLdAEc4K91wS6y2OfCsPbIDv4rwW0QBKSFw&oe=64D92A6E'
export function CommentsComponent({
    dot, muster, tag
}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={[styles.headerInfo,
                {
                    flexDirection: "row",
                    width: "100%",
                    // backgroundColor: "green"
                }]}>
                    <View style={{
                        flex: 1,
                        // backgroundColor: "green", 
                    }}
                    >
                        <View style={{
                            flexDirection: "row",
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 10
                        }} >

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                {/* <Image
                                    style={styles.tweetImage}
                                    src={"https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/324293849_3370804233196602_134225334160101172_n.jpg?_nc_cat=105&cb=99be929b-59f725be&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeHadWpDKaZmTwsY24VIN19Srl1RPqtckHSuXVE-q1yQdH9o_yt1WuoQps5qnC42voWOdi1D4OlIYaq39e7I1Ht6&_nc_ohc=K3fXPsmAaa0AX-QqmYs&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&oh=00_AfBawaPypJwhLdAEc4K91wS6y2OfCsPbIDv4rwW0QBKSFw&oe=64D92A6E"}
                                /> */}
                                <Text style={styles.username}>
                                    John Doe
                                </Text>
                                <Text style={[styles.usernameTag]}>
                                    {tag ? tag : "@spicyyunaroll"}
                                </Text>
                            </View>

                            <TouchableOpacity style={{
                                marginRight: 10
                            }} >
                                <ThreeDots />
                            </TouchableOpacity>
                        </View>


                        <Text style={[Style.Text, {
                            paddingLeft: 40
                        }]}>
                            I’m more exciteds about how pretty I look plus my hair being my brand logo.
                        </Text>
                        <View style={{
                            marginLeft: 40,
                            // backgroundColor: "red",
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 6
                        }}>
                            <UnlikeIcon />
                            <Text style={{ color: Colors.dark }}>
                                54
                            </Text>
                            <Text style={[styles.usernameTag]}>
                                10 min ago
                            </Text>
                        </View>
                    </View>




                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
        // backgroundColor: "red"
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#041616",
        paddingRight: 10
    },
    content: {
        fontSize: 16,
        marginVertical: 10,
        color: "#041616"
    },
    imageContainer: {
        overflow: 'hidden',
        borderRadius: 5,
    },
    tweetImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 16,
        resizeMode: 'cover',
    },
    usernameTag: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 10
    },
    iconsContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: 10,
    },
});