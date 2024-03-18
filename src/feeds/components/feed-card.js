import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library
import {CommentIcon, LoveIcon, ShareIcon, ThreeDots, UnlikeIcon} from './icons';
import {Style} from '../../../assets/styles';
import {Color} from '../../components/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StaticImage} from '../../utilities';
import {NameDisplayCard} from './NameCard';
import {Video, ResizeMode} from 'expo-av';
import {likepost} from '../apis/likepost';
import {reacttopost} from '../oldapis/reacttopost';
// import {  } from 'react-native-paper';
function getImageType(attachedImage) {
  const imageExtensions = /\.(jpg|jpeg|png|gif)$/i;
  const videoExtensions = /\.(mp4|avi|mov|mkv)$/i;

  switch (true) {
    case imageExtensions.test(attachedImage):
      return 'img';
    case videoExtensions.test(attachedImage):
      return 'vid';
    default:
      return 'unknown';
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
  const [liked, setLiked] = useState(0);
  const [action, setAction] = useState();
  const [showAction, setShowAction] = useState(false);
  const [usersLike, setUsersLike] = useState();
  const [numberOfLikes, setNumberOfLikes] = useState();
  const [numberOfComments, setNumberOfComments] = useState();
  const postaction = async (action, number) => {
    try {
      setShowAction(false);
      setLiked(number);
      const {comid, mykey, uid, userkey, mskl} = action;
      await reacttopost(comid, number, 0, userkey, mskl, uid);
    } catch (e) {
      Alert.alert('Post Reaction', 'Could not react to post at this time');
    }
  };
  const likeactions = [
    {
      title: 'like',
      url: '👍',
      number: 1,
    },

    {
      title: 'dislike',
      url: '👎',
      number: 2,
    },
    {
      title: 'sad',
      url: '😒',
      number: 3,
    },
    {
      title: 'love',
      url: '❤️',
      number: 4,
    },
  ];
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isBuffering, setIsBuffering] = useState(true);
  const [isPlaying, setPlaying] = useState(false);

  const _onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`,
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state

      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
        setPlaying(true);
      } else {
        // Update your UI for the paused state
        setPlaying(false);
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
        setIsBuffering(true);
      } else {
        setIsBuffering(false);
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
      }

      // You can continue updating your UI for other states as needed.
    }
  };

  const mediaType = getImageType(data?.attachedimage);
  useEffect(() => {
    if (video.current) {
      video.current.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
    }
  }, [video.current]);

  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <NameDisplayCard
        user={data}
        navigation={navigation}
        item={data}
        dot={true}
        fetchposts={fetchposts}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Comments', {post: data})}
        style={styles.imageContainer}>
        {mediaType !== 'unknown' && (
          <>
            {mediaType == 'img' && (
              <Image
                onLoadEnd={() => {
                  setLoading(true);
                }}
                onLoad={() => {
                  setLoading(true);
                }}
                style={[
                  {
                    aspectRatio: 1,
                  },
                ]}
                source={{uri: 'https://www.musterus.com' + data?.attachedimage}}
                resizeMode={'cover'}
              />
            )}
            {mediaType == 'vid' && (
              <View style={styles.ccontainer}>
                <Video
                  ref={video}
                  style={{width: '100%', height: 500}}
                  source={{
                    uri: 'https://www.musterus.com' + data?.attachedimage,
                  }}
                  useNativeControls={false}
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                />

                <View style={styles.loadingContainer}>
                  {isBuffering ? (
                    <ActivityIndicator size="large" color={Colors.grey} />
                  ) : null}
                </View>

                {/* Your custom timeline UI can be added here */}
                {/* Example: <CustomTimeline currentTime={status.positionMillis} totalDuration={status.durationMillis} /> */}
              </View>
            )}
          </>
        )}
        <Text style={[styles.content, {fontFamily: 'Montserrat_light'}]}>
          {data?.comment}
        </Text>
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        {showAction && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',

              backgroundColor: Colors.background,
              gap: 15,
              borderRadius: 100,
              position: 'absolute',
              top: -45,
              zIndex: 20,
              alignItems: 'center',
              padding: 5,
            }}>
            {likeactions.map(action => (
              <TouchableOpacity
                key={action.title}
                onPress={() => postaction(data, action.number)}>
                <Text style={[{fontFamily: 'Montserrat_light', fontSize: 24}]}>
                  {action.url}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={() => setShowAction(!showAction)}>
          {liked && liked > 0 ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 10,
                gap: 5,
                alignItems: 'center',
              }}>
              <Text style={[{fontFamily: 'Montserrat_light', fontSize: 24}]}>
                {likeactions[liked - 1].url}
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
          onPress={() => navigation.navigate('Comments', {post: data})}
          style={{flexDirection: 'row', marginRight: 10}}>
          <CommentIcon />
        </TouchableOpacity>
      </View>

      <Text style={[{fontFamily: 'Montserrat_Regular', color: Colors.grey}]}>
        {data?.writetime}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    // borderRadius: 10,
    gap: 20,
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
  },
  ccontainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#041616',
  },
  content: {
    fontSize: 16,

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

    resizeMode: 'cover',
  },
  usernameTag: {
    fontSize: 14,
    color: 'gray',
  },
  iconsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',

    alignItems: 'center',
  },
});
