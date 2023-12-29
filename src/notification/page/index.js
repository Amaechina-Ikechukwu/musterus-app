import {StyleSheet, View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {surprise_state, user_state} from '../../redux';
import {Divider, Avatar} from 'react-native-paper';
import {BottomTab} from '../../events/components/bottomTab';
import {Color} from '../../components/theme';
import Header from '../../messaging/components/header';
import {NameDisplayCard} from '../../components/name-display-card';
import {PeopleIcon} from '../../events/components/icons';
import {Style} from '../../../assets/styles';
import {BellIcon, FolowedIcon, Nodata} from '../components/icon';
import {LabelTexts} from '../../events/components/texts';
import NewBannerUpload from './UploadBanner';
import AddressAddition from './AdressAddition';
import * as Linking from 'expo-linking';
import {PrimaryButton} from '../../components/buttons/primary';
import AdBanners from '../components/AdBanners';
const Colors = Color();

function SignIn({navigation, appState}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {User} = appState;
  useEffect(() => {
    console.log(User);
  }, []);
  const link = `https://www.musterus.com/advertisements/order/?mykey=${User?.mykey}`;
  const STYLES = ['default', 'dark-content', 'light-content'];
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <BottomTab page="Notification" navigation={navigation} />
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.light}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />

        <Header page="Notification" navigation={navigation} />
        <View style={{alignItems: 'center', paddingHorizontal: 10}}>
          <View style={{marginTop: 100, height: '100%', width: '100%'}}>
            <AdBanners User={User} />
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
    disp_Login: payload => dispatch(user_state(payload)),
    disp_surprise: payload => dispatch(surprise_state(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});
