import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {setGroup, setPosts} from '../../redux';
import {connect} from 'react-redux';

import {FlashList} from '@shopify/flash-list';
import {FeedCard} from '../../feeds/components/feed-card';
import {Color} from '../../components/theme';
const Colors = Color();
const UserPostFlatlist = ({appState, data, navigation, Header}) => {
  const {User} = appState;
  const [showMessage, setShowMessage] = useState(false);
  const [postToView, setPostToView] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 7000); // 7 seconds

    return () => clearTimeout(timer);
  }, [postToView]);

  const renderItem = ({item}) => {
    return (
      <View>
        <FeedCard
          navigation={navigation}
          setPostToView={setPostToView}
          loading={loading}
          setLoading={setLoading}
          setModalVisible={setModalVisible}
          setPosts={setPosts}
          fetchposts={() => getHomeFeed()}
          data={item}
          user={User?.mykey}
        />
      </View>
    );
  };

  return (
    <>
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
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onMagicTap={() => {
          setModalVisible(!modalVisible);
          // Alert.alert('Modal has been closed.');
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          // Alert.alert('Modal has been closed.');
        }}>
        <View
          style={{
            backgroundColor: Colors.background,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Image
            style={styles.tweetImage}
            source={{uri: postToView?.mediaurl}}
          />
        </View>
      </Modal>
    </>
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
  tweetImage: {
    width: '100%',
    aspectRatio: 1,
    // borderRadius: 10,
    // margin: "2.5%",
    resizeMode: 'cover',
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
