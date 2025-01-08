import React, { useEffect, useState } from "react";
import {
  Linking,
  Modal,
  View as PlainView,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Text, View } from "../Themed";
import { UserAvatar } from "@/constants/UserAvatar";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import { api } from "@/constants/shortened";
import ProfileInfoHeaders from "./ProfileInfoHeaders";
import { router, useNavigation } from "expo-router";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { mwidth } from "@/constants/ScreenDimensions";
import { StyleSheet } from "react-native";
import { UserProfile } from "@/constants/types";
import AnimatedLoading from "@/constants/AnimatedLoading";
const ListOfInfo = ({ profile }: { profile: UserProfile }) => {
  return (
    <ScrollView>
      <Text style={styles.heading}>Profile Information</Text>
      {/* Avatar */}
      {profile.avatar && (
        <UserAvatar
          name=""
          size={100}
          imageUrl={
            api && profile?.avatar
              ? `${api.slice(0, -3)}${profile.avatar.slice(1)}`
              : "" // Provide an empty string as a fallback if `api` or `profile.avatar` is missing
          }
        />
      )}
      <Text style={styles.info}>
        Name: {profile.firstname} {profile.lastname}
      </Text>
      <Text style={styles.info}>Job Title: {profile.jobtitle}</Text>
      <Text style={styles.info}>Place of Work: {profile.wherework}</Text>
      <Text style={styles.info}>Email: {profile.registeremail}</Text>
      <Text style={styles.info}>Living Address: {profile.livingaddress}</Text>
      <Text style={styles.info}>
        City: {profile.livingcity}, State: {profile.livingstate}, Zip:{" "}
        {profile.livingzipcode}
      </Text>
      <Text style={styles.info}>
        Country: {profile.livingcountry || "Not Specified"}
      </Text>
      <Text style={styles.info}>Birthdate: {profile.birthdate}</Text>
      <Text style={styles.info}>Anniversary: {profile.anniversary}</Text>
      <Text style={styles.info}>
        Education: {profile.education} at {profile.edulocation}
      </Text>
      <Text style={styles.info}>Graduation Year: {profile.graduateyear}</Text>

      {profile.userheaderintro && (
        <Text style={styles.info}>Header Intro: {profile.userheaderintro}</Text>
      )}
      {profile.profileintro && (
        <Text style={styles.info}>Profile Intro: {profile.profileintro}</Text>
      )}

      {/* Social Links */}
      <Text style={styles.heading}>Social Links</Text>
      {profile.facebook && (
        <TouchableOpacity onPress={() => Linking.openURL(profile.facebook)}>
          <Text style={styles.link}>Facebook</Text>
        </TouchableOpacity>
      )}
      {profile.instagram && (
        <TouchableOpacity onPress={() => Linking.openURL(profile.instagram)}>
          <Text style={styles.link}>Instagram</Text>
        </TouchableOpacity>
      )}
      {profile.linkedin && (
        <TouchableOpacity onPress={() => Linking.openURL(profile.linkedin)}>
          <Text style={styles.link}>LinkedIn</Text>
        </TouchableOpacity>
      )}
      {profile.twitter && (
        <TouchableOpacity onPress={() => Linking.openURL(profile.twitter)}>
          <Text style={styles.link}>Twitter</Text>
        </TouchableOpacity>
      )}
      {profile.youtube && (
        <TouchableOpacity onPress={() => Linking.openURL(profile.youtube)}>
          <Text style={styles.link}>YouTube</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
export default function ProfileHeadingInfo() {
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? "light";
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => router.push(`/settings`)}>
          <EvilIcons name="gear" size={28} color={Colors[colorScheme].text} />
        </TouchableOpacity>
        // <DrawerToggleButton />
      ),
    });
  }, [navigation]);
  if (!profile) {
    return (
      <View>
        <AnimatedLoading />
      </View>
    );
  }
  return (
    <View style={{ alignItems: "center" }}>
      <UserAvatar
        size={300}
        imageUrl={
          api && profile?.avatar
            ? `${api.slice(0, -3)}${profile.avatar.slice(1)}`
            : "" // Provide an empty string as a fallback if `api` or `profile.avatar` is missing
        }
        name={profile?.firstname || "User"} // Provide a fallback name if `profile.firstname` is missing
      />
      <PlainView>
        <Text style={{ fontWeight: 700, fontSize: 30, textAlign: "center" }}>
          {profile?.firstname} {profile?.lastname}
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ opacity: 0.7, alignItems: "center", padding: 10 }}
        >
          <Text>Click To See More</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: Colors[colorScheme].darkTint },
              ]}
            >
              <PlainView style={{ alignItems: "flex-end" }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <AntDesign
                    name="close"
                    size={24}
                    color={Colors[colorScheme].text}
                  />
                </TouchableOpacity>
              </PlainView>
              <ListOfInfo profile={profile} />
            </View>
          </View>
        </Modal>
      </PlainView>
      {/* <ProfileInfoHeaders /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: mwidth,
  },
  button: {
    borderBottomWidth: 1,
    padding: 20,
    width: mwidth,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: mwidth * 0.8,
    padding: 20,

    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  okButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    color: "blue",
    marginVertical: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
});
