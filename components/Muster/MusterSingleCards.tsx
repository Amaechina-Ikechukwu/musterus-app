import {
  FlatList,
  Image,
  ImageBackground,
  View as PlainView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { useShallow } from "zustand/react/shallow";
import { MStore } from "@/mstore";
import { api, newAvatar } from "@/constants/shortened";
import { CardData } from "@/constants/types";
import Colors from "@/constants/Colors";
import { Text, View } from "../Themed";
import { mheight, mwidth } from "@/constants/ScreenDimensions";
import AnimatedLoading from "@/constants/AnimatedLoading";
import MButton from "@/UIComponents/MButton";
import { router } from "expo-router";

export default function MusterSingleCards({
  eventNumber,
}: {
  eventNumber: string;
}) {
  const { showNotification } = useNotification();
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const [cards, setCards] = useState<CardData[]>([]);
  const colorScheme = useColorScheme() ?? "light";
  const getFriends = async () => {
    const url = `${api}/eventcards?mykey=${profile?.profilekey}&mskl=${profile?.mskl}&event=${eventNumber}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setCards(data.Cards);
    } catch (error) {
      console.log(error);
      showNotification("Unable fetch friends. Please try again later.");
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  const renderItem = useCallback(({ item }: { item: CardData }) => {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/muster/${eventNumber}/${item.filetype}`)}
      >
        <PlainView
          style={[
            { backgroundColor: Colors[colorScheme].darkTint, borderRadius: 20 },
          ]}
        >
          <Image
            style={styles.image}
            src={newAvatar(item.thumbnail)} // Ensure this returns { uri: string }
            resizeMode="contain"
          />
        </PlainView>
      </TouchableOpacity>
    );
  }, []);
  if (!cards) {
    return (
      <View style={styles.container}>
        <AnimatedLoading />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.thumbnail}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View
            style={[
              styles.container,
              {
                alignItems: "center",
                justifyContent: "center",
                height: mheight,
                gap: 10,
              },
            ]}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>
              No cards yet
            </Text>
            <MButton title="Tap to go back" onPress={() => router.back()} />
          </View>
        )}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        windowSize={5}
        numColumns={2}
        contentContainerStyle={{ gap: 20 }}
        columnWrapperStyle={{ gap: 10, justifyContent: "space-around" }}
        maxToRenderPerBatch={5}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: mwidth,
  },
  image: {
    borderRadius: 20,
    width: 200,
    height: 200,
  },
});
