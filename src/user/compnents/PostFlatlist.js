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
import {connect} from 'react-redux';
import {setPosts} from '../../redux';
import {FeedCard} from '../../feeds/components/feed-card';

const PostFlatlist = ({
  appState,
  data,
  navigation,
  setModalVisible,
  setpickImage,
  loading,
  setLoading,
  setpost,
  Header,
  fetchposts,
}) => {
  const {User} = appState;
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 11000); // 7 seconds

    return () => clearTimeout(timer);
  }, []);

  const renderItem = ({item}) => {
    return (
      <View>
        <FeedCard
          data={item}
          setModalVisible={setModalVisible}
          navigation={navigation}
          setpickImage={setpickImage}
          user={User?.mykey}
          loading={loading}
          setLoading={setLoading}
          setPost={() => setpost(item)}
          fetchposts={fetchposts}
        />
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponentStyle={{
        width: '100%',
      }}
      data={data}
      ListHeaderComponent={Header}
      renderItem={renderItem}
      initialNumToRender={8}
      keyExtractor={item => item.comid}
      contentContainerStyle={{gap: 40}}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostFlatlist);
