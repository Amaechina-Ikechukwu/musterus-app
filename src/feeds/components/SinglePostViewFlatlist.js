import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {Style} from '../../../assets/styles';
import {Avatar} from 'react-native-paper';

import {connect} from 'react-redux';
import {OutlinedInput} from '../../components/inputs';
import {FontAwesome} from '@expo/vector-icons';
import {Color} from '../../components/theme';
import {ResizeMode, Video} from 'expo-av';
import {getcomment} from '../oldapis/getcomment';
import {postcomment} from '../oldapis/postcomments';
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
const TextInput = ({sendComment}) => {
  const Colors = Color();
  const [comment, setComment] = useState('');
  const callComment = async () => {
    try {
      await sendComment(comment);
    } catch {
      Alert.alert('Comment', 'Could not send comment at the moment');
    } finally {
      setComment('');
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-evenly',
        backgroundColor: Colors.white,
      }}>
      <OutlinedInput
        style={{width: '85%', alignItems: 'center', marginBottom: 0}}
        data={comment}
        setData={value => setComment(value)}
        placeholder="Add a comment"
      />
      <TouchableOpacity onPress={() => callComment()}>
        <FontAwesome name="send" size={24} color={Colors.primaryText} />
      </TouchableOpacity>
    </View>
  );
};
const HeaderComponent = ({post}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isBuffering, setIsBuffering] = useState(true);
  const [isPlaying, setPlaying] = useState(false);
  const mediaType = getImageType(post?.attachedimage);
  useEffect(() => {
    if (video.current) {
      video.current.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
    }
  }, [video.current]);
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
  return (
    <View style={styles.postContainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 3,
        }}>
        <Image
          source={{uri: 'https://www.musterus.com' + post.avatar}}
          style={{width: 40, height: 40, borderRadius: 100}}
        />
        <Text style={[Style.boldText, {fontSize: 16}]}>
          {post.firstname + ' ' + post.lastname}
        </Text>
      </View>
      {mediaType !== 'unknown' && (
        <>
          {mediaType == 'img' && (
            <Image
              onLoadEnd={() => {
                <ActivityIndicator size="large" color={Colors.background} />;
              }}
              onLoad={() => {
                <ActivityIndicator size="large" color={Colors.grey} />;
              }}
              style={[
                {
                  aspectRatio: 1,
                },
              ]}
              source={{uri: 'https://musterus.com' + post?.attachedimage}}
              resizeMode={'cover'}
            />
          )}
          {mediaType == 'vid' && (
            <View style={styles.ccontainer}>
              <Video
                ref={video}
                style={{width: '100%', height: 300}}
                source={{
                  uri: 'https://musterus.com' + post?.attachedimage,
                }}
                useNativeControls={true}
                resizeMode={ResizeMode.CONTAIN}
                // isLooping
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
      <Text style={[styles.content, Style.boldText, {fontSize: 16}]}>
        {post.comment.replace(/<p>/gi, '').replace(/<\/p>/gi, '')}
      </Text>
      <Text style={styles.time}>{post.writetime}</Text>
    </View>
  );
};
const PostItem = ({item}) => {
  return (
    <TouchableOpacity>
      <View style={styles.postContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
          }}>
          <Image
            source={{uri: 'https://www.musterus.com' + item.avatar}}
            style={{width: 40, height: 40, borderRadius: 100}}
          />
          <Text style={styles.author}>
            {item.firstname + ' ' + item.lastname}
          </Text>
        </View>

        <Text style={[styles.content, {fontSize: 16}]}>
          {item.comment.replace(/<p>/gi, '').replace(/<\/p>/gi, '')}
        </Text>
        <Text style={styles.time}>{item.writetime}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SinglePostViewFlatlist = ({data, appState, route}) => {
  const {User, Profile, Group} = appState;
  const {mykey, mskl} = User;
  const {post} = route?.params;
  const [replies, setReplies] = useState();
  const getPostComments = async () => {
    const result = await getcomment(mykey, post.comid, post.uid);
    setReplies(result.replies);
  };
  const replyToGroupPost = async comment => {
    try {
      await postcomment(mykey, post.comid, post.uid, 0, comment);

      getPostComments();
    } catch (err) {
      throw new Error(err);
    }
  };
  useEffect(() => {
    getPostComments();
  }, []);
  return (
    <View style={{height: '100%'}}>
      <FlatList
        data={replies}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => <PostItem item={item} />}
        ListEmptyComponent={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
              gap: 5,
            }}>
            <Text style={Style.LabelText}>No Replies for now</Text>
          </View>
        }
        ListHeaderComponent={<HeaderComponent post={post} />}
      />
      <TextInput sendComment={replyToGroupPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    padding: 10,
    gap: 5,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    color: '#666666',
    marginBottom: 5,
  },
  content: {
    fontSize: 20,
    lineHeight: 30,
  },

  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = state => {
  return {
    appState: state.user,
  };
};
const mapDispatchToProps = (dispatch, encoded) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SinglePostViewFlatlist);
