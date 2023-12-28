import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {MessagingHeads} from './messageHeads';
import {setGroup} from '../../redux';
import {connect} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import SuggestedGroups from './SuggestedGroups';
const GroupsList = ({appState, groupsData, navigation, mykey, setgroup}) => {
  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => setgroup(item)}>
          <MessagingHeads navigation={navigation} gdata={item} user={mykey} />
        </TouchableOpacity>
      </View>
    );
  };
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 7000); // 7 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <FlatList
      data={groupsData}
      renderItem={renderItem}
      estimatedItemSize={200}
      keyExtractor={item => item.groupkey}
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
            <Text>No groups yet</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList);
