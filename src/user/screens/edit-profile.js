import {
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  Image,
  Text,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {Color} from '../../components/theme';
import {connect} from 'react-redux';
import {setMyProfile, surprise_state, user_state} from '../../redux';
import {useNavigation} from '@react-navigation/native';
import {AppStatusBar} from '../../components/status-bar';
import {HeaderComponent} from '../../components/header';
import {BackIcon} from '../../../assets/icons/auth-icons';
import {LabelTexts} from '../../events/components/texts';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {Style} from '../../../assets/styles';
import {PrimaryButton} from '../../components/buttons/primary';
import {FeedCard} from '../../events/components/feed-card';
import {ThreeDots} from '../../events/components/icons';
import {OutlinedInput} from '../../components/inputs';
import {editprofile, updateprofile} from '../apis/editprofile';
import {usersfullprofile} from '../apis/profile';
import {storage} from '../../../firebase';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import ExtraInfo from './ExtraInfo';
import ImageUploadModal from '../compnents/ImageUploadModal';
const TextArea = ({data, setData, name, key, label}) => {
  const color = Color();
  const handleTextChange = text => {
    setData(name, text);
  };
  return (
    <TextInput
      value={data}
      key={key}
      label={label}
      // placeholder={data}
      outlineColor="transparent"
      activeUnderlineColor="transparent"
      underlineColor="transparent"
      onChangeText={value => handleTextChange(value)}
      style={{
        width: '100%',
        backgroundColor: 'transparent',
        borderColor: color.primary,
        borderRadius: 15,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        borderWidth: 1,
        // Remove the default focus color
        onFocus: () => ({borderColor: 'transparent'}),
      }}
    />
  );
};
const Colors = Color();

function Profile({route, appState, setmyprofile}) {
  const {User, Profile} = appState;
  const navigation = useNavigation();
  const [image, setImage] = useState(false);

  const pickImage = async () => {
    setImage(!image);
  };

  const emptyimage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  return (
    <>
      <HeaderComponent page="Profile" />
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
            // backgroundColor: "red"
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              // backgroundColor: "blue"
            }}>
            <BackIcon />
            <LabelTexts style={{marginLeft: 15}} text="Edit Profile" />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              // backgroundColor: "blue",
              justifyContent: 'flex-end',
            }}></View>
        </View>

        <View
          style={{
            // backgroundColor: "red",
            marginTop: 10,
            // alignItems: "center",
            padding: 15,
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <TouchableOpacity onPress={pickImage} style={styles.circularButton}>
              {image ? (
                <ImageUploadModal
                  onClose={pickImage}
                  modalVisible={image}
                  uid={Profile?.uid}
                  mykey={User?.mykey}
                  mskl={User?.mskl}
                />
              ) : (
                <Text style={styles.buttonText}>Choose Photo</Text>
              )}
            </TouchableOpacity>
          </View>
          <ExtraInfo User={User} Profile={Profile} navigation={navigation} />
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
    setmyprofile: userData => dispatch(setMyProfile(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

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
  circularButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circularImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
