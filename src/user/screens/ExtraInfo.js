import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CategorySelector from '../../notification/components/Countries';
import AnniversaryCategorySelector from '../compnents/AnniversaryCategories';
import DateTimePicker from '@react-native-community/datetimepicker';
import {OutlinedInput} from '../../components/inputs';
import {Style} from '../../../assets/styles';
import {PrimaryButton} from '../../components/buttons/primary';
import {editprofile} from '../apis/editprofile';
export default function ExtraInfo({User, Profile, navigation}) {
  const [profile, setProfile] = useState({
    firstname: Profile?.firstname,
    lastname: Profile?.lastname,
    username: Profile?.username,
    usergender: Profile?.usergender,
    birthdate: new Date(),
    profileintro: Profile?.profileintro,
    address: Profile?.address,
    city: Profile?.city,
    state: Profile?.state,
    zipcode: Profile?.zipcode,
    country: Profile?.country,
    relationship: 0,
    anniversary: Profile?.anniversary,
    inrelation: '',
    children: Profile?.children,
    nationality: Profile?.nationality,
    education: 0,
    institute: Profile?.institute,
    graduateyear: Profile?.graduateyear,
    wherework: Profile?.wherework,
    jobtitle: Profile?.jobtitle,
    scheduler: Profile?.scheduler,
    telegram: Profile?.telegram,
    viber: Profile?.viber,
    whatsapp: Profile?.whatsapp,
    skype: Profile?.skype,
    signal: Profile?.signal,
    facebook: Profile?.facebook,
    linkedin: Profile?.linkedin,
    xing: Profile?.xing,
    twitter: Profile?.twitter,
    youtube: Profile?.youtube,
    instagram: Profile?.instagram,
    pinterest: Profile?.pinterest,
    myintro: Profile?.myintro,
  });
  const placeholders = {
    firstname: 'Add Firstname',
    lastname: 'Lastname',
    username: 'Username',
    birthdate: 'Add date of birth',
    usergender: 'Male or Female',
    address: 'Enter Address (max 300 characters)',
    profileintro: 'Add bio',
    city: 'Enter City (max 100 characters)',
    state: 'Enter State (max 100 characters)',
    zipcode: 'Enter Zip Code (max 50 characters)',
    country: 'Enter Country (2-character abbreviation)',
    relationship: 'Select Relationship Status',
    anniversary: 'Enter Anniversary Date',
    inrelation: "Enter Partner's User ID",
    children: 'Enter Number of Children',
    nationality: 'Enter Nationality (max 50 characters)',
    education: 'Select Highest Education Level',
    institute: 'Enter Institute/School Name',
    graduateyear: 'Enter Graduation Year',
    wherework: 'Enter Workplace (max 300 characters)',
    jobtitle: 'Enter Job Title',
    scheduler: 'Enter Scheduler Link',
    telegram: 'Enter Telegram ID',
    viber: 'Enter Viber Number',
    whatsapp: 'Enter WhatsApp Number',
    skype: 'Enter Skype ID',
    signal: 'Enter Signal Messenger Number',
    facebook: 'Enter Public Facebook Profile Link',
    linkedin: 'Enter Public LinkedIn Profile Link',
    xing: 'Enter Public Xing Profile Link',
    twitter: 'Enter Public Twitter Page Link',
    youtube: 'Enter Public YouTube Channel Link',
    instagram: 'Enter Public Instagram Link',
    pinterest: 'Enter Public Pinterest Profile Link',
    mykey: 'Enter MyKey',
    myintro: 'Enter My Intro',
    // Add more placeholders for additional fields
  };
  const [select, setSelect] = useState({
    country: false,
    anniversary: false,
  });
  const [date, setDate] = useState(new Date());
  const chooseCountry = cat => {
    setProfile(prev => ({...prev, country: cat}));
  };
  const chooseAnniversary = cat => {
    setProfile(prev => ({...prev, anniversary: cat}));
  };
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Close the picker on iOS after selection
    setProfile({...data, birthdate: currentDate});
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  const formatDate = inputDate => {
    const year = inputDate.getFullYear();
    const month =
      inputDate.getMonth() + 1 < 10
        ? `0${inputDate.getMonth() + 1}`
        : inputDate.getMonth() + 1;
    const day =
      inputDate.getDate() < 10
        ? `0${inputDate.getDate()}`
        : inputDate.getDate();
    return `${year}-${month}-${day}`;
  };
  const handleInputChange = (field, value) => {
    setProfile({...profile, [field]: value});
  };
  const editProfile = async () => {
    try {
      await editprofile(User?.mykey, User.mskl, profile);
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Error updating profile',
        'Unfortunately, your profile cannot be updated at this time',
      );
    }
  };
  return (
    <View style={{height: '75%'}}>
      <ScrollView>
        <View style={{gap: 20, marginBottom: 60}}>
          {Object.keys(profile).map((prof, index) => {
            if (prof == 'country') {
              return select.country ? (
                <CategorySelector
                  onSelect={chooseCountry()}
                  onClose={() => setSelect({anniversary: !select.anniversary})}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setSelect({country: !select.country})}
                  style={{
                    width: '100%',
                    borderWidth: 1,
                    borderRadius: 10,
                    height: 50,
                    padding: 10,
                    justifyContent: 'center',
                    borderColor: 'gray',
                  }}>
                  <Text>{profile.country || 'Select a country'}</Text>
                </TouchableOpacity>
              );
            }
            if (prof == 'anniversary') {
              return select.anniversary ? (
                <AnniversaryCategorySelector
                  onSelect={chooseAnniversary()}
                  onClose={() => setSelect({anniversary: !select.anniversary})}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setSelect({anniversary: !select.anniversary})}
                  style={{
                    width: '100%',
                    borderWidth: 1,
                    borderRadius: 10,
                    height: 50,
                    padding: 10,
                    justifyContent: 'center',
                    borderColor: 'gray',
                  }}>
                  <Text>{profile.anniversary || prof}</Text>
                </TouchableOpacity>
              );
            }
            if (prof == 'birthdate') {
              return showDatePicker ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={profile.birthdate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              ) : (
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={showDatepicker}>
                  <Text style={[Style.Text]}>
                    {`Click to add your date of birth: `}
                  </Text>
                  <Text style={[Style.boldText]}>
                    {` ${formatDate(profile.birthdate)}`}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <OutlinedInput
                  data={profile[prof]}
                  key={placeholders[prof]}
                  style={{marginBottom: 0}}
                  value={profile[prof]}
                  setData={text => handleInputChange(prof, text)}
                  placeholder={placeholders[prof]}
                />
              );
            }
          })}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={{width: '100%'}}>
          <PrimaryButton
            title="Update"
            style={{width: '100%'}}
            callBack={() => {
              editProfile();
            }}
          />
        </View>
      </View>
    </View>
  );
}
