import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  Switch,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {OutlinedInput} from '../../components/inputs';
import {Style} from '../../../assets/styles';
import * as ImagePicker from 'expo-image-picker';
import {Color} from '../../components/theme';
import {PrimaryButton} from '../../components/buttons/primary';
const Colors = Color();
const NewBannerUpload = ({User}) => {
  const {mykey, mskl} = User;
  const [bannerInfo, setBannerInfo] = useState({
    mykey: '',
    uid: '',
    upsection: '53',
    bannername: '',
    bannerurl: '',
    bannerlocation: 1, // Default to Muster Board
    agree: 0, // Default to Disagree
  });
  const [image, setImage] = useState(false);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleInputChange = (key, value) => {
    setBannerInfo({...bannerInfo, [key]: value});
  };
  const toggleSwitch = () => {
    setBannerInfo({...bannerInfo, agree: !bannerInfo.agree});
  };
  const form = () => {
    const formData = new FormData();
    const name = image.substring(image.lastIndexOf('/') + 1);

    formData.append('userfile', {
      uri: image, // Replace with the actual path of the image file
      type: `image.jpeg`, // Replace with the appropriate image type
      name: `image.adv`, // Replace with the desired filename
    });
    return formData;
  };
  const handleSubmit = async () => {
    if (bannerInfo.agree == 1) {
      try {
        const data = form();
        console.log(data._parts[0]);

        const url = `https://www.musterus.com/ws/advertisements/mybanners/newbannerupload?mykey=${mykey}&mskl=${mskl}&upsection=${53}&bannername=${
          bannerInfo.bannername
        }&bannerlocation=${bannerInfo.bannerlocation}&bannerurl=${
          bannerInfo.bannerurl
        }&agree=${bannerInfo.agree}`;

        const response = await fetch(url, {
          method: 'POST',
          body: data._parts,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const responseData = await response.json();

        Alert.alert('Form Submitted!', 'Banner upload logic here');
        return responseData;
      } catch (error) {
        throw error;
      }
    } else {
      Alert.alert('Cannot Submit', 'Please agree to the terms');
    }
  };

  const location = [
    {
      title: 'Muster Board',
      value: 1,
    },
    {title: 'Muster Point', value: 2},
    {title: 'Group Listing', value: 3},
    {title: 'Group Post Listing', value: 4},
    {title: 'Group Posts', value: 5},
  ];
  return (
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
        <TouchableOpacity onPress={pickImage} style={styles.circularButton}>
          {image ? (
            <Image src={{uri: image}} style={{width: '100%'}} />
          ) : (
            <Text style={styles.buttonText}>Choose Photo</Text>
          )}
        </TouchableOpacity>
      </View>
      <OutlinedInput
        style={{marginBottom: 0}}
        data={bannerInfo.bannername}
        setData={value => handleInputChange('bannername', value)}
        placeholder="Banner name"
      />
      <OutlinedInput
        style={{marginBottom: 0}}
        data={bannerInfo.bannerurl}
        setData={value => handleInputChange('bannerurl', value)}
        placeholder="Banner Url"
      />
      <View style={{gap: 10}}>
        <Text style={Style.Text}>Banner Location</Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 10,
          }}>
          {location.map(loc => (
            <TouchableOpacity
              key={loc.title}
              onPress={() =>
                setBannerInfo(prev => ({...prev, bannerlocation: loc.value}))
              }
              style={{
                padding: 5,
                borderRadius: 5,
                borderWidth: 1,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  loc.value !== bannerInfo.bannerlocation
                    ? 'transparent'
                    : Colors.primary,
                width: '100%',
              }}>
              <Text
                style={[
                  Style.Text,
                  {
                    color:
                      loc.value !== bannerInfo.bannerlocation
                        ? Colors.textColor
                        : Colors.light,
                  },
                ]}>
                {loc.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={Style.Text}>Do you understand terms and conditions?</Text>
        <Switch
          trackColor={{
            false: Colors.inactiveButton,
            true: Colors?.primary,
          }}
          thumbColor={bannerInfo.agree ? Colors.primary : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={bannerInfo.agree}
        />
      </View>
      <PrimaryButton
        title={'Place Order'}
        callBack={() => {
          handleSubmit();
        }}
      />
    </View>
  );
};

export default NewBannerUpload;
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
