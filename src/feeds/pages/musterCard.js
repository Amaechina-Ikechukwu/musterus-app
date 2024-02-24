import {
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  Image,
  Text,
  SectionList,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Divider, Avatar} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {surprise_state, user_state} from '../../redux';
import {useNavigation} from '@react-navigation/native';
import {AppStatusBar} from '../../components/status-bar';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {BackIcon} from '../../../assets/icons/auth-icons';
import {LabelTexts} from '../components/texts';
import {Color} from '../../components/theme';

import Header from '../../messaging/components/header';

import {events} from '../oldapis/events';
import musterusfullmedia from '../../musterusfullmedia';

const {height, width} = Dimensions.get('window');
const Colors = Color();
function MuterCards({route, appState, disp_surprise}) {
  const {User, Profile} = appState;
  const navigation = useNavigation();
  const {friend} = route?.params;
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 7000); // 7 seconds

    return () => clearTimeout(timer);
  }, []);
  const [data, setData] = useState();
  const getEvents = async () => {
    const result = await events(User?.mykey, User?.mskl, friend.uid, 0);

    setData(result?.Cards);
  };
  useEffect(() => {
    getEvents();
  }, []);

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

        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            marginTop: 20,
            // backgroundColor: "red"
          }}>
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              // backgroundColor: "blue"
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
                // backgroundColor: "blue"
              }}>
              <BackIcon />
            </TouchableOpacity>
          </View>
          <View
            style={{
              // flex: 3,
              flexDirection: 'row',
              // backgroundColor: "blue"
            }}>
            <LabelTexts style={{marginLeft: 25}} text="Muster Cards" />
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <FlatList
              data={data}
              style={{flex: 1, height: '100%'}}
              contentContainerStyle={{alignItems: 'center'}}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3} // Set the number of columns to 3
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SelectCard', {
                      card: item,
                      friend: friend,
                    });
                  }}>
                  <Image
                    style={{
                      width: 100,
                      height: 150,
                      borderRadius: 10,
                      margin: 5,
                    }}
                    source={{uri: musterusfullmedia(item.thumbnail)}}
                  />
                  <LabelTexts style={{marginLeft: 25}} text={item.imagetitle} />
                </TouchableOpacity>
              )}
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
});
