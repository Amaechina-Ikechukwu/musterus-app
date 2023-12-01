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

import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import {usersfullprofile} from '../../user/apis/profile';
import {storage} from '../../../firebase';
import {updateprofile} from '../../user/apis/editprofile';

const Colors = Color();

function AddProfilePicture({route, appState, setmyprofile}) {
  const {User, Profile} = appState;
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    firstname: Profile?.user?.firstname,
    lastname: Profile?.user?.lastname,
    username: Profile?.user?.username,
    bio: Profile?.user?.bio,
    photourl: Profile?.user?.photourl,
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const inputFields = [
    {name: 'firstname', label: 'Firstname'},
    {name: 'lastname', label: 'Lastname'},
    {name: 'username', label: 'Username'},
    {name: 'bio', label: 'Bio'},
    // Add more input field configurations as needed
  ];
  const getProfile = async () => {
    const result = await usersfullprofile(User?.mykey);

    setmyprofile(result);
  };
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Function to upload image to Firebase Storage

  const uploadImageToFirebase = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const storageRef = ref(
        storage,
        `profilephotos/${User?.mykey}/${image.split('/').pop()}`,
      );

      // Uploading image to Firebase Storage
      await uploadBytes(storageRef, blob); // Use uploadBytes method to upload the image blob

      const downloadURL = await getDownloadURL(storageRef); // Get the download URL
      setFormData({
        ...formData,
        photourl: downloadURL,
      });
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };
  useEffect(() => {}, [formData.photourl]);
  const editProfile = async () => {
    try {
      let imageUrl = ''; // Renamed to avoid conflict with url from uploadImageToFirebase
      if (image) {
        imageUrl = await uploadImageToFirebase(); // Assigning the result to imageUrl
      }

      const {firstname, lastname, username, bio} = formData;

      await updateprofile(
        User?.mykey,
        firstname,
        lastname,
        username,
        bio,
        imageUrl, // Pass imageUrl instead of url
      ).then(async () => {
        Alert.alert('Add Profile Pciture', 'Profile picture has been added');
        await getProfile();
        navigation.navigate('Follow-Users');
      });
    } catch (err) {
      Alert.alert(
        'Error updating profile',
        'Unfortunately, your profile cannot be updated at this time',
      );
    }
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

        <ScrollView>
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
              <LabelTexts
                style={{marginLeft: 15}}
                text="Add Your Profile Picture"
              />
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
              <TouchableOpacity
                onPress={pickImage}
                style={styles.circularButton}>
                {image ? (
                  <Image
                    source={{uri: image || data.photourl}}
                    style={styles.circularImage}
                  />
                ) : (
                  <Text style={styles.buttonText}>Choose Photo</Text>
                )}
              </TouchableOpacity>
            </View>

            <View
              style={{
                // backgroundColor: "red",
                // height: 20
                width: '100%',
                marginTop: 70,
              }}>
              <PrimaryButton
                title="Add Photo"
                style={{width: '100%'}}
                callBack={() => {
                  editProfile();
                }}
              />
            </View>
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProfilePicture);

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
