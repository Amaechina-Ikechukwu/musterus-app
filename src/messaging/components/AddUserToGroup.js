import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {setGroup, setGroups} from '../../redux';
import {connect} from 'react-redux';

import {AllGroups} from '../apis/allgroups';

import {Color} from '../../components/theme';
import {joingroup} from '../apis/updategroup copy';
import {MyGroups} from '../apis/groups';
import {SuggestionHeader} from './SuggestionHeader';
import {AddUserHeader} from './AddUserHeader';
import {usefriends} from '../../muster-points/apis/UserFriends';
const {width} = Dimensions.get('screen');
const AddUsersToGroup = ({
  appState,
  groupsData,
  navigation,
  mykey,
  setgroups,
  route,
}) => {
  const [data, setData] = useState();
  const {groupid} = route?.params;
  const {User} = appState;
  const friends = async () => {
    const result = await usefriends(User?.mykey);

    setData(result.userfriends);
  };

  useEffect(() => {
    friends();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <AddUserHeader
        navigation={navigation}
        item={item}
        index={index}
        appState={appState}
        mykey={User?.mykey}
        groupid={groupid}
      />
    );
  };
  if (!data || (data && data.length == 0)) {
    return null;
  }
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      contentContainerStyle={{gap: 10, padding: 10}}
      ListHeaderComponentStyle={{marginBottom: 10}}
      ListHeaderComponent={
        <View>
          <Text style={{fontSize: 20, fontWeight: '500'}}>
            Add Users To Group
          </Text>
        </View>
      }
      keyExtractor={(item, index) => index}
      ListEmptyComponent={
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    appState: state.user,
  };
};
const mapDispatchToProps = (dispatch, encoded) => {
  return {
    setgroups: payload => dispatch(setGroups(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersToGroup);
