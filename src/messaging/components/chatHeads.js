import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library

import {Color} from '../../components/theme';
import {BackIcon} from '../../../assets/icons/auth-icons';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {StaticImage} from '../../utilities';
import emptyimage from '../../../emptyimage';

const Colors = Color();

export function ChatHead({navigation, page, user}) {
  useEffect(() => {}, [user]);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#D1E8E2',
          borderWidth: 0.2,
          borderLeftWidth: 0,
          // borderTopWidth: 0,
          borderRightWidth: 0,
          borderColor: Colors.inputOutline,
        },
      ]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}>
          <BackIcon />
        </TouchableOpacity>
        <Image
          style={[styles.avatar, {marginLeft: 17}]}
          src={
            user?.avatar
              ? `https://www.musterus.com${user?.avatar.slice(1)}`
              : emptyimage
          }
        />
        <View style={[styles.headerInfo, {flexDirection: 'row'}]}>
          <View
            style={{
              flex: 1,
              // backgroundColor: "green"
            }}>
            <Text style={styles.username}>{user?.firstname}</Text>
            <Text style={styles.usernameTag}>
              {page == 'PERSON' ? (
                <>Online</>
              ) : (
                <>Mr. Alvin, princess, Bestie ...</>
              )}
            </Text>
          </View>
        </View>
      </View>
    </View>
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
    width: 40,
    height: 40,
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
