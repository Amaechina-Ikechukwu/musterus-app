import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
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
import {ActivityIndicator} from 'react-native';
import {FlashList} from '@shopify/flash-list';
const {width} = Dimensions.get('screen');
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
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 7000); // 7 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, 'groups', groupid, 'chats'),
      orderBy('sent', 'desc'), // Order by 'sent' field in ascending order (oldest first)
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      let chats = [];
      querySnapshot.forEach(doc => {
        chats.push({id: doc.id, ...doc.data()});
      });

      setMessages(chats);
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
          <View>
            {item?.mediaurl && (
              <Image
                source={{uri: item?.mediaurl}}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 10,
                  backgroundColor: 'black',
                }}
                resizeMode="contain"
              />
            )}
          </View>
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
      <FlashList
        ref={flatListRef}
        data={messages}
        inverted
        renderItem={renderMessage}
        estimatedItemSize={200}
        keyExtractor={item => item.id.toString()}
        scrollToIndex={messages && messages.length - 1}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            {showMessage ? (
              <Text>No messages yet</Text>
            ) : (
              <ActivityIndicator size={'large'} />
            )}
          </View>
        }
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
    maxWidth: width * 0.7,
    minWidth: width * 0.5,
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
