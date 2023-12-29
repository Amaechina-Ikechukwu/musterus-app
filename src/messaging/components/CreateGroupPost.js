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
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {Color} from '../../components/theme';
import {Style} from '../../../assets/styles';
import {OutlinedInput} from '../../components/inputs';
import {FontAwesome} from '@expo/vector-icons';
import axios from 'axios';
import {imageupload} from '../oldapis/groups/imageupload';
import {connect} from 'react-redux';
import emptyimage from '../../../emptyimage';
import {creategrouppost} from '../oldapis/groups/creategrouppost';
const {width, height} = Dimensions.get('window');
const Colors = Color();
function CreateGroupPost({appState, navigation}) {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: '',
    status: 'Save as draft',
    body: '',
  });
  const {User, Profile, Group} = appState;
  const uploadPost = async () => {
    if (data.body.length == 0 || data.title.length == 0) {
      Alert.alert(
        'Error Publishing Post',
        "Please ensure you've added necessary fields",
      );
    } else {
      try {
        const response = await creategrouppost(
          User?.mykey,
          User?.mskl,
          Profile?.uid,
          Group?.groupkey,
          data,
          image,
        );

        navigation.goBack();
      } catch (error) {
        Alert.alert(
          'Error Uploading Group Post',
          'There seems to be an error publishing your post',
        );
      }
    }
  };

  const onInputChange = (name, value) => {
    setData({...data, [name]: value});
  };

  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
          width: width,
          height: height,
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.light,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 20,
          }}>
          <View
            style={{
              gap: 20,
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: '100%',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
              }}>
              <Image
                src={'https://www.musterus.com' + Profile.avatar || emptyimage}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  backgroundColor: Colors.lightgrey,
                }}
              />
              <Text style={[styles.author, Style.boldText]}>
                {Profile.firstname + ' ' + Profile.lastname}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: '50%',
                gap: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <OutlinedInput
                style={{marginBottom: 0, width: width * 0.8}}
                data={data.title}
                setData={value => onInputChange('title', value)}
                placeholder="Post Title"
              />

              <OutlinedInput
                style={{
                  marginBottom: 0,
                  width: width * 0.8,
                  height: height * 0.2,
                }}
                data={data.body}
                setData={value => onInputChange('body', value)}
                placeholder="Enter post message"
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  gap: 20,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    setData(prev => ({...prev, status: 'Save as draft'}))
                  }
                  style={{
                    minWidth: 150,
                    padding: 20,
                    borderRadius: 20,
                    borderWidth: 1,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      data.status == 'Save as draft'
                        ? Colors.primary
                        : 'transparent',
                  }}>
                  <Text
                    style={[
                      Style.Text,
                      {
                        color:
                          data.status == 'Save as draft'
                            ? Colors.light
                            : Colors.textColor,
                      },
                    ]}>
                    Save As Draft
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setData(prev => ({...prev, status: 'Publish'}))
                  }
                  style={{
                    minWidth: 150,
                    padding: 20,
                    borderRadius: 20,
                    borderWidth: 1,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      data.status == 'Publish' ? Colors.primary : 'transparent',
                  }}>
                  <Text
                    style={[
                      Style.Text,
                      {
                        color:
                          data.status == 'Publish' ? Colors.light : Colors.text,
                      },
                    ]}>
                    Publish
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
              onPress={() => uploadPost()}
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
                Push Post To Group
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
  author: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
const mapStateToProps = state => {
  return {
    appState: state.user,
  };
};
const mapDispatchToProps = (dispatch, encoded) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupPost);
