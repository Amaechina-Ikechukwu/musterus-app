import {
  Linking,
  Modal,
  View as PlainView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import { api } from "@/constants/shortened";
import { useNotification } from "@/contexts/NotificationContext";
import { Text, View } from "@/components/Themed";
import { mwidth } from "@/constants/ScreenDimensions";
import { CommonUserInfo, UserProfile } from "@/constants/types";
import { TouchableOpacity } from "react-native";
import { UserAvatar } from "@/constants/UserAvatar";
import { ScrollView } from "react-native-gesture-handler";
import AnimatedLoading from "@/constants/AnimatedLoading";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

export default function index() {
  const { user } = useLocalSearchParams();
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const navigation = useNavigation();
  const [friendsProfile, setFriendsProfile] = useState<UserProfile>();
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme() ?? "light";
  const { showNotification } = useNotification();
  const fetchProfileInfo = async () => {
    try {
      const response = await fetch(
        `${api}/profiles/${user[1]}?mykey=${profile?.profilekey}&mskl=${profile?.mskl}&sess=${user[0]}&uid=${profile?.uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setFriendsProfile(data.MemberProfile);
    } catch (err) {
      console.error("Error fetching profile information:", err);
      showNotification(
        "Failed to fetch profile information. Please try again."
      );
    }
  };
  useEffect(() => {
    fetchProfileInfo();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // Check if the action is 'goBack'
      if (e.data.action.type === "GO_BACK") {
        // Prevent the default action
        e.preventDefault();

        router.push("/(tabs)/muster");
      }
    });

    // Cleanup the listener on unmount
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: user[1],
      headerShown: true,
    });
  }, [navigation]);
  if (!friendsProfile) {
    return (
      <View style={styles.container}>
        <AnimatedLoading />
      </View>
    );
  }
  return (
    <ScrollView style={[styles.container]} contentContainerStyle={{}}>
      <View style={{ alignItems: "center", backgroundColor: "transparent" }}>
        <UserAvatar
          name=""
          size={200}
          containerStyle={{ backgroundColor: "transparent" }}
          imageStyle={{ backgroundColor: "transparent" }}
          imageUrl={
            api && friendsProfile?.avatar
              ? `${api.slice(0, -3)}${friendsProfile?.avatar.slice(1)}`
              : "" // Provide an empty string as a fallback if `api` or `friendsProfile?.avatar` is missing
          }
        />
      </View>

      <Text style={styles.info}>
        Name: {friendsProfile?.firstname} {friendsProfile?.lastname}
      </Text>
      <Text style={styles.info}>Job Title: {friendsProfile?.jobtitle}</Text>
      <Text style={styles.info}>
        Place of Work: {friendsProfile?.wherework}
      </Text>
      <Text style={styles.info}>Email: {friendsProfile?.registeremail}</Text>
      <Text style={styles.info}>
        Living Address: {friendsProfile?.livingaddress}
      </Text>
      <Text style={styles.info}>
        City: {friendsProfile?.livingcity}, State: {friendsProfile?.livingstate}
        , Zip: {friendsProfile?.livingzipcode}
      </Text>
      <Text style={styles.info}>
        Country: {friendsProfile?.livingcountry || "Not Specified"}
      </Text>
      <Text style={styles.info}>Birthdate: {friendsProfile?.birthdate}</Text>
      <Text style={styles.info}>
        Anniversary: {friendsProfile?.anniversary}
      </Text>
      <Text style={styles.info}>
        Education: {friendsProfile?.education} at {friendsProfile?.edulocation}
      </Text>
      <Text style={styles.info}>
        Graduation Year: {friendsProfile?.graduateyear}
      </Text>

      {friendsProfile?.userheaderintro && (
        <Text style={styles.info}>
          Header Intro: {friendsProfile?.userheaderintro}
        </Text>
      )}
      {friendsProfile?.profileintro && (
        <Text style={styles.info}>
          friendsProfile? Intro: {friendsProfile?.profileintro}
        </Text>
      )}

      {/* Social Links */}
      <Text style={styles.heading}>Social Links</Text>
      {friendsProfile?.facebook && (
        <TouchableOpacity
          onPress={() => Linking.openURL(friendsProfile?.facebook)}
        >
          <Text style={styles.link}>Facebook</Text>
        </TouchableOpacity>
      )}
      {friendsProfile?.instagram && (
        <TouchableOpacity
          onPress={() => Linking.openURL(friendsProfile?.instagram)}
        >
          <Text style={styles.link}>Instagram</Text>
        </TouchableOpacity>
      )}
      {friendsProfile?.linkedin && (
        <TouchableOpacity
          onPress={() => Linking.openURL(friendsProfile?.linkedin)}
        >
          <Text style={styles.link}>LinkedIn</Text>
        </TouchableOpacity>
      )}
      {friendsProfile?.twitter && (
        <TouchableOpacity
          onPress={() => Linking.openURL(friendsProfile?.twitter)}
        >
          <Text style={styles.link}>Twitter</Text>
        </TouchableOpacity>
      )}
      {friendsProfile?.youtube && (
        <TouchableOpacity
          onPress={() => Linking.openURL(friendsProfile?.youtube)}
        >
          <Text style={styles.link}>YouTube</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
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
