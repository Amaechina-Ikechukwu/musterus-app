import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Style} from '../../../assets/styles';
import {Avatar} from 'react-native-paper';
import {getgroupspostview} from '../oldapis/groups/groupspostview';
import {connect} from 'react-redux';
import {OutlinedInput} from '../../components/inputs';
import {FontAwesome} from '@expo/vector-icons';
import {Color} from '../../components/theme';
import {grouppostcomment} from '../oldapis/groups/grouppostcomment';
const TextInput = ({sendComment}) => {
  const Colors = Color();
  const [comment, setComment] = useState('');
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-evenly',
      }}>
      <OutlinedInput
        style={{width: '85%', alignItems: 'center', marginBottom: 0}}
        data={comment}
        setData={value => setComment(value)}
        placeholder="Add a comment"
      />
      <TouchableOpacity onPress={() => sendComment(comment)}>
        <FontAwesome name="send" size={24} color={Colors.primaryText} />
      </TouchableOpacity>
    </View>
  );
};
const HeaderComponent = ({post}) => {
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
        <Text style={[styles.author, Style.boldText]}>
          {post.firstname + ' ' + post.lastname}
        </Text>
      </View>

      <Text style={[styles.content, Style.Text]}>
        {post.postbody.replace(/<p>/gi, '').replace(/<\/p>/gi, '')}
      </Text>
      <Text style={styles.time}>{post.posttime}</Text>
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

        <Text style={styles.content}>
          {item.postbody.replace(/<p>/gi, '').replace(/<\/p>/gi, '')}
        </Text>
        <Text style={styles.time}>{item.posttime}</Text>
      </View>
    </TouchableOpacity>
  );
};

const GroupPostViewFlatListComponent = ({data, appState, route}) => {
  const {User, Profile, Group} = appState;
  const {mykey, mskl} = User;
  const {post} = route?.params;
  const [replies, setReplies] = useState();
  const getFullPostView = async () => {
    const result = await getgroupspostview(
      mykey,
      mskl,
      Profile.uid,
      Group.groupkey,
      post.grouppostid,
    );
    setReplies(result.Replies);
    console.log(JSON.stringify(result.Replies, null, 2));
  };
  const replyToGroupPost = async comment => {
    const result = await grouppostcomment(
      mykey,
      mskl,
      Profile.uid,
      Group.groupkey,
      post.grouppostid,
      comment,
    );
    console.log({result});
    if (result.err == 0) {
      getFullPostView();
    }
  };
  useEffect(() => {
    getFullPostView();
  }, []);
  return (
    <FlatList
      data={data}
      contentContainerStyle={{height: '100%'}}
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
      ListFooterComponent={<TextInput sendComment={replyToGroupPost} />}
      ListFooterComponentStyle={{position: 'absolute', bottom: 10}}
    />
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
    fontSize: 16,
    lineHeight: 30,
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
)(GroupPostViewFlatListComponent);
