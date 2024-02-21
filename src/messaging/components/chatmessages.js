import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import {Style} from '../../../assets/styles';
import {
  onSnapshot,
  doc,
  collection,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import {db} from '../../../firebase';
import {usersprofile} from '../../user/apis/firebaseprofile';
import {ActivityIndicator} from 'react-native';
import {initializechat} from '../apis/initializechat';
import {Image} from 'react-native';
import {sendDM} from '../apis/sendDM';
const {width} = Dimensions.get('screen');

export const ChatMessages = ({page, user, route, messages}) => {
  const flatListRef = useRef(null);
  // const {user} = route?.params;
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 7000); // 7 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {}, []);
  const renderMessage = ({item}) => {
    return (
      <>
        <View
          style={[
            styles.messageBubble,
            item?.profilekey !== user.mykey
              ? styles.sentBubble
              : styles.receivedBubble,
          ]}>
          <View>
            {item?.mediaurl && (
              <Image
                source={{uri: item?.mediaurl}}
                style={{width: '100%', height: 200, borderRadius: 10}}
                resizeMode="cover"
              />
            )}
          </View>
          <Text
            style={[
              styles.messageText,
              item?.profilekey !== user.mykey
                ? styles.receivedText
                : styles.sentText,
              {
                fontFamily: 'Montserrat_Regular',
              },
            ]}>
            {item?.msgbody}
          </Text>

          <Text
            style={[
              styles.timeText,
              item?.profilekey !== user.mykey
                ? styles.sentTime
                : styles.receivedTime,
            ]}>
            <Text>sent </Text> {item?.msgtime}
          </Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{flex: 1, width: '100%', height: '100%'}}
        data={messages}
        renderItem={renderMessage}
        inverted
        initialNumToRender={16}
        keyExtractor={item => item.dmid}
        scrollToIndex={messages && messages.length - 1}
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
              <Text>Be the first to send a message</Text>
            ) : (
              <ActivityIndicator size={'large'} />
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 60,
    height: '100%',
    width: '100%',
  },
  messageBubble: {
    // borderRadius: 8,
    padding: 8,
    marginBottom: 11,
    maxWidth: width * 0.7,
    minWidth: width * 0.6,
    // flexDirection:"row"
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#116466',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#072B2C',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  sentImage: {
    alignSelf: 'flex-start',
  },
  receivedImage: {
    alignSelf: 'flex-start',
    backgroundColor: '#072B2C',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Montserrat_Regular',
    // flex:2
    // marginRight:20
  },
  sentText: {
    color: 'white',
  },
  receivedText: {
    color: 'white',
  },

  timeText: {
    fontSize: 12,
    marginTop: 5,
    // flex:0.6,
    //    textAlign:"right",
    //     backgroundColor:"red"
  },
  sentTime: {
    color: 'lightgray',
    alignSelf: 'flex-end',
  },
  receivedTime: {
    color: 'lightgray',
    alignSelf: 'flex-start',
  },
});
