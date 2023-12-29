import {
  View,
  Text,
  Modal,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {Color} from '../../components/theme';
import {Style} from '../../../assets/styles';
import {OutlinedInput} from '../../components/inputs';
import {FontAwesome} from '@expo/vector-icons';
import {imageupload} from '../apis/imageupload';

const {width, height} = Dimensions.get('window');
const Colors = Color();
export default function ImageUploadModal({
  modalVisible,
  mykey,
  mskl,
  uid,
  groupKey,
  onClose,
}) {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    caption: '',
    upsection: '0',
  });
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const uploadImage = async () => {
    if (!image) {
      Alert.alert(
        'Error Uploading Group Image',
        "Please ensure you've added necessary fields",
      );
    } else {
      try {
        const response = await imageupload(mykey, mskl, uid, data, image);

        onClose();
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Error Uploading Group image',
          'There seems to be an error uploading group image',
        );
      }
    }
  };

  return (
    <Modal
      onRequestClose={onClose}
      animationType="slide"
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
      transparent={true}
      visible={modalVisible}>
      <View
        onPress={onClose}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
          width: width,
        }}>
        <TouchableOpacity
          onPress={onClose}
          style={[
            {
              backgroundColor: Colors.lightgrey,

              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 2,
              borderRadius: 20,
              padding: 20,
              marginBottom: 20,
            },
          ]}>
          <FontAwesome name="close" />
        </TouchableOpacity>
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
          <View
            style={{gap: 20, alignItems: 'center', justifyContent: 'center'}}>
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
                  onPress={() => setData(prev => ({...prev, upsection: '0'}))}
                  style={{
                    width: width * 0.8,
                    padding: 20,
                    borderRadius: 20,
                    borderWidth: 1,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      data.upsection == '0' ? Colors.primary : 'transparent',
                  }}>
                  <Text
                    style={[
                      Style.Text,
                      {
                        color:
                          data.upsection == '0'
                            ? Colors.light
                            : Colors.textColor,
                      },
                    ]}>
                    Timeline
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setData(prev => ({...prev, upsection: '1'}))}
                  style={{
                    width: width * 0.8,
                    padding: 20,
                    borderRadius: 20,
                    borderWidth: 1,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      data.upsection == '1' ? Colors.primary : 'transparent',
                  }}>
                  <Text
                    style={[
                      Style.Text,
                      {
                        color:
                          data.upsection == '1' ? Colors.light : Colors.text,
                      },
                    ]}>
                    Profile Header Background
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setData(prev => ({...prev, upsection: '2'}))}
                  style={{
                    width: width * 0.8,
                    padding: 20,
                    borderRadius: 20,
                    borderWidth: 1,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      data.upsection == '2' ? Colors.primary : 'transparent',
                  }}>
                  <Text
                    style={[
                      Style.Text,
                      {
                        color:
                          data.upsection == '2' ? Colors.light : Colors.text,
                      },
                    ]}>
                    Avatar
                  </Text>
                </TouchableOpacity>
              </View>
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
              onPress={() => uploadImage()}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
});