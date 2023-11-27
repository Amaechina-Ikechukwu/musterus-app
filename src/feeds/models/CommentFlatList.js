import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {setGroup} from '../../redux';
import {connect} from 'react-redux';
import {NameDisplayCard} from '../../components/name-display-card';
import {FeedCard} from '../components/feed-card';
import {CommentsComponent} from '../components/comments';

const CommentFlatList = ({
  appState,
  data,
  navigation,
  setModalVisible,
  setpickImage,
  loading,
  setLoading,
}) => {
  const {User} = appState;
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 7000); // 7 seconds

    return () => clearTimeout(timer);
  }, []);

  const renderItem = ({item}) => {
    return (
      <View>
        <CommentsComponent item={item} />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      initialNumToRender={8}
      keyExtractor={item => item.postid}
      contentContainerStyle={{gap: 20}}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          {showMessage ? (
            <Text>No comments yet</Text>
          ) : (
            <ActivityIndicator size={'large'} />
          )}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupDescription: {
    fontSize: 16,
    color: '#666',
  },
  groupImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
  },
});

const mapStateToProps = state => {
  return {
    appState: state.user,
  };
};
const mapDispatchToProps = (dispatch, encoded) => {
  return {
    setgroup: payload => dispatch(setGroup(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentFlatList);
