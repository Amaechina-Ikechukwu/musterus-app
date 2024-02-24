import {
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  Image,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {surprise_state, user_state} from '../../redux';
import {useNavigation} from '@react-navigation/native';
import {AppStatusBar} from '../../components/status-bar';

import {LabelTexts} from '../components/texts';

import Header from '../../messaging/components/header';
import {Color} from '../../components/theme';
import emptyimage from '../../emptyimage';
import {FlashList} from '@shopify/flash-list';
import musterusfullmedia from '../../musterusfullmedia';
const Colors = Color();
const FriendsFlatlist = ({Friends}) => {
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MusterCards', {
              friend: item,
            });
          }}
          style={[
            {
              height: 50,
              display: 'flex',
              justifyContent: 'center',
            },
          ]}>
          <View style={styles.header}>
            <Image
              style={styles.avatar}
              source={{
                uri: item?.avatar
                  ? 'https://musterus.com' + item.avatar.slice(1)
                  : emptyimage,
              }}
            />
            <Text>{item?.firstname + ' ' + item?.lastname}</Text>
          </View>
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
    <FlashList
      data={Friends}
      renderItem={renderItem}
      estimatedItemSize={200}
      keyExtractor={item => item.uid}
      ListHeaderComponent={<Text>Select Friend to send card to</Text>}
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
            <Text>No friends added</Text>
          ) : (
            <ActivityIndicator size={'large'} />
          )}
        </View>
      }
    />
  );
};

function MuterCards({route, appState, disp_surprise}) {
  const {User, Friends} = appState;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);

  return (
    <>
      <Header navigation={navigation} />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          paddingTop: 80,
          // padding: 20
        }}>
        <AppStatusBar StatusBar={StatusBar} useState={useState} />

        <View>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              // backgroundColor: "blue"
            }}>
            <LabelTexts
              style={{marginLeft: 15}}
              text="Pick a friend to send card too"
            />
          </View>

          <View
            style={{
              width: '100%',
              height: '100%',
              padding: 15,
            }}>
            <FriendsFlatlist key={Friends} Friends={Friends} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const mapStateToProps = state => {
  return {
    appState: state.user,
  };
};

const mapDispatchToProps = (dispatch, encoded) => {
  return {
    disp_surprise: payload => dispatch(surprise_state(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MuterCards);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    // backgroundColor:"red"
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.light, // red color with 50% transparency
    opacity: 0.8,
    marginTop: -20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#041616',
  },
  content: {
    fontSize: 16,
    marginVertical: 10,
    color: '#041616',
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 5,
  },
  tweetImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 16,
    resizeMode: 'cover',
  },
  usernameTag: {
    fontSize: 14,
    color: 'gray',
  },
  iconsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 10,
  },
});
