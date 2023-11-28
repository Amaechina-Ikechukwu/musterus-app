import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // Replace with the appropriate icon library
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Color} from '../../components/theme';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
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

const Colors = Color();
const getUserid = (uid, data) => {
  return data.filter(id => id !== uid)[0];
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
export function ChatMessagingHeads({
  dot,
  active,
  navigation,
  page,
  uid,
  user,
  dmData,
}) {
  const friendid = getUserid(user, dmData?.participants);
  const [data, setData] = useState([]);
  const [friendData, setFriendData] = useState();
  const getFriendProfile = async () => {
    try {
      const result = await usersprofile(friendid);

      setFriendData(result);
    } catch (err) {
      Alert.alert(
        'Do not be angry',
        'Our service seems to be down at the moment',
      );
    }
  };
  useEffect(() => {
    getFriendProfile();
  }, []);
  useEffect(() => {
    const q = query(
      collection(db, 'direct_messages', dmData?.conversationId, 'messages'),
      orderBy('sent', 'desc'), // Order by 'sent' field in descending order (latest first)
      limit(1), // Limit the query to retrieve only the latest chat message
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      let chats = null;
      querySnapshot.forEach(doc => {
        chats = {id: doc.id, ...doc.data()};
      });

      setData(chats);
    });

    // Cleanup: Unsubscribe from real-time updates when component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Ensure db and gdata.groupid are dependencies if they change
  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  if (!friendData || Object.keys(friendData).length === 0) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('chat person', {
          conversationId: dmData?.conversationId,
          friendid: friendid,
        });
      }}
      style={[
        styles.container,
        {
          backgroundColor: active == true ? Colors.background : Colors.light,
          borderWidth: 0.2,
          borderLeftWidth: 0,
          // borderTopWidth: 0,
          borderRightWidth: 0,
          borderColor: Colors.inputOutline,
        },
      ]}>
      <View style={styles.header}>
        <Image style={styles.avatar} src={friendData?.photourl || emptyimage} />

        <View style={[styles.headerInfo, {flexDirection: 'row'}]}>
          <View
            style={{
              flex: 1,
              // backgroundColor: "green"
            }}>
            <Text style={styles.username}>
              {friendData?.firstname + ' ' + friendData?.lastname}
            </Text>
            <Text style={styles.usernameTag}>
              {data && Object.entries(data).length == 0
                ? 'Enter message'
                : data?.text}
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              // backgroundColor: "red",
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <Text
              style={{
                color: Colors.light,
                fontSize: 11,
                backgroundColor: Colors.primary,
                borderRadius: 20,
                height: 25,
                textAlign: 'center',
                padding: 4,
                marginTop: 5,
              }}>
              {extractTimeFromFirestoreTimestamp(data?.sent)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
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
    color: '#041616',
  },
  content: {
    fontSize: 16,
    marginVertical: 10,
    color: '#041616',
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
  },
  iconsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 10,
  },
});
