import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Style} from '../../../assets/styles';

const ProfileInformation = ({profileData, open, onClose}) => {
  const {
    maritalstatus,
    children,
    borncity,
    borncountry,
    livingaddress,
    livingcity,
    livingstate,
    livingzipcode,
    livingcountry,
    nationality,
    gender,
    birthdate,
    relationship,
    inrelation,
    anniversary,
    accounttype,
    passwordhint,
    hintanswer,
    userheaderintro,
    profileintro,
    education,
    edulocation,
    graduateyear,
    jobtitle,
    wherework,
    privateaccount,
    whereborncountry,
    whereborncity,
    skype,
    whatsapp,
    telegram,
    viber,
    signalnumber,
    lastloginip,
    usertimezone,
    reportedaccount,
    currentlocation,
    inrelationwith,
    facebook,
    instagram,
    linkedin,
    pinterest,
    youtube,
    xing,
    twitter,
    profilekey,
    scheduler,
    avatar,
    profilebg,
    publicurl,
    resetlink,
    speakinglanguages,
  } = profileData;

  return (
    <Modal transparent visible={open} onDismiss={onClose}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <View style={styles.container}>
          <ScrollView style={{height: '70%'}}>
            <View style={styles.section}>
              <Text style={Style.bold}>Personal Information</Text>
              <Text style={Style.Text}>Marital Status: {maritalstatus}</Text>
              <Text style={Style.Text}>Children: {children}</Text>
              <Text style={Style.Text}>Gender: {gender}</Text>
              <Text style={Style.Text}>Birthdate: {birthdate}</Text>
              {/* Other related personal information fields */}
            </View>

            <View style={styles.section}>
              <Text style={Style.bold}>Location Information</Text>
              <Text style={Style.Text}>Country of Birth: {borncountry}</Text>
              <Text style={Style.Text}>City of Birth: {borncity}</Text>
              <Text style={Style.Text}>Current Address: {livingaddress}</Text>
              <Text style={Style.Text}>City: {livingcity}</Text>
              <Text style={Style.Text}>State: {livingstate}</Text>
              <Text style={Style.Text}>Zip Code: {livingzipcode}</Text>
              {/* Other related location information fields */}
            </View>

            <View style={styles.section}>
              <Text style={Style.boldText}>Work & Education</Text>
              <Text style={Style.Text}>Education: {education}</Text>
              <Text style={Style.Text}>
                Location of Education: {edulocation}
              </Text>
              <Text style={Style.Text}>Graduate Year: {graduateyear}</Text>
              <Text style={Style.Text}>Job Title: {jobtitle}</Text>
              <Text style={Style.Text}>Where Work: {wherework}</Text>
              {/* Other related work and education fields */}
            </View>

            <View style={styles.section}>
              <Text style={Style.boldText}>Social Media</Text>
              <Text style={Style.Text}>Facebook: {facebook}</Text>
              <Text style={Style.Text}>Instagram: {instagram}</Text>
              <Text style={Style.Text}>LinkedIn: {linkedin}</Text>
              <Text style={Style.Text}>Pinterest: {pinterest}</Text>
              <Text style={Style.Text}>YouTube: {youtube}</Text>
              <Text style={Style.Text}>Xing: {xing}</Text>
              <Text style={Style.Text}>Twitter: {twitter}</Text>
              {/* Other related social media fields */}
            </View>

            <View style={styles.section}>
              <Text style={Style.boldText}>Communication</Text>
              <Text style={Style.Text}>Skype: {skype}</Text>
              <Text style={Style.Text}>WhatsApp: {whatsapp}</Text>
              <Text style={Style.Text}>Telegram: {telegram}</Text>
              <Text style={Style.Text}>Viber: {viber}</Text>
              <Text style={Style.Text}>Signal Number: {signalnumber}</Text>
              {/* Other related communication fields */}
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: 'black',
              height: 40,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '70%',
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});

export default ProfileInformation;
