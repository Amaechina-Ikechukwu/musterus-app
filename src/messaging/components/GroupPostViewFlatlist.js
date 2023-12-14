import React, {useEffect} from 'react';
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
  const getFullPostView = async () => {
    const result = await getgroupspostview(
      mykey,
      mskl,
      Profile.uid,
      Group.groupkey,
      post.grouppostid,
    );
    console.log(JSON.stringify(result, null, 2));
  };
  useEffect(() => {
    getFullPostView();
  }, []);
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index}
      renderItem={({item}) => <PostItem item={item} />}
      ListEmptyComponent={<Text style={Style.boldText}>No Post for now</Text>}
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
