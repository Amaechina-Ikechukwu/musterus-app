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

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('chat group', {
          groupid: gdata.groupkey,
          groupname: gdata.groupname,
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
        {gdata?.groupheader ? (
          <Image
            style={styles.avatar}
            src={'https://www.musterus.com' + gdata?.groupheader}
          />
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
            <Text style={styles.username}>{gdata?.groupname}</Text>
            <Text style={styles.usernameTag}>{gdata?.groupintro}</Text>
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
