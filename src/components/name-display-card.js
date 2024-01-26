import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library
import {Color} from './theme';
import {ThreeDots} from '../events/components/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StaticImage} from '../utilities';
import {followuser} from '../events/apis/followuser';
import {frienduser} from '../events/apis/frienduser';
import {Style} from '../../assets/styles';

const Colors = Color();
export function NameDisplayCard({
  dot,
  muster,
  user,
  navigation,
  link,
  item,
  component,
  conversationId,
  sendACard,
  goto,
  count,
}) {
  const [following, setFollowing] = useState(item?.isFollowing);
  const {mykey, mskl} = user;
  const followUser = async () => {
    const result = await followuser(mykey, mskl, item.uid, item.profilekey);
    console.log(JSON.stringify(result, null, 2));
    // setFollowing(result?.message == 'added');
  };
  const friendUser = async () => {
    const result = await frienduser(mykey, mskl, item.uid, item.profilekey);
    console.log(JSON.stringify(result, null, 2));
    // setFollowing(result?.message == 'added');
  };

  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  useEffect(() => {}, []);
  return (
    <View
      style={[
        styles.container,
        {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      ]}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          src={
            item?.avatar
              ? `https://www.musterus.com${item?.avatar}`
              : emptyimage
          }
        />
        <View
          style={[
            styles.headerInfo,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <View
            style={
              {
                // backgroundColor: "green"
              }
            }>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile', {user: item});
              }}>
              <Text style={styles.username}>
                {item?.firstname + ' ' + item?.lastname}
              </Text>
              <Text style={styles.usernameTag}>{'@' + item?.username}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        {component == 'SUGGESTION' ||
        component == 'SEARCH' ||
        component == 'SENDCARD' ||
        component == 'FollowUsers' ? (
          !following ? (
            <>
              <View
                style={{
                  // backgroundColor: "red",
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  gap: 5,
                  // marginRight: 10,
                  // flex:1
                }}>
                <TouchableOpacity
                  onPress={() => friendUser()}
                  style={{
                    backgroundColor: Colors.primary,
                    height: 30,
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 90,
                  }}>
                  <Text
                    style={[Style.Text, {color: Colors.light, fontSize: 12}]}>
                    Follow
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => friendUser()}
                  style={{
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    height: 30,
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 90,
                  }}>
                  <Text
                    style={[
                      Style.Text,
                      {
                        color: Colors.light,
                        color: Colors.primary,
                        fontSize: 12,
                      },
                    ]}>
                    Add Friend
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View
              style={{
                // backgroundColor: "red",
                alignItems: 'flex-start',
                justifyContent: 'center',
                // marginRight: 10,
                // flex:1
              }}>
              {component == 'SEARCH' ? (
                <TouchableOpacity
                  onPress={() => conversationId(item)}
                  style={{
                    backgroundColor: Colors.white,
                    height: 30,
                    width: 90,
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: Colors.primaryText}}>Message</Text>
                </TouchableOpacity>
              ) : component == 'SENDCARD' ? (
                <TouchableOpacity
                  onPress={() => sendACard(item)}
                  style={{
                    backgroundColor: Colors.white,
                    height: 30,
                    width: 90,
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: Colors.primaryText}}>Send Card</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.lightgrey,
                    height: 30,
                    width: 90,
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: Colors.primaryText}}>Following</Text>
                </TouchableOpacity>
              )}
            </View>
          )
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {width: '100%', height: 40},
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
    fontSize: 12,
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
    fontSize: 10,
    color: 'gray',
    fontFamily: 'Montserrat_Regular',
  },
  iconsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 10,
  },
});
