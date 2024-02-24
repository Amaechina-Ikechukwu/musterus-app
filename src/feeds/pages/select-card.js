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
import Header from '../../messaging/components/header';
import {MusterCards, MusterCards2} from '../components/ustercards';
import {FlatList} from 'react-native';
import {holidaysImages} from '../controllers/Cards';
import musterusfullmedia from '../../musterusfullmedia';
import emptyimage from '../../emptyimage';
import {PrimaryButton} from '../../components/buttons/primary';
import {sendcard} from '../oldapis/sendCard';

const {height, width} = Dimensions.get('window');
const Colors = Color();
let ImgUrl =
  'https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/311838830_3341516792834673_1624830650213567335_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG2I4ezOTyJWd1Q6SaGyWtTt0TqlRk4Rf63ROqVGThF_hMhAEUxrZPmz-YfwDVqi9XSOwJeMBUHJjjW2mK1cXwG&_nc_ohc=tMcuz-iePZwAX-IlhsR&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AfAvDZURMf1osfZvCjNmFOAq3WF5xqNQrwbghpiwEBotoQ&oe=64D287F2';
function MuterCards({route, appState, disp_surprise}) {
  const User = appState.User;
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const {card, friend} = route?.params;
  const SendCard = async () => {
    try {
      const result = await sendcard(User?.mykey, User?.mskl);
    } catch {}
  };
  useEffect(() => {
    console.log(JSON.stringify(card, null, 2));
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
        <View style={{height: '100%', flex: 1, gap: 20}}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row-reverse',
              gap: 5,
            }}>
            <Text>{`Send ${friend.firstname} a card`} </Text>
            <Image
              style={{width: 50, height: 50, borderRadius: 1000}}
              source={{
                uri:
                  friend && friend?.avatar
                    ? musterusfullmedia(friend?.avatar.slice(1))
                    : emptyimage,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Image
              style={{width: 100, height: 100}}
              source={{
                uri:
                  friend && friend?.avatar
                    ? musterusfullmedia(card.filename)
                    : emptyimage,
              }}
            />
            <TextInput
              value={message}
              onChangeText={text => setMessage(text)}
              label={'Add a message'}
              style={{
                height: 100,
                width: '100%',
                backgroundColor: 'transparent',
              }}
            />
          </View>
          <View style={{display: 'flex', alignItems: 'center', width: '100%'}}>
            <PrimaryButton title={'Send Card'} style={{width: width * 0.8}} />
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
