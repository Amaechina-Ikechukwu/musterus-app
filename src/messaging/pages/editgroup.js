import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Switch,
  Dimensions,
} from 'react-native';
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
import {Style} from '../../../assets/styles';
import {groupupdate} from '../oldapis/groups/groupupdate';
import ImageUploadModal from '../components/ImageUploadModal';
import {groupcreate} from '../oldapis/groups/creategroup';
import CategorySelector from '../components/GroupCategories';
const {width} = Dimensions.get('window');
const Colors = Color();

function EditGroup({navigation, appState, route, setgroups}) {
  const [select, setSelect] = useState(false);
  const {User, Group, Profile} = appState;
  const [data, setData] = useState({
    name: Group?.groupname,
    description: Group?.groupintro,
    photourl: 'https://www.musterus.com' + Group?.photourl,
    grouppolicy: Group?.grouppolicy,
    category: {catname: Group?.catname, gcatrow: Group?.groupcategory},
    website: Group?.website,
    groupstatus: Group?.groupstatus,
    moderated: Group?.moderated,
  });
  const [image, setImage] = useState(false);

  const {groupid} = route.params;
  const getGroups = async () => {
    const result = await MyGroups(User.mykey);
    setData(result?.groups);
    setgroups(result?.groups);
  };
  const pickImage = async () => {
    setImage(!image);
  };

  // Function to upload image to Firebase Storage

  const updateGroup = async () => {
    try {
      // Upload image before updating group data
      let photo;
      if (image) {
        photo = await uploadImageToFirebase();
      }
      const {
        name,
        category,
        moderated,
        groupstatus,
        description,
        grouppolicy,
        website,
      } = data;
      const {mykey, mskl} = User;
      // Update group data
      const result = await groupcreate(
        mykey,
        mskl,
        Profile?.uid,
        groupid,
        name,
        category.gcatrow,
        moderated,
        groupstatus,
        description,
        grouppolicy,
        website,
      );

      // await getGroups();
      navigation.goBack();
    } catch (err) {
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

  const onInputChange = (name, value) => {
    setData({...data, [name]: value});
  };
  const toggleSwitch = () =>
    setData(prev => ({...prev, moderated: !data.moderated}));
  const chooseCategory = cat => {
    setData({...data, category: cat});
  };
  useEffect(() => {}, []);
  return (
    <>
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
                  gap: 20,
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
                      <View />
                    ) : (
                      <Text style={styles.buttonText}>Choose Photo</Text>
                    )}
                  </TouchableOpacity>
                </View>

                <OutlinedInput
                  style={{marginBottom: 0}}
                  data={data.name}
                  setData={value => onInputChange('name', value)}
                  placeholder="Enter new group name"
                />
                <OutlinedInput
                  style={{marginBottom: 0}}
                  data={data.description}
                  setData={value => onInputChange('description', value)}
                  placeholder="Enter your description"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={Style.Text}>Will this group be moderated?</Text>
                  <Switch
                    trackColor={{
                      false: Colors.inactiveButton,
                      true: Colors?.primary,
                    }}
                    thumbColor={data.moderated ? Colors.primary : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={data.moderated}
                  />
                </View>
                <View style={{gap: 10}}>
                  <Text style={Style.Text}>
                    What type of group will this be
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        setData(prev => ({...prev, groupstatus: 0}))
                      }
                      style={{
                        padding: 20,
                        borderRadius: 20,
                        borderWidth: 1,
                        height: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: data.groupstatus
                          ? 'transparent'
                          : Colors.primary,
                      }}>
                      <Text
                        style={[
                          Style.Text,
                          {
                            color: data.groupstatus
                              ? Colors.textColor
                              : Colors.light,
                          },
                        ]}>
                        Public Group
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        setData(prev => ({...prev, groupstatus: 1}))
                      }
                      style={{
                        padding: 20,
                        borderRadius: 20,
                        borderWidth: 1,
                        height: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: data.groupstatus
                          ? Colors.primary
                          : 'transparent',
                      }}>
                      <Text
                        style={[
                          Style.Text,
                          {
                            color: data.groupstatus
                              ? Colors.light
                              : Colors.text,
                          },
                        ]}>
                        Private Group
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setSelect(!select)}
                  style={{
                    width: '100%',
                    borderWidth: 1,
                    borderRadius: 10,
                    height: 50,
                    padding: 10,
                    justifyContent: 'center',
                    borderColor: 'gray',
                  }}>
                  <Text>{data.category.catname || Group?.catname}</Text>
                </TouchableOpacity>
                {select && (
                  <View style={{position: 'absolute'}}>
                    <CategorySelector
                      onSelect={chooseCategory}
                      onClose={() => setSelect(!select)}
                    />
                  </View>
                )}

                <OutlinedInput
                  style={{marginBottom: 0}}
                  data={data.website}
                  setData={value => onInputChange('website', value)}
                  placeholder="Enter your group website"
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
              Update Group
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ImageUploadModal
        modalVisible={image}
        mykey={User?.mykey}
        mskl={User?.mskl}
        uid={Profile?.uid}
        groupKey={Group?.groupkey}
        onClose={() => setImage(false)}
      />
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
