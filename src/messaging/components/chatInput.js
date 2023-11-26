import React from 'react';
import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library
import {CameraIcon, MicIcon, SmileIcon} from './icons';
import {Color} from '../../components/theme';
import {ShareIcon} from '../../events/components/icons';

const Colors = Color();

export const ChatInput = ({message, setMessage, sendMessage}) => {
  const handleSend = () => {
    sendMessage();
  };

  const handleAudioRecording = () => {
    // Implement audio recording logic here
    console.log('Start audio recording');
  };

  return (
    <View style={styles.inputContainer}>
      <View
        style={{
          backgroundColor: '#FFF',
          flex: 3,
          flexDirection: 'row',
          marginRight: 10,
          borderRadius: 40,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={handleAudioRecording}
          style={styles.audioButton}>
          <SmileIcon />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          placeholderTextColor={Colors.grey}
          multiline
        />

        {message.length > 0 ? (
          <>
            <TouchableOpacity onPress={handleSend} style={styles.audioButton}>
              <ShareIcon />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={handleAudioRecording}
              style={styles.audioButton}>
              <CameraIcon />
            </TouchableOpacity>
          </>
        )}
      </View>

      {message.length < 1 && (
        <View
          style={{
            backgroundColor: Colors.primary,
            flexDirection: 'row',
            // flex: 1,
            // alignItems: "center",
            height: 46,
            width: 46,
            borderRadius: 46,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={handleSend}
            style={[styles.sendButton, {}]}>
            <MicIcon />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    bottom: 10,
    // backgroundColor: "red",
    // backgroundColor: "#FFF",
    zIndex: 3000,
    width: '100%',
  },
  audioButton: {
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: 'black',
    maxHeight: 90,
  },
  sendButton: {
    padding: 10,
  },
});
