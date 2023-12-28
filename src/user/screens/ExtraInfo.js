import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CategorySelector from '../../notification/components/Countries';
import AnniversaryCategorySelector from '../compnents/AnniversaryCategories';

export default function ExtraInfo() {
  const [profile, setProfile] = useState({
    profileintro: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    relationship: 0,
    anniversary: '',
    inrelation: '',
    children: '',
    nationality: '',
    education: 0,
    institute: '',
    graduateYear: '',
    whereWork: '',
    jobTitle: '',
    scheduler: '',
    telegram: '',
    viber: '',
    whatsapp: '',
    skype: '',
    signal: '',
    facebook: '',
    linkedin: '',
    xing: '',
    twitter: '',
    youtube: '',
    instagram: '',
    pinterest: '',
    mykey: '',
    myintro: '',
  });
  const placeholders = {
    address: 'Enter Address (max 300 characters)',
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
  const chooseCountry = cat => {
    setProfile(prev => ({...prev, country: cat}));
  };
  const chooseAnniversary = cat => {
    setProfile(prev => ({...prev, anniversary: cat}));
  };
  return (
    <View>
      <SafeAreaView>
        {Object.keys(profile).map((prof, index) => {
          if (prof == 'country') {
            select.country ? (
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
            select.anniversary ? (
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
          <OutlinedInput
            style={{marginBottom: 0}}
            value={profile[prof]}
            onChangeText={text => handleInputChange(prof, text)}
            placeholder={placeholders[prof]}
          />;
        })}
      </SafeAreaView>
    </View>
  );
}
