import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
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

const Colors = Color();

export function MessagingHeads({
  dot,
  active,
  navigation,
  page,
  uid,
  user,
  gdata,
}) {
  const [data, setData] = useState([]);
  const navigate = () => {};
  useEffect(() => {
    const q = query(
      collection(db, 'groups', gdata.groupID, 'chats'),
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

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('chat group', {
          groupid: gdata.groupID,
          groupname: gdata.data.name,
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
        {gdata?.data?.photourl ? (
          <Image style={styles.avatar} src={gdata?.data?.photourl} />
        ) : (
          <MaterialCommunityIcons
            name="account-group-outline"
            size={24}
            color="black"
            style={styles.avatar}
          />
        )}

        <View style={[styles.headerInfo, {flexDirection: 'row'}]}>
          <View
            style={{
              flex: 1,
              // backgroundColor: "green"
            }}>
            <Text style={styles.username}>{gdata?.data?.name}</Text>
            <Text style={styles.usernameTag}>
              {data && Object.entries(data).length == 0
                ? 'Enter message'
                : data?.message}
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
                color: Colors.grey,
                fontSize: 11,
              }}>
              Now
            </Text>
            <Text
              style={{
                color: Colors.light,
                fontSize: 11,
                backgroundColor: Colors.primary,
                borderRadius: 20,
                height: 25,
                width: 25,
                textAlign: 'center',
                padding: 4,
                marginTop: 5,
              }}>
              99
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
