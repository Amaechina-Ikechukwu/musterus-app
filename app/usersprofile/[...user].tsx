import { View as PlainView, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import { api } from "@/constants/shortened";
import { useNotification } from "@/contexts/NotificationContext";
import { Text, View } from "@/components/Themed";
import { mwidth } from "@/constants/ScreenDimensions";

export default function index() {
  const { user } = useLocalSearchParams();
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? "light";
  const { showNotification } = useNotification();
  const fetchProfileInfo = async () => {
    try {
      const response = await fetch(
        `${api}/profiles/${user[1]}?mykey=${profile?.profilekey}&sess=${user[0]}`,
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

      console.log(JSON.stringify(data, null, 2));
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
    navigation.setOptions({
      headerTitle: user[1],
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <Text>Added soon</Text>
    </View>
  );
}
