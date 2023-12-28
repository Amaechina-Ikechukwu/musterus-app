import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Style} from '../../../assets/styles';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const PostItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('group post', {post: item})}>
      <View style={styles.postContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
          }}>
          <Image
            source={{uri: 'https://www.musterus.com' + item.avatar}}
            style={{width: 40, height: 40, borderRadius: 100}}
          />
          <Text style={[styles.author, Style.boldText]}>
            {item.firstname + ' ' + item.lastname}
          </Text>
        </View>

        <Text style={[styles.content, Style.Text]}>
          {item.postbody.replace(/<p>/gi, '').replace(/<\/p>/gi, '')}
        </Text>
        <Text style={styles.time}>{item.posttime}</Text>
      </View>
    </TouchableOpacity>
  );
};

const GroupFlatListComponent = ({data}) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 7000); // 7 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index}
      renderItem={({item}) => <PostItem item={item} />}
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
            <Text>No Posts yet</Text>
          ) : (
            <ActivityIndicator size={'large'} />
          )}
        </View>
      }
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
    lineHeight: 30,
  },
});

export default GroupFlatListComponent;
