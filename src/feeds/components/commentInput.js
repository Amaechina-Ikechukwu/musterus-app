import React from 'react';
import {View, Text, FlatList, StyleSheet, TextInput, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Color} from '../../components/theme';
import {CameraIcon, MicIcon, SmileIcon} from '../../messaging/components/icons';
import {ShareIcon} from './icons';
import {StaticImage} from '../../utilities';

const Colors = Color();

export function CommentInput({message, setMessage, sendComment}) {
  const handleAudioRecording = () => {
    // Implement audio recording logic here
    console.log('Start audio recording');
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        onPress={handleAudioRecording}
        style={styles.audioButton}>
        <Image style={styles.avatar} src={StaticImage} />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#FFF',
          flex: 3,
          flexDirection: 'row',
          // marginRight: 10,
          borderRadius: 40,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          paddingHorizontal: 10,
        }}>
        <TextInput
          autoFocus
          style={styles.input}
          placeholder="Add a comment"
          value={message}
          onChangeText={setMessage}
          placeholderTextColor={Colors.grey}
          multiline
        />

        {message.length > 0 ? (
          <>
            <TouchableOpacity
              onPress={() => sendComment()}
              style={styles.audioButton}>
              <ShareIcon />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={handleAudioRecording}
              style={styles.audioButton}>
              {/* <CameraIcon /> */}
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

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
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.background,
    // backgroundColor: "#FFF",
    zIndex: 3000,
    width: '100%',
    justifyContent: 'center',
  },
  audioButton: {
    padding: 10,
  },
  input: {
    flex: 2,
    fontSize: 16,
    paddingHorizontal: 18,
    color: 'black',
    height: 40,
  },
  sendButton: {
    padding: 10,
  },
});
