import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library

import {TouchableOpacity} from 'react-native-gesture-handler';
import {Color} from '../../components/theme';
import {ThreeDots, UnlikeIcon} from './icons';
import {Style} from '../../../assets/styles';
import {StaticImage} from '../../utilities';
import {usersprofile} from '../../user/apis/firebaseprofile';

const Colors = Color();
export function CommentsComponent({item, tag}) {
  const [Author, setAuthor] = useState();
  const userprofile = async () => {
    const result = await usersprofile(item.author);
    setAuthor(result);
  };
  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  useLayoutEffect(() => {
    userprofile();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.headerInfo,
            {
              flexDirection: 'row',
              width: '100%',
              // backgroundColor: "green"
            },
          ]}>
          <View
            style={{
              flex: 1,
              // backgroundColor: "green",
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={styles.avatar}
                  src={Author?.photourl || emptyimage}
                />
                <Text style={styles.username}>
                  {Author?.firstname + ' ' + Author?.lastname}
                </Text>
                <Text style={[styles.usernameTag]}>
                  {`@${Author?.username}`}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  marginRight: 10,
                }}>
                <ThreeDots />
              </TouchableOpacity>
            </View>

            <Text
              style={[
                Style.Text,
                {
                  paddingLeft: 40,
                },
              ]}>
              {item.comment}
            </Text>
            {/* <View
              style={{
                marginLeft: 40,
                // backgroundColor: "red",
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 6,
              }}>
              <UnlikeIcon />
              <Text style={{color: Colors.dark}}>54</Text>
              <Text style={[styles.usernameTag]}>10 min ago</Text>
            </View> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    // backgroundColor: "red"
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#041616',
    paddingRight: 10,
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
    marginLeft: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 10,
  },
});
