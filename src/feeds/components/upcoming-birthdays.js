import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text } from 'react-native';
import { Style } from '../../../assets/styles';
import { Color } from '../../components/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StaticImage } from '../../utilities';
const IMAGE_WIDTH = 74;
const IMAGE_HEIGHT = 130;
const Colors = Color()
export function UpcomingBirthdays({
    navigation
}) {
    return (
        <View style={styles.container}>
            <Text style={[Style.LabelText,
            {
                paddingVertical: 15,
                paddingHorizontal: 10,
                color: "#204624",
                fontWeight: 400
            }]} >
                Upcoming birthday’s
            </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.imagesContainer}>
                    {Array.from({ length: 10 }, (_, index) => (
                        // <View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("MuterCards")
                            }}
                            key={index} style={styles.imageWrapper}>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    src={StaticImage}
                                />
                                <View style={styles.textWrapper}>
                                    <Text style={[styles.centerText]}>Eni Queen Nnendah</Text>
                                    {/* <Text style={styles.bottomText}>11 june</Text> */}
                                </View>
                            </View>
                        </TouchableOpacity>

                        // </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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