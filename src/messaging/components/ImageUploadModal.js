import {
  View,
  Text,
  Modal,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {Color} from '../../components/theme';
import {Style} from '../../../assets/styles';
import {OutlinedInput} from '../../components/inputs';
const {width, height} = Dimensions.get('window');
const Colors = Color();
export default function ImageUploadModal({
  modalVisible,
  mykey,
  mskl,
  uid,
  groupKey,
}) {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    caption: '',
    upsection: 'TYPE_GROUP_LOGO',
  });
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      console.log(result);
      setImage(result.uri);
    }
  };
  const uploadImage = async () => {
    const apiUrl = 'https://www.musterus.com/ws/groups/imageupload';

    const formData = new FormData();
    formData.append('mykey', mykey); // Replace userProfileKey with the profile key of the user
    formData.append('mskl', mskl); // Replace userToken with the logged-in token
    formData.append('uid', uid); // Replace userId with the user ID
    formData.append('group', groupKey); // Replace groupKey with the GroupKey
    formData.append('locatn', 'groups');
    formData.append('imagecaption', data.caption);
    formData.append('upsection', data.upsection); // Change this value as needed

    // Append the file to be uploaded
    formData.append('userfile', {
      uri: 'file://path/to/your/image.jpg', // Replace with the actual path of the image file
      type: 'image/jpeg', // Replace with the appropriate image type
      name: 'filename.jpg', // Replace with the desired filename
    });

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      console.log('Upload Response:', data);
      // Handle the response accordingly
    } catch (error) {
      console.error('Upload Error:', error);
      // Handle errors
    }
  };

  const onInputChange = (name, value) => {
    setData({...data, [name]: value});
  };

  return (
    <Modal
      animationType="slide"
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
      transparent={true}
      visible={modalVisible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
          width: width,
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.light,
            height: height * 0.8,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 20,
          }}>
          <View style={{gap: 20}}>
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
                    style={{width: '100%', height: 60}}
                  />
                ) : (
                  <Text style={styles.buttonText}>Choose Photo</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{gap: 10}}>
              <Text style={Style.Text}>Use the Image as</Text>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  gap: 20,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    setData(prev => ({...prev, upsection: 'TYPE_GROUP_LOGO'}))
                  }
                  style={{
                    width: width * 0.8,
                    padding: 20,
                    borderRadius: 20,
                    borderWidth: 1,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      data.upsection == 'TYPE_GROUP_LOGO'
                        ? Colors.primary
                        : 'transparent',
                  }}>
                  <Text
                    style={[
                      Style.Text,
                      {
                        color:
                          data.upsection == 'TYPE_GROUP_LOGO'
                            ? Colors.light
                            : Colors.textColor,
                      },
                    ]}>
                    Group Logo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setData(prev => ({...prev, upsection: 'TYPE_GROUP_BG'}))
                  }
                  style={{
                    width: width * 0.8,
                    padding: 20,
                    borderRadius: 20,
                    borderWidth: 1,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      data.upsection == 'TYPE_GROUP_BG'
                        ? Colors.primary
                        : 'transparent',
                  }}>
                  <Text
                    style={[
                      Style.Text,
                      {
                        color:
                          data.upsection == 'TYPE_GROUP_BG'
                            ? Colors.light
                            : Colors.text,
                      },
                    ]}>
                    Group Background
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setData(prev => ({...prev, upsection: 'TYPE_GROUP_HEADER'}))
                  }
                  style={{
                    width: width * 0.8,
                    padding: 20,
                    borderRadius: 20,
                    borderWidth: 1,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      data.upsection == 'TYPE_GROUP_HEADER'
                        ? Colors.primary
                        : 'transparent',
                  }}>
                  <Text
                    style={[
                      Style.Text,
                      {
                        color:
                          data.upsection == 'TYPE_GROUP_HEADER'
                            ? Colors.light
                            : Colors.text,
                      },
                    ]}>
                    Group Header
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <OutlinedInput
                style={{marginBottom: 0}}
                data={data.caption}
                setData={value => onInputChange('caption', value)}
                placeholder="Enter image caption"
              />
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              width: '100%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              android_ripple={{color: 'white'}}
              onPress={() => updateGroup()}
              style={[
                {
                  backgroundColor: Colors.primary,
                  height: 53,
                  width: width * 0.8,
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
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

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
