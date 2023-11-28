import React from 'react';
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
import {ChatMessagingHeads} from './ChatMessageHead';

const ChatsFlatlist = ({appState, data, navigation, mykey, setgroup}) => {
  const {Chatlist} = appState;
  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => setgroup(item)}>
          <ChatMessagingHeads
            navigation={navigation}
            dmData={item}
            user={mykey}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={Chatlist}
      renderItem={renderItem}
      keyExtractor={item => item.conversationId}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatsFlatlist);
