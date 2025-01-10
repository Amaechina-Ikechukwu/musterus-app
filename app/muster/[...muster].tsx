import { View as PlainView, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import { api } from "@/constants/shortened";
import { useNotification } from "@/contexts/NotificationContext";
import { Text, View } from "@/components/Themed";
import { mwidth } from "@/constants/ScreenDimensions";
import MusterSingleCards from "@/components/Muster/MusterSingleCards";
import MusterCardSend from "@/components/Muster/MusterCardSend";

export default function index() {
  const { muster } = useLocalSearchParams();
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? "light";
  const { showNotification } = useNotification();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Event Cards",
      headerShown: true,
      headerShadowVisible: false,
    });
  }, [navigation]);
  if (muster[0] && muster.length == 1) {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <MusterSingleCards eventNumber={muster[0]} />
      </View>
    );
  }
  if (muster[1] && muster.length == 2) {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <MusterCardSend eventNumber={muster[0]} cardNumber={muster[1]} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <Text>Added soon</Text>
    </View>
  );
}
