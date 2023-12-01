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
const {width} = Dimensions.get('screen');
const SuggestedGroupsList = ({
  appState,
  groupsData,
  navigation,
  mykey,
  setgroups,
}) => {
  const [data, setData] = useState();

  const {User} = appState;
  const getGroups = async () => {
    const result = await AllGroups(User.mykey);

    setData(result?.groups);
  };

  useEffect(() => {
    getGroups();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <SuggestionHeader
        navigation={navigation}
        item={item}
        index={index}
        appState={appState}
        setgroups={setgroups}
        groupsData={groupsData}
        mykey={User?.mykey}
        getGroups={getGroups}
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
          <Text>Suggested Groups</Text>
        </View>
      }
      keyExtractor={(item, index) => item.groupId + index}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuggestedGroupsList);
