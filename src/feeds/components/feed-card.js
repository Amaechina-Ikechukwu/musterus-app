import React, {useEffect, useState} from 'react';
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
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StaticImage} from '../../utilities';
import {NameDisplayCard} from './NameCard';
import {collection, onSnapshot, query} from 'firebase/firestore';
import {db} from '../../../firebase';
import {unlikepost} from '../apis/unlikepost';
import {likepost} from '../apis/likepost';
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
  user,
  setPost,
}) {
  const [liked, setLiked] = useState();
  const [numberOfLikes, setNumberOfLikes] = useState();
  const [numberOfComments, setNumberOfComments] = useState();
  const postaction = async () => {
    if (liked) {
      console.log('unlike');
      await unlikepost(user, data?.postid);
    } else {
      console.log('like');
      await likepost(user, data?.postid);
    }
  };
  useEffect(() => {
    const q = query(
      collection(db, 'posts', data.postid, 'likes'), // Order by 'sent' field in ascending order (oldest first)
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      let likes = [];
      querySnapshot.forEach(doc => {
        console.log(doc.id + '==' + data?.postid);
        likes.push(doc.id); // Assuming the likes are stored as document IDs
      });
      setNumberOfLikes(likes.length);
      // Check if the user's ID is in the likes array
      const isLiked = likes.includes(user); // Replace 'userId' with your actual user ID field

      setLiked(isLiked);
    });

    // Cleanup: Unsubscribe from real-time updates when component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Include necessary dependencies in the dependency array
  useEffect(() => {
    const q = query(
      collection(db, 'posts', data.postid, 'comments'), // Order by 'sent' field in ascending order (oldest first)
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      let likes = [];
      querySnapshot.forEach(doc => {
        likes.push(doc.id); // Assuming the likes are stored as document IDs
      });
      setNumberOfComments(likes.length);
    });

    // Cleanup: Unsubscribe from real-time updates when component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Include necessary dependencies in the dependency array

  return (
    <View style={styles.container}>
      <NameDisplayCard
        user={user}
        navigation={navigation}
        item={data}
        dot={true}
      />

      {data?.mediaurl != null && (
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
                src={data?.mediaurl}
                resizeMode={'cover'}
              />
            </Pressable>
          )}
        </>
      )}
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => postaction()}>
          {liked == true ? (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <LoveIcon />
              <Text style={[Style.boldText2, {marginTop: 6, color: '#041616'}]}>
                {numberOfLikes}
              </Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row', marginRight: 10}}>
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
                {numberOfLikes}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Comment', {post: data});
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
            {numberOfComments}
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <ShareIcon />
        </View>
      </View>
      <Text style={[styles.content, {fontFamily: 'Montserrat_light'}]}>
        {data?.caption}
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
