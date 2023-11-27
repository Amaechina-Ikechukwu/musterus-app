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

const UsersFlatlist = ({appState, data, navigation, component}) => {
  const {User} = appState;
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 7000); // 7 seconds

    return () => clearTimeout(timer);
  }, [component]);

  const renderItem = ({item}) => {
    return (
      <View>
        <NameDisplayCard
          user={User?.mykey}
          navigation={navigation}
          component={component}
          item={item}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
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
            <Text>
              No {component == 'FRIENDS' ? 'friends added' : 'Suggestions'} yet
            </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersFlatlist);
