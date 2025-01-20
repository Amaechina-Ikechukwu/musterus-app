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
import { router, useLocalSearchParams } from "expo-router";
import AnimatedLoading from "@/constants/AnimatedLoading";
import { useColorScheme } from "react-native";
export default function Index() {
  const { item } = useLocalSearchParams();
  const { showNotification } = useNotification();
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const [messages, setMessages] = useState<OnlineUsers[]>([]);
  const colorScheme = useColorScheme() ?? "light";
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${api}/api/messageList?mykey=${profile?.profilekey}&mskl=${profile?.mskl}`,
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
    console.log({ item });
    fetchMessages();
  }, []);
  return (
    <View>
      <Text>I</Text>
    </View>
  );
}
