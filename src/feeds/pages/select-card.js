import {
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  Image,
  Text,
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
import {Header} from '../../messaging/components/header';
import {MusterCards, MusterCards2} from '../components/ustercards';
import {FlatList} from 'react-native';
import {holidaysImages} from '../controllers/Cards';

const {height, width} = Dimensions.get('window');
const Colors = Color();
let ImgUrl =
  'https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/311838830_3341516792834673_1624830650213567335_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG2I4ezOTyJWd1Q6SaGyWtTt0TqlRk4Rf63ROqVGThF_hMhAEUxrZPmz-YfwDVqi9XSOwJeMBUHJjjW2mK1cXwG&_nc_ohc=tMcuz-iePZwAX-IlhsR&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AfAvDZURMf1osfZvCjNmFOAq3WF5xqNQrwbghpiwEBotoQ&oe=64D287F2';
function MuterCards({route, appState, disp_surprise}) {
  const User = appState.User;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [data, setData] = useState('');
  const {selected} = route?.params;
  useEffect(() => {
    console.log('Account page');
  }, []);
  const selectedHoliday = holidaysImages.find(
    holiday => holiday.title === selected,
  );

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
        <View style={{height: '100%', flex: 1}}>
          <FlatList
            data={selectedHoliday ? selectedHoliday.data : []}
            style={{flex: 1, height: '100%'}}
            contentContainerStyle={{alignItems: 'center'}}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} // Set the number of columns to 3
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Sendto', {image: item});
                  // Handle image selection here
                }}>
                <Image
                  style={{
                    width: 130,
                    height: 160,
                    borderRadius: 20,
                    margin: 5, // Add some margin between images for spacing
                  }}
                  source={{uri: item}}
                />
              </TouchableOpacity>
            )}
            ListHeaderComponent={() => (
              <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>
                {selected}
              </Text>
            )}
          />
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
