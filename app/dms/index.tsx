import React from "react";
import { Text, View } from "@/components/Themed";
import { useNotification } from "@/contexts/NotificationContext";
import { useCallback, useEffect, useState } from "react";
import { api, newAvatar } from "@/constants/shortened";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import { OnlineUsers } from "@/constants/types";
import { mwidth } from "@/constants/ScreenDimensions";
import Colors, { accent } from "@/constants/Colors";
import { UserAvatar } from "@/constants/UserAvatar";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import AnimatedLoading from "@/constants/AnimatedLoading";
import {
  TouchableOpacity,
  useColorScheme,
  View as PlainView,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function Index() {
  const { showNotification } = useNotification();
  const [profile, friend] = MStore(
    useShallow((state) => [state.profile, state.friend])
  );
  const navigation = useNavigation();
  const [messages, setMessages] = useState<OnlineUsers[]>([]);
  const [friendsProfile, setFriendsProfile] = useState<any>();
  const colorScheme = useColorScheme() ?? "light";
  const fetchProfileInfo = async () => {
    try {
      const response = await fetch(
        `${api}/profiles/${friend?.publicurl}?mykey=${profile?.profilekey}&mskl=${profile?.mskl}&sess=${friend?.profilekey}&uid=${profile?.uid}`,
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
      setFriendsProfile(data.Friendship);
    } catch (err) {
      console.error("Error fetching profile information:", err);
      showNotification(
        "Failed to fetch profile information. Please try again."
      );
    }
  };
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${api}/api/messageList?mykey=${profile?.profilekey}&uid=${profile?.uid}&touser=${friend?.uid}&friendship=${friendsProfile?.friendstat}&friend=${friend}`,
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

      // const data = await response.json();

      console.log(JSON.stringify(response, null, 2));
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
    if (friendsProfile) {
      fetchMessages();
    }
  }, [friendsProfile]);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerShadowVisible: true,
      headerShown: true,
      headerLeft: () => (
        <PlainView style={styles.headerBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign
              name="arrowleft"
              size={24}
              color={Colors[colorScheme].text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBar}
            onPress={() =>
              router.push(
                `/usersprofile/${friend?.profilekey}/${friend?.publicurl}`
              )
            }
          >
            <UserAvatar
              name={friend?.firstname || ""}
              imageUrl={newAvatar(friend?.avatar || "")}
            />
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {friend?.firstname} {friend?.lastname}
            </Text>
          </TouchableOpacity>
        </PlainView>
      ),
    });
  }, [navigation, friend]);
  return (
    <View style={styles.container}>
      <Text>Coming soon</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBar: { alignItems: "center", flexDirection: "row", gap: 4 },
});
