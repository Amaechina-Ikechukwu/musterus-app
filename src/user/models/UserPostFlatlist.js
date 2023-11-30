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
import {setGroup, setPosts} from '../../redux';
import {connect} from 'react-redux';

import {FlashList} from '@shopify/flash-list';

import {FeedCard} from '../../events/components/feed-card';
const UserPostFlatlist = ({appState, data, navigation, Header}) => {
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
        <FeedCard navigation={navigation} item={item} />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      // onRefresh={() => fetchposts()}
      initialNumToRender={8}
      keyExtractor={item => item.postid}
      contentContainerStyle={{gap: 20}}
      ListHeaderComponent={Header}
      estimatedItemSize={200}
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
            <Text>No posts yet</Text>
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
    setpost: payload => dispatch(setPosts(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPostFlatlist);
