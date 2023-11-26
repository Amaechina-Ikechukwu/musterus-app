import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library
import { CommentIcon, LoveIcon, ShareIcon, ThreeDots } from './icons';
import { Style } from '../../../assets/styles';
import { Color } from '../../components/theme';
import { NameDisplayCard } from '../../components/name-display-card';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StaticImage } from '../../utilities';

const Colors = Color()
export function FeedCard({
    image,
    navigation
}) {
    return (
        <View style={styles.container}>
            <NameDisplayCard data dot={true} />

            {image &&
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.tweetImage}
                       src={StaticImage}
                    />
                </View>
            }
            <View style={styles.iconsContainer}>
                <View style={{ flexDirection: "row", marginRight: 10 }}>
                    <LoveIcon />
                    <Text style={[Style.boldText2, { marginTop: 6, color: "#041616" }]} >54</Text>
                </View>
                <Pressable
                onPress={()=>{
                    navigation.navigate("Comment")
                }}
                 style={{ flexDirection: "row", marginRight: 10 }}>
                    <CommentIcon />
                    <Text style={[Style.boldText2, { marginTop: 6, color: "#041616" }]} >54</Text>
                </Pressable>
                <View style={{ flexDirection: "row" }}>
                    <ShareIcon />
                </View>
            </View>
            <Text style={[styles.content, { fontFamily: "Montserrat" }]}>
                Sleep in Sunday is the best day of the week! #sunspot
            </Text>
            <Text style={[{ fontFamily: "Montserrat", color: Colors.grey }]}>
                11:18 AM
            </Text>
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        // borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 0.2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#041616"
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
        borderRadius: 10,
        marginTop: 16,
        resizeMode: 'cover',
        aspectRatio:1
    },
    usernameTag: {
        fontSize: 14,
        color: 'gray',
    },
    iconsContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: 10,
    },
});