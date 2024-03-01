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
  const [following, setFollowing] = useState(false);
  const [addFriend, setAddFriend] = useState(false);
  const {mykey, mskl} = user;
  const followUser = async () => {
    // const result = await followuser(mykey, mskl, item.uid, item.profilekey);
    // console.log(JSON.stringify(result, null, 2));
    setInterval(() => {
      setFollowing(true);
    }, 1000);
  };
  const friendUser = async () => {
    // const result = await frienduser(mykey, mskl, item.uid, item.profilekey);
    // console.log(JSON.stringify(result, null, 2));
    setInterval(() => {
      setAddFriend(true);
    }, 1000);
  };

  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  useEffect(() => {
    // console.log(JSON.stringify(item, null, 2));
  }, []);
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
                onPress={() => followUser()}
                style={{
                  backgroundColor: Colors.primary,
                  height: 30,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 90,
                }}>
                <Text style={[Style.Text, {color: Colors.light, fontSize: 12}]}>
                  {following ? 'Following' : 'Follow'}
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
                  {addFriend ? 'Added' : 'Add Friend'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
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
