import {StyleSheet, View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {setGroups, surprise_state, user_state} from '../../redux';
import {Color} from '../../components/theme';
import {Header, MessagingHeader} from '../components/header';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import {MyGroups} from '../apis/groups';
import * as ImagePicker from 'expo-image-picker';
import {OutlinedInput} from '../../components/inputs';
import {Alert} from 'react-native';
import {updategroup} from '../apis/updategroup';
import {Image} from 'react-native';
import {storage} from '../../../firebase';

const Colors = Color();

function EditGroup({navigation, appState, route, setgroups}) {
  const [loading, setLoading] = useState(false);
  const {User, Group} = appState;
  const [data, setData] = useState({
    name: Group?.data?.name,
    description: Group?.data?.description,
    photourl: Group?.data?.photourl,
  });
  const [image, setImage] = useState(null);

  const {groupid} = route.params;
  const getGroups = async () => {
    const result = await MyGroups(User.mykey);
    setData(result?.groups);
    setgroups(result?.groups);
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
        `groupPhotos/${groupid}/${image.split('/').pop()}`,
      );

      // Uploading image to Firebase Storage
      await uploadBytes(storageRef, blob); // Use uploadBytes method to upload the image blob

      const downloadURL = await getDownloadURL(storageRef); // Get the download URL

      setData({...data, photourl: downloadURL}); // Update group data with the downloadURL
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  const updateGroup = async () => {
    try {
      // Upload image before updating group data
      if (image) {
        await uploadImageToFirebase();
      }
      const {name, description, photourl} = data;
      const token = User?.mykey;
      // Update group data
      await updategroup(name, description, photourl, groupid, token);
      await getGroups();
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert('Error updating group');
    }
  };
  const STYLES = ['default', 'dark-content', 'light-content'];
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  // const updateGroup = async () => {
  //   try {
  //     // Renamed the function to updateUserGroup
  //     const {name, description, photourl} = data;
  //     const token = User?.mykey;
  //     // Assuming this is the function that updates the group data
  //     await updategroup(name, description, photourl, groupid, token);
  //     await getGroups();
  //     navigation.goBack(); // Changed from navigate(-1) to goBack()
  //   } catch (err) {
  //     console.log(err);
  //     Alert.alert('Error updating group');
  //   }
  // };
  const onInputChange = (name, value) => {
    setData({...data, [name]: value});
  };
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {}, [data]);
  return (
    <>
      <Header page="Group Message" />
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.light}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <ScrollView>
          <View
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                marginBottom: 80,
                marginTop: 100,
                // marginHorizontal: 15
                width: '100%',
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '80%',
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

                <OutlinedInput
                  data={data.name}
                  setData={value => onInputChange('name', value)}
                  placeholder="Enter new group name"
                />
                <OutlinedInput
                  data={data.description}
                  setData={value => onInputChange('description', value)}
                  placeholder="Enter your description"
                />
                <TouchableOpacity
                  android_ripple={{color: 'white'}}
                  onPress={() => updateGroup()}
                  style={[
                    {
                      backgroundColor: Colors.primary,
                      height: 53,
                      width: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 2,
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      marginTop: 20,
                    },
                  ]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      color: Colors.light,
                    }}>
                    Update Group
                  </Text>
                </TouchableOpacity>
              </View>
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
    disp_Login: payload => dispatch(user_state(payload)),
    disp_surprise: payload => dispatch(surprise_state(payload)),
    setgroups: payload => dispatch(setGroups(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGroup);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
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
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
});
