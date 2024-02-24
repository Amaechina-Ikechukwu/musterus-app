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
import musterusfullmedia from '../../musterusfullmedia';

const Colors = Color();

export function ChatMessagingHeads({
  dot,
  active,
  navigation,
  page,
  uid,
  user,
  dmData,
}) {
  const [data, setData] = useState([]);
  const [friendData, setFriendData] = useState();

  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  // if (!friendData || Object.keys(friendData).length === 0) {
  //   return null;
  // }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('chat person', {
          conversationId: dmData?.conversationId,
          friend: dmData,
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
          borderBottomWidth: 0.5,
        },
      ]}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{
            uri: dmData?.avatar
              ? 'https://musterus.com' + dmData?.avatar.slice(1)
              : emptyimage,
          }}
        />

        <View style={[styles.headerInfo, {flexDirection: 'row'}]}>
          <View
            style={{
              flex: 1,
              // backgroundColor: "green"
            }}>
            <Text style={styles.username}>
              {dmData?.firstname + ' ' + dmData?.lastname}
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
