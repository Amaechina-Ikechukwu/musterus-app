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
import {Style} from '../../../assets/styles';
import {AllGroups} from '../apis/allgroups';
const SuggestedGroupsList = ({
  appState,
  groupsData,
  navigation,
  mykey,
  setgroup,
}) => {
  const [data, setData] = useState();
  const {User} = appState;
  const getGroups = async () => {
    const result = await AllGroups(User.mykey);
    console.log(result?.groups);
    setData(result?.groups);
  };
  useEffect(() => {
    getGroups();
  }, []);
  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => setgroup(item)}>
          <MessagingHeads navigation={navigation} gdata={item} user={mykey} />
        </TouchableOpacity>
      </View>
    );
  };
  if (!data || (data && data.length == 0)) {
    return null;
  }
  return (
    <FlatList
      data={groupsData}
      renderItem={renderItem}
      ListHeaderComponent={
        <View>
          <Text style={Style.Text}>Suggested Groups</Text>
        </View>
      }
      estimatedItemSize={200}
      keyExtractor={item => item.groupID}
      ListEmptyComponent={
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuggestedGroupsList);
