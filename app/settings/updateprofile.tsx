import { mwidth } from "@/constants/ScreenDimensions";
import { api, educationLevel, relationships } from "@/constants/shortened";
import { useNotification } from "@/contexts/NotificationContext";
import { MStore } from "@/mstore";
import Dropdown from "@/UIComponents/DropDown";
import MButton from "@/UIComponents/MButton";
import MInput from "@/UIComponents/MInput";
import axios from "axios";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useShallow } from "zustand/react/shallow";

const ProfileUpdate: React.FC = () => {
  const [profile, updateProfile] = MStore(
    useShallow((state) => [state.profile, state.updateProfile])
  );
  const [countryList, setCountryList] = useState([]);
  // Initialize state with values from `profile`, falling back to empty strings where needed
  const [firstname, setFirstname] = useState(profile?.firstname || "");
  const [lastname, setLastname] = useState(profile?.lastname || "");
  const [birthdate, setBirthdate] = useState(profile?.birthdate || "");
  const [usergender, setUsergender] = useState(profile?.gender || "");
  const [profileintro, setProfileintro] = useState(profile?.profileintro || "");
  const [address, setAddress] = useState(profile?.livingaddress || "");
  const [city, setCity] = useState(profile?.livingcity || "");
  const [state, setState] = useState(profile?.livingstate || "");
  const [zipcode, setZipcode] = useState(profile?.livingzipcode || "");
  const [country, setCountry] = useState(profile?.livingcountry || "");
  const [relationship, setRelationship] = useState(profile?.relationship || 0);
  const [anniversary, setAnniversary] = useState(profile?.anniversary || "");
  const [children, setChildren] = useState(profile?.children || "");
  const [nationality, setNationality] = useState(profile?.nationality || "");
  const [education, setEducation] = useState(profile?.education || 0);
  const [institute, setInstitute] = useState(profile?.edulocation || "");
  const [graduateyear, setGraduateyear] = useState(profile?.graduateyear || "");
  const [wherework, setWherework] = useState(profile?.wherework || "");
  const [jobtitle, setJobtitle] = useState(profile?.jobtitle || "");
  const [scheduler, setScheduler] = useState(profile?.scheduler || "");
  const [telegram, setTelegram] = useState(profile?.telegram || "");
  const [viber, setViber] = useState(profile?.viber || "");
  const [whatsapp, setWhatsapp] = useState(profile?.whatsapp || "");
  const [skype, setSkype] = useState(profile?.skype || "");
  const [signal, setSignal] = useState(profile?.signalnumber || "");
  const [facebook, setFacebook] = useState(profile?.facebook || "");
  const [linkedin, setLinkedin] = useState(profile?.linkedin || "");
  const [xing, setXing] = useState(profile?.xing || "");
  const [twitter, setTwitter] = useState(profile?.twitter || "");
  const [youtube, setYoutube] = useState(profile?.youtube || "");
  const [instagram, setInstagram] = useState(profile?.instagram || "");
  const [pinterest, setPinterest] = useState(profile?.pinterest || "");
  const [myintro, setMyintro] = useState(profile?.userheaderintro || "");

  const navigation = useNavigation();
  const { showNotification } = useNotification();
  const updateUserProfile = async () => {
    showNotification("Updating profile");
    const payload = {
      firstname,
      lastname,
      birthdate,
      usergender,
      profileintro,
      address,
      city,
      state,
      zipcode,
      country,
      relationship,
      anniversary,
      children,
      nationality,
      education,
      institute,
      graduateyear,
      wherework,
      jobtitle,
      scheduler,
      telegram,
      viber,
      whatsapp,
      skype,
      signal,
      facebook,
      linkedin,
      xing,
      twitter,
      youtube,
      instagram,
      pinterest,
      myintro,
    };

    try {
      const response = await axios.post(
        "https://www.musterus.com/ws/myprofile/update",
        null, // Since the data is in query parameters
        {
          params: payload,
        }
      );
      showNotification("Profile updated successfully");
      getUserProfile();
    } catch (error) {
      showNotification("Error updating profile");
    }
  };
  async function getUserProfile() {
    try {
      const response = await axios.get(`${api}/home`, {
        params: { mskl: profile?.mskl, mykey: profile?.profilekey },
      });
      if (response.data) {
        updateProfile(response.data.MyProfile);
        router.back();
      } else {
        router.push("/");
      }
    } catch (error) {
      router.push("/");
    }
  }
  const fetchCountryList = async () => {
    try {
      const url = `${api}/myprofile/edit?mykey=${profile?.profilekey}&mskl=${profile?.mskl}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      const transformedCountryData = data.Countries.map((country: any) => ({
        label: country.countryname, // Display the country's name
        value: country.abbr, // Use the abbreviation as the unique value
      }));
      setCountryList(transformedCountryData);
    } catch (error) {
    } finally {
    }
  };
  useEffect(() => {
    fetchCountryList();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerTitle: "Update Profile",
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MInput
        label="First Name"
        value={firstname}
        placeholder="Enter your first name"
        onChange={setFirstname}
      />
      <MInput
        label="Last Name"
        value={lastname}
        placeholder="Enter your last name"
        onChange={setLastname}
      />
      <MInput
        label="Birthdate"
        value={birthdate}
        placeholder="YYYY-MM-DD"
        onChange={setBirthdate}
      />
      <Dropdown
        label="Gender"
        data={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
        selectedValue={usergender}
        onValueChange={setUsergender}
      />

      <MInput
        label="Profile Introduction"
        value={profileintro}
        placeholder="Tell us about yourself"
        onChange={setProfileintro}
      />
      <MInput
        label="My Introduction"
        value={myintro}
        multiline
        placeholder="Enter your introduction"
        onChange={setMyintro}
      />
      <MInput
        label="Address"
        value={address}
        placeholder="Enter your address"
        onChange={setAddress}
      />
      <MInput
        label="City"
        value={city}
        placeholder="Enter your city"
        onChange={setCity}
      />
      <MInput
        label="State"
        value={state}
        placeholder="Enter your state"
        onChange={setState}
      />
      <MInput
        label="Zip Code"
        value={zipcode}
        placeholder="Enter your zip code"
        onChange={setZipcode}
      />
      {countryList.length > 1 && (
        <Dropdown
          label="Country"
          data={countryList}
          selectedValue={country}
          onValueChange={setCountry}
        />
      )}
      <Dropdown
        label="Relationship Status"
        data={relationships}
        selectedValue={relationship}
        onValueChange={(value) => setRelationship(value)}
      />

      <MInput
        label="Anniversary (Partner ID)"
        value={anniversary}
        placeholder="Enter your anniversary partner ID"
        onChange={setAnniversary}
      />
      <MInput
        label="Children"
        value={children}
        placeholder="Enter number of children"
        onChange={setChildren}
      />
      <MInput
        label="Nationality"
        value={nationality}
        placeholder="Enter nationality"
        onChange={setNationality}
      />

      <Dropdown
        label="Education Level"
        data={educationLevel}
        selectedValue={education}
        onValueChange={setEducation}
      />
      <MInput
        label="Institute"
        value={institute}
        placeholder="Enter your institute"
        onChange={setInstitute}
      />
      <MInput
        label="Graduate Year"
        value={graduateyear}
        placeholder="Enter year of graduation"
        onChange={setGraduateyear}
      />
      <MInput
        label="Where You Work"
        value={wherework}
        placeholder="Enter your workplace"
        onChange={setWherework}
      />
      <MInput
        label="Job Title"
        value={jobtitle}
        placeholder="Enter your job title"
        onChange={setJobtitle}
      />
      <MInput
        label="Scheduler"
        value={scheduler}
        placeholder="Enter scheduler"
        onChange={setScheduler}
      />

      {/* Contact Information */}
      <MInput
        label="Telegram"
        value={telegram}
        placeholder="Enter Telegram ID"
        onChange={setTelegram}
      />
      <MInput
        label="Viber"
        value={viber}
        placeholder="Enter Viber Number"
        onChange={setViber}
      />
      <MInput
        label="WhatsApp"
        value={whatsapp}
        placeholder="Enter WhatsApp number"
        onChange={setWhatsapp}
      />
      <MInput
        label="Skype"
        value={skype}
        placeholder="Enter Skype ID"
        onChange={setSkype}
      />
      <MInput
        label="Signal"
        value={signal}
        placeholder="Enter Signal Number"
        onChange={setSignal}
      />

      {/* Social Media Links */}
      <MInput
        label="Facebook"
        value={facebook}
        placeholder="Enter Facebook Profile Link"
        onChange={setFacebook}
      />
      <MInput
        label="LinkedIn"
        value={linkedin}
        placeholder="Enter LinkedIn Profile Link"
        onChange={setLinkedin}
      />
      <MInput
        label="Xing"
        value={xing}
        placeholder="Enter Xing Profile Link"
        onChange={setXing}
      />
      <MInput
        label="Twitter"
        value={twitter}
        placeholder="Enter Twitter Page Link"
        onChange={setTwitter}
      />
      <MInput
        label="YouTube"
        value={youtube}
        placeholder="Enter YouTube Channel Link"
        onChange={setYoutube}
      />
      <MInput
        label="Instagram"
        value={instagram}
        placeholder="Enter Instagram Account Link"
        onChange={setInstagram}
      />
      <MInput
        label="Pinterest"
        value={pinterest}
        placeholder="Enter Pinterest Profile Link"
        onChange={setPinterest}
      />

      <MButton
        title="Update Profile"
        style={{ width: mwidth * 0.9 }}
        onPress={updateUserProfile}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ProfileUpdate;
