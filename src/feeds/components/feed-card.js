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

import {likepost} from '../apis/likepost';
// import {  } from 'react-native-paper';
function extractTimeFromFirestoreTimestamp(timestampObj) {
  const {_seconds, _nanoseconds} = timestampObj;
  const firestoreMilliseconds = _seconds * 1000 + _nanoseconds / 1000000;

  const currentMilliseconds = Date.now();
  const timeDifference = currentMilliseconds - firestoreMilliseconds;

  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return 'now';
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(secondsDifference / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}

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
  fetchposts,
}) {
  const [liked, setLiked] = useState();
  const [action, setAction] = useState();
  const [showAction, setShowAction] = useState(false);
  const [usersLike, setUsersLike] = useState();
  const [numberOfLikes, setNumberOfLikes] = useState();
  const [numberOfComments, setNumberOfComments] = useState();
  const postaction = async action => {
    setShowAction(false);
    await likepost(user, data?.postid, action);
  };
  const likeactions = [
    {
      title: 'like',
      url: 'https://seeklogo.com/images/F/facebook-like-icon-logo-E656F54784-seeklogo.com.png',
    },
    {
      title: 'love',
      url: 'https://www.iconpacks.net/icons/1/free-heart-icon-992-thumb.png',
    },
    {
      title: 'dislike',
      url: 'https://cdn-icons-png.flaticon.com/512/889/889220.png',
    },
    {
      title: 'laugh',
      url: 'https://cdn.iconscout.com/icon/free/png-256/free-haha-emoji-894766.png',
    },
    {
      title: 'shocked',
      url: 'https://cdn-icons-png.flaticon.com/512/983/983019.png',
    },
    {
      title: 'sad',
      url: 'https://cdn.iconscout.com/icon/free/png-256/free-sad-emoji-17-894764.png',
    },
    {
      title: 'angry',
      url: 'https://cdn.iconscout.com/icon/free/png-256/free-angry-face-14-894765.png',
    },
  ];
  useEffect(() => {
    if (!user) return; // Ensure 'user' variable is available

    const likesRef = collection(db, 'posts', data.postid, 'likes');
    const q = query(likesRef);

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const likes = [];
      let userLike = null;

      querySnapshot.forEach(doc => {
        likes.push(doc.id);
        if (doc.id === user) {
          userLike = doc.data().action;
        }
      });

      setNumberOfLikes(likes.length);
      setUsersLike(userLike);

      // Check if the user's ID is in the likes array
      const isLiked = likes.includes(user); // Replace 'userId' with your actual user ID field
      setLiked(isLiked);
    });

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
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <NameDisplayCard
        user={user}
        navigation={navigation}
        item={data}
        dot={true}
        fetchposts={fetchposts}
      />

      {data?.mediaurl != null && data?.mediaurl?.length > 0 && (
        <>
          <Pressable
            onPress={() => {
              setPostToView(data);
              setModalVisible(true);
            }}
            style={styles.imageContainer}>
            <Image
              onLoadEnd={() => {
                setLoading(true);
              }}
              onLoad={() => {
                setLoading(true);
              }}
              style={[
                styles.tweetImage,
                {
                  aspectRatio: 1,
                },
              ]}
              source={{uri: data?.mediaurl}}
              resizeMode={'cover'}
            />
          </Pressable>
        </>
      )}
      <View style={styles.iconsContainer}>
        {showAction && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 10,
              backgroundColor: 'white',
              gap: 15,
              borderRadius: 100,
              position: 'absolute',
              top: -45,
              zIndex: 20,
              alignItems: 'center',
            }}>
            {likeactions.map(action => (
              <TouchableOpacity
                key={action.title}
                onPress={() => postaction(action)}>
                <Image
                  source={{uri: action.url}}
                  style={{width: 23, height: 23}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={() => setShowAction(!showAction)}>
          {usersLike ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 10,
                gap: 5,
                alignItems: 'center',
              }}>
              <Image
                source={{uri: usersLike.url}}
                style={{width: 23, height: 23}}
                resizeMode="contain"
              />
              <Text style={[Style.boldText2, {color: '#041616'}]}>
                {numberOfLikes}
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                marginRight: 10,
                gap: 3,
                alignItems: 'center',
              }}>
              <UnlikeIcon />
              <Text
                style={[
                  Style.boldText2,
                  {
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
        {/* <View style={{flexDirection: 'row'}}>
          <ShareIcon />
        </View> */}
      </View>
      <Text style={[styles.content, {fontFamily: 'Montserrat_light'}]}>
        {data?.caption}
      </Text>
      <Text style={[{fontFamily: 'Montserrat_Regular', color: Colors.grey}]}>
        {data?.createdAt && extractTimeFromFirestoreTimestamp(data?.createdAt)}
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
    width: 500,
    height: 500,
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
    alignItems: 'center',
  },
});
