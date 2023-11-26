import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library
import {CommentIcon, LoveIcon, ShareIcon, ThreeDots, UnlikeIcon} from './icons';
import {Style} from '../../../assets/styles';
import {Color} from '../../components/theme';
import {NameDisplayCard} from '../../components/name-display-card';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StaticImage} from '../../utilities';
// import {  } from 'react-native-paper';

const Colors = Color();
export function FeedCard({
  data,
  navigation,
  setModalVisible,
  setPostToView,
  setpickImage,
  loading,
  setLoading,
}) {
  // const UnlikeReaction = () => {
  //     // get index
  //     let Index = posts.findIndex(e => e.text == data.text)
  //     let newData = {
  //         ...data,
  //         liked: false
  //     }
  //     posts.splice(Index, 1, newData)
  //     setPosts(posts)
  //     console.log("unliked")
  // }

  // const LikeReaction = () => {
  //     // get index
  //     let Index = posts.findIndex(e => e.text == data.text)
  //     let newData = {
  //         ...data,
  //         liked: true
  //     }
  //     posts.splice(Index, 1, newData)
  //     setPosts(posts)
  //     console.log("liked")
  // }
  return (
    <View style={styles.container}>
      {setpickImage(true)}
      <NameDisplayCard navigation={navigation} data dot={true} />

      {data.img != null && (
        <>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Pressable
              onPress={() => {
                setPostToView(data);
                setModalVisible(true);
              }}
              style={styles.imageContainer}>
              <Image
                // onLoadStart={() => {
                //     setLoading(true)
                // }}
                onLoad={() => {
                  setLoading(false);
                }}
                style={[
                  styles.tweetImage,
                  {
                    aspectRatio: 1,
                  },
                ]}
                src={StaticImage}
                resizeMode={'cover'}
              />
            </Pressable>
          )}
        </>
      )}
      <View style={styles.iconsContainer}>
        {data.liked == true ? (
          <TouchableOpacity
            onPress={() => {
              // UnlikeReaction(data)
              // setpickImage(true)
            }}
            style={{flexDirection: 'row', marginRight: 10}}>
            <LoveIcon />
            <Text style={[Style.boldText2, {marginTop: 6, color: '#041616'}]}>
              {data.likes}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              // LikeReaction(data)
              // setpickImage(true)
            }}
            style={{flexDirection: 'row', marginRight: 10}}>
            <UnlikeIcon />
            <Text
              style={[
                Style.boldText2,
                {
                  marginTop: 6,
                  fontFamily: 'Montserrat_Regular',
                  color: '#041616',
                },
              ]}>
              {data.likes}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Comment');
          }}
          style={{flexDirection: 'row', marginRight: 10}}>
          <CommentIcon />
          <Text
            style={[
              Style.boldText2,
              {
                marginTop: 6,
                fontFamily: 'Montserrat_Regular',
                color: '#041616',
              },
            ]}>
            54
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <ShareIcon />
        </View>
      </View>
      <Text style={[styles.content, {fontFamily: 'Montserrat_light'}]}>
        {data.text}
      </Text>
      <Text style={[{fontFamily: 'Montserrat_Regular', color: Colors.grey}]}>
        11:18 AM
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    // borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0.2,
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
