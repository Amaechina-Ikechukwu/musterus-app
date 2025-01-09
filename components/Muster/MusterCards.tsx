import {
  FlatList,
  ImageBackground,
  View as PlainView,
  StyleSheet,
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
import { mwidth } from "@/constants/ScreenDimensions";
import AnimatedLoading from "@/constants/AnimatedLoading";

export default function MusterCards() {
  const { showNotification } = useNotification();
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const [cards, setCards] = useState<CardData[]>([]);
  const colorScheme = useColorScheme() ?? "light";
  const getFriends = async () => {
    const url = `${api}/eventcards?mykey=${profile?.profilekey}&mskl=${profile?.mskl}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      uniteCards(data.Cards);
    } catch (error) {
      console.log(error);
      showNotification("Unable fetch friends. Please try again later.");
    }
  };
  const uniteCards = (cards: CardData[]): void => {
    const uniqueTitles = new Set<string>();
    const cardArray: CardData[] = [];

    for (const card of cards) {
      if (!uniqueTitles.has(card.imagetitle)) {
        uniqueTitles.add(card.imagetitle);
        cardArray.push(card);
      }
    }

    setCards(cardArray);
  };

  useEffect(() => {
    getFriends();
  }, []);

  const renderItem = useCallback(({ item }: { item: CardData }) => {
    return (
      <PlainView
        style={[
          { backgroundColor: Colors[colorScheme].darkTint, borderRadius: 20 },
        ]}
      >
        <ImageBackground
          style={styles.image}
          src={newAvatar(item.thumbnail)} // Ensure this returns { uri: string }
          resizeMode="contain"
        >
          <PlainView
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                fontStyle: "italic",
                backgroundColor: "#000000c0",
                textAlign: "center",
                color: Colors.dark.text,
                padding: 10,
              }}
            >
              {item.imagetitle.toUpperCase()}
            </Text>
          </PlainView>
        </ImageBackground>
      </PlainView>
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
        ListEmptyComponent={AnimatedLoading}
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
