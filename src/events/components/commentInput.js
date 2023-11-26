import React from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../../components/theme';
import { CameraIcon, MicIcon, SmileIcon } from '../../messaging/components/icons';
import { ShareIcon } from './icons';


const Colors = Color()

export function CommentInput({
    message, setMessage
}) {


    const handleSend = () => {
        // Implement logic to send the message
        console.log('Message Sent:', message);
        setMessage('');
    };

    const handleAudioRecording = () => {
        // Implement audio recording logic here
        console.log('Start audio recording');
    };

    return (
        <View style={styles.inputContainer}>

            <TouchableOpacity onPress={handleAudioRecording} style={styles.audioButton}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri:
                            'https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/311838830_3341516792834673_1624830650213567335_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG2I4ezOTyJWd1Q6SaGyWtTt0TqlRk4Rf63ROqVGThF_hMhAEUxrZPmz-YfwDVqi9XSOwJeMBUHJjjW2mK1cXwG&_nc_ohc=tMcuz-iePZwAX-IlhsR&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AfAvDZURMf1osfZvCjNmFOAq3WF5xqNQrwbghpiwEBotoQ&oe=64D287F2',
                    }}
                />
            </TouchableOpacity>
            <View style={{
                backgroundColor: "#FFF",
                 flex: 3,
                flexDirection: "row",
                // marginRight: 10,
                borderRadius: 40,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                paddingHorizontal: 10
            }}>

                <TextInput
                    style={styles.input}
                    placeholder="Add a comment"
                    value={message}
                    onChangeText={setMessage}
                    placeholderTextColor={Colors.grey}
                    multiline

                />



                {
                    message.length > 0 ? <>

                        <TouchableOpacity onPress={handleAudioRecording} style={styles.audioButton}>
                            <ShareIcon />
                        </TouchableOpacity>
                    </> : <>
                        <TouchableOpacity onPress={handleAudioRecording} style={styles.audioButton}>
                            {/* <CameraIcon /> */}
                        </TouchableOpacity>

                    </>
                }

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 20,
        // marginRight: 4,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 15,
        position: "absolute",
        bottom: 0,
        backgroundColor: Colors.background,
        // backgroundColor: "#FFF",
        zIndex: 3000,
        width: "100%",
        justifyContent: "center"
    },
    audioButton: {
        padding: 10,
    },
    input: {
        flex: 2,
        fontSize: 16,
        paddingHorizontal: 18,
        color: "black",
        maxHeight: 90,
    },
    sendButton: {
        padding: 10,
    },

});