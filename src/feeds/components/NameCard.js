import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library

import {TouchableOpacity} from 'react-native-gesture-handler';

import {usersprofile} from '../../user/apis/firebaseprofile';
import {Color} from '../../components/theme';
import {amifollwoing} from '../../muster-points/apis/amifollowing';
import {followuser} from '../../muster-points/apis/followuser';
import {ThreeDots} from './icons';
import {deletepost} from '../apis/deletepost';

const Colors = Color();
export function NameDisplayCard({
  dot,
  muster,
  user,
  navigation,
  link,
  item,
  fetchposts,
}) {
  const [following, setFollowing] = useState();
  const [Author, setAuthor] = useState(item?.authorinfo);
  const [showOptions, setShowOptions] = useState(false);
  const userprofile = async () => {
    if (!item?.authorinfo) {
      const result = await usersprofile(item.author);
      setAuthor(result);
    }
  };
  const followinguser = async () => {
    const result = await amifollwoing(user, item.author);

    setFollowing(result?.message);
  };
  const followUser = async () => {
    const result = await followuser(user, item.id);

    setFollowing(result?.message == 'added');
  };
  const deletePost = async () => {
    try {
      await deletepost(user, item?.postid);
      Alert.alert('Post Deleted', 'The post has been successfully deleted.');
      fetchposts();
    } catch (err) {
      Alert.alert(
        'Post deletion not complete',
        'This post could not be deleted at the moment.',
      );
    }
  };
  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  useEffect(() => {
    userprofile();
    followinguser();
  }, []);
  useEffect(() => {}, [Author, following]);
  if (!Author || Object.keys(Author).length === 0) {
    return null;
  }
  const showAlert = () => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: deletePost,
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} src={Author?.photourl || emptyimage} />
        <View
          style={{
            flex: 1,
            // backgroundColor: "green"
          }}>
          <TouchableOpacity
            onPress={() => {
              if (!link) {
                navigation.navigate('Profile', {user: item?.author});
              } else {
                navigation.navigate('Chat', {screen: link});
              }
            }}>
            <Text style={styles.username}>
              {Author?.firstname + ' ' + Author?.lastname}
            </Text>
            <Text style={styles.usernameTag}>{'@' + Author?.username}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.headerInfo,
            {
              flexDirection: 'row',

              justifyContent: 'space-evenly',
            },
          ]}>
          {user !== item?.author ? (
            !following ? (
              <>
                <View
                  style={{
                    // backgroundColor: "red",
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    // marginRight: 10,
                    // flex:1
                  }}>
                  <TouchableOpacity
                    onPress={() => followUser()}
                    style={{
                      backgroundColor: Colors.primary,
                      height: 30,
                      width: 90,
                      borderRadius: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: Colors.light}}>Muster</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null
          ) : null}
          {dot && user == item?.author && (
            <View>
              <TouchableOpacity
                onPress={() => setShowOptions(!showOptions)}
                style={{
                  flex: 0.6,
                  // backgroundColor: "red",
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                <ThreeDots />
              </TouchableOpacity>
              {showOptions && (
                <View
                  style={{
                    position: 'absolute',
                    left: -60,
                    bottom: -60,
                    zIndex: 23,
                  }}>
                  <TouchableOpacity
                    onPress={showAlert}
                    style={{
                      padding: 10,
                      width: 100,
                      height: 50,
                      backgroundColor: Colors.lightgrey,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>Delete Post</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {width: '100%'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#041616',
    fontFamily: 'Montserrat_ExtraBold',
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
    fontFamily: 'Montserrat_Regular',
  },
  iconsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 10,
  },
});
