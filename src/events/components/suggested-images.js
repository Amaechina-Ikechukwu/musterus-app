import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text } from 'react-native';
import { Style } from '../../../assets/styles';
import { Color } from '../../components/theme';
import { AddPhoto } from './icons';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
let ImgUrl = 'https://scontent.flos5-1.fna.fbcdn.net/v/t39.30808-6/365829873_1016100516058333_6015341126608603872_n.jpg?stp=dst-jpg_p417x417&_nc_cat=101&cb=99be929b-59f725be&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFhta-ZpH4vs3ZRXKyDA4fLCNFFD1WaOycI0UUPVZo7J9tIwwcQ-ZXyRZReZhgTTlHKX8ZgAXopa_HMLIe42MaA&_nc_ohc=-Oqlq4aOC9cAX_W1cK-&_nc_zt=23&_nc_ht=scontent.flos5-1.fna&oh=00_AfDuP-vuOtplNOqoz7Rt9cKXJ4Ybry4ZdvuYcLYupdutkg&oe=64D44A4A'
const IMAGE_WIDTH = 70;
const IMAGE_HEIGHT = 70;
const Colors = Color()
export function SuggestedImages({
    data, setpickImage
}) {
    return (
        <View style={styles.container}>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.imagesContainer}>
                    <View style={{
                        justifyContent: "center",
                        marginLeft: 20
                    }} >
                        <Text style={{
                            borderWidth: 1,
                            borderColor: data.length > 500 ? Colors.red : Colors.dark,
                            borderRadius: 100,
                            paddingHorizontal: 17,
                            paddingVertical: 10,
                            color: data.length > 500 ? Colors.red : Colors.dark,
                        }} >
                            {500 - data.length}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 10 }} >
                        <AddPhoto />
                    </View>
                    {Array.from({ length: 10 }, (_, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                setpickImage(true)
                            }}
                            key={index} style={styles.imageWrapper}>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: ImgUrl
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: 20,
        // backgroundColor:"red"
    },
    imagesContainer: {
        flexDirection: 'row',
    },
    imageWrapper: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        marginHorizontal: 5,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        resizeMode: 'cover',
        borderRadius: 13
    },
    textWrapper: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: "flex-end",
        flex: 1,
        // backgroundColor: Colors.grey,
        // opacity: 0.8,
        height: "100%",
        bottom: 0,
        width: "100%",
        borderRadius: 13,
        padding: 3,
    },
    centerText: {
        color: 'white',
        fontSize: 13,
        fontFamily: "Montserrat",
        fontWeight: "bold",
        zIndex: 1000
    },
    // bottomText: {
    //     color: 'white',
    //     fontSize: 18,
    // },
});