import { View as PlainView, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import { Text, View } from "@/components/Themed";
import MusterSingleCards from "@/components/Muster/MusterSingleCards";
import MusterCardSend from "@/components/Muster/MusterCardSend";

export default function Index() {
  const { muster } = useLocalSearchParams();
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? "light";

  const musterArray = Array.isArray(muster) ? muster : muster ? [muster] : [];

  useEffect(() => {
    if (musterArray.length > 0) {
      navigation.setOptions({
        headerTitle: "Event Cards",
        headerShown: true,
        headerShadowVisible: false,
      });
    }
  }, [navigation, musterArray]);

  const renderContent = () => {
    if (musterArray.length === 1) {
      return <MusterSingleCards eventNumber={musterArray[0]} />;
    }
    if (musterArray.length === 2) {
      return (
        <MusterCardSend
          eventNumber={musterArray[0]}
          cardNumber={musterArray[1]}
        />
      );
    }
    return <Text>Added soon</Text>;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      {renderContent()}
    </View>
  );
}
