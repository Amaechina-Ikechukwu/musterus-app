import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native';
import {Style} from '../../../assets/styles';
import {
  onSnapshot,
  doc,
  collection,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import {db} from '../../../firebase';
import {usersprofile} from '../../user/apis/firebaseprofile';
const fetchUserProfiles = async messages => {
  const uniqueUserIds = [...new Set(messages.map(message => message.from))];
  const profiles = {};

  for (const userId of uniqueUserIds) {
    profiles[userId] = await usersprofile(userId);
  }
  return profiles;
};

function extractTimeFromFirestoreTimestamp(timestampObj) {
  const {seconds, nanoseconds} = timestampObj;
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;

  // Create a Date object using the milliseconds value
  const date = new Date(milliseconds);

  // Extract hours, minutes, and seconds from the Date object
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();

  // Format the time to desired format (example: hh:mm:ss)
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return formattedTime;
}
export const ChatScreen = ({page, groupid, user}) => {
  const [messages, setMessages] = useState();
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]); // Scroll to end whenever messages change
  const scrollToBottom = () => {
    flatListRef.current.scrollToIndex({
      index: messages.length - 1,
      animated: true,
    });
  };
  useEffect(() => {
    const q = query(
      collection(db, 'groups', groupid, 'chats'),
      orderBy('sent', 'asc'), // Order by 'sent' field in ascending order (oldest first)
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      let chats = [];
      querySnapshot.forEach(doc => {
        chats.push({id: doc.id, ...doc.data()});
      });

      setMessages(chats);

      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({animated: true});
      }
    });

    // Cleanup: Unsubscribe from real-time updates when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const [userProfiles, setUserProfiles] = useState({});

  useEffect(() => {
    if (messages && messages.length > 0) {
      fetchUserProfiles(messages).then(profiles => {
        setUserProfiles(profiles);
      });
    }
  }, [messages]);

  const renderMessage = ({item}) => {
    const userName = userProfiles[item.from]
      ? userProfiles[item.from].firstname
        ? userProfiles[item.from].firstname
        : userProfiles[item.from].fullName
      : '';

    return (
      <>
        {item.from !== user.mykey && page == 'GROUP' && (
          <Text style={[Style.boldText2, {marginBottom: 5, fontSize: 13}]}>
            {userName}
          </Text>
        )}

        <View
          style={[
            styles.messageBubble,
            item.from == user.mykey ? styles.sentBubble : styles.receivedBubble,
          ]}>
          <Text
            style={[
              styles.messageText,
              item.from == user.mykey ? styles.sentText : styles.receivedText,
              {
                fontFamily: 'Montserrat_Regular',
              },
            ]}>
            {item.message}
          </Text>

          <Text
            style={[
              styles.timeText,
              item.from == user.mykey ? styles.sentTime : styles.receivedTime,
            ]}>
            <Text>sent </Text> {extractTimeFromFirestoreTimestamp(item.sent)}
          </Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        initialScrollIndex={
          messages && messages.length > 0 ? messages.length - 1 : 0
        }
        getItemLayout={(data, index) => ({
          length: 60, // Update with your actual item's height
          offset: 60 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 60,
  },
  messageBubble: {
    // borderRadius: 8,
    padding: 8,
    marginBottom: 11,
    maxWidth: '70%',
    // flexDirection:"row"
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#116466',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#072B2C',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Montserrat_Regular',
    // flex:2
    // marginRight:20
  },
  sentText: {
    color: 'white',
  },
  receivedText: {
    color: 'white',
  },

  timeText: {
    fontSize: 12,
    marginTop: 5,
    // flex:0.6,
    //    textAlign:"right",
    //     backgroundColor:"red"
  },
  sentTime: {
    color: 'lightgray',
    alignSelf: 'flex-end',
  },
  receivedTime: {
    color: 'lightgray',
    alignSelf: 'flex-start',
  },
});
