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
import {NameDisplayCard} from '../../components/name-display-card';
import {FeedCard} from '../components/feed-card';
import {FlashList} from '@shopify/flash-list';
import {SendACard} from '../components/SendACard';
import BirthdayView from '../components/BirthdayView';
const PostFlatlist = ({
  appState,
  data,
  navigation,
  setModalVisible,
  setpickImage,
  loading,
  setLoading,
  setpost,
  setPostToView,
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
      ListHeaderComponent={
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <SendACard navigation={navigation} />
        </View>
      }
      ListHeaderComponentStyle={{display: 'flex', flexDirection: 'row'}}
      data={data}
      renderItem={renderItem}
      // onRefresh={() => fetchposts()}
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
