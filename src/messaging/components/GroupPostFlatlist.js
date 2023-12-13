import React from 'react';
import {FlatList, View, Text, StyleSheet, Image} from 'react-native';
import {Style} from '../../../assets/styles';
import {Avatar} from 'react-native-paper';

const PostItem = ({item}) => {
  console.log(JSON.stringify(item, null, 2));
  return (
    <View style={styles.postContainer}>
      <View style={{display: 'flex', justifyContent: 'center'}}>
        <Image source={{uri: item.avatar}} style={{width: 10, height: 10}} />
        <Text style={styles.author}>
          {item.firstname + ' ' + item.lastname}
        </Text>
      </View>

      <Text style={styles.content}>
        {item.postbody.replace(/<p>/gi, '').replace(/<\/p>/gi, '')}
      </Text>
      <Text style={styles.time}>{item.posttime}</Text>
    </View>
  );
};

const GroupFlatListComponent = ({data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index}
      renderItem={({item}) => <PostItem item={item} />}
      ListEmptyComponent={<Text style={Style.boldText}>No Post for now</Text>}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    padding: 10,
    gap: 5,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    color: '#666666',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
});

export default GroupFlatListComponent;
