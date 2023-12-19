import {
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  Image,
  Text,
  SectionList,
  FlatList,
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
import {OutlinedInput} from '../../components/inputs';
import {FeedHeader} from '../components/feed-header';
import {Style} from '../../../assets/styles';
import {NameDisplayCard} from '../../components/name-display-card';
import Header from '../../messaging/components/header';
import {MusterCards, MusterCards2} from '../components/ustercards';
import {holidaysImages} from '../controllers/Cards';

const {height, width} = Dimensions.get('window');
const Colors = Color();
function MuterCards({route, appState, disp_surprise}) {
  const User = appState.User;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [data, setData] = useState('');
  useEffect(() => {}, []);

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
            {holidaysImages.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('SelectCard', {
                    selected: image.title,
                  });
                  // Handle image selection here
                }}>
                <Image
                  style={{
                    width: 100,
                    height: 150,
                    borderRadius: 10,
                    margin: 5,
                  }}
                  source={{uri: image.data[0]}}
                />
                <LabelTexts style={{marginLeft: 25}} text={image.title} />
              </TouchableOpacity>
            ))}
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
