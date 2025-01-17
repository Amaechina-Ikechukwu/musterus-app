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
import { useNavigation } from "expo-router";
export default function MusterSingleCards({
  eventNumber,
}: {
  eventNumber: string;
}) {
  const { showNotification } = useNotification();
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const [cards, setCards] = useState<CardData[] | undefined>();
  const colorScheme = useColorScheme() ?? "light";
  const navigation = useNavigation();
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
      showNotification("Unable to fetch friends. Please try again later.");
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // Dependency array should remain empty as `getFriends` is not recreated

  if (!cards) {
    return (
      <View style={styles.container}>
        <AnimatedLoading />
      </View>
    );
  }
  //  useEffect(() => {
  //    if (cards?.length > 0) {
  //      navigation.setOptions({
  //        headerTitle: cards[0]?.imagetitle || "Event Cards",
  //        headerShown: true,
  //      });
  //    }
  //  }, [cards, navigation]);
  return (
    <PlainView style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.thumbnail}
        renderItem={({ item }) => (
          <CardItem
            item={item}
            eventNumber={eventNumber}
            colorScheme={colorScheme}
          />
        )}
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
        contentContainerStyle={{ gap: 20, width: "100%" }}
        columnWrapperStyle={{ gap: 10, justifyContent: "space-around" }}
        maxToRenderPerBatch={5}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />
    </PlainView>
  );
}

const CardItem = ({
  item,
  eventNumber,
  colorScheme,
}: {
  item: CardData;
  eventNumber: string;
  colorScheme: string;
}) => {
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
          source={{ uri: newAvatar(item.thumbnail) }}
          resizeMode="contain"
        />
      </PlainView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    borderRadius: 20,
    width: 200,
    height: 200,
  },
});

