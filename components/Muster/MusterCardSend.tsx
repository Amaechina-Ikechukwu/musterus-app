import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { useShallow } from "zustand/react/shallow";
import { MStore } from "@/mstore";
import { api, newAvatar } from "@/constants/shortened";
import { CardData, UserProfile } from "@/constants/types";
import Colors, { accent } from "@/constants/Colors";
import { Text, View } from "../Themed";
import { mheight, mwidth } from "@/constants/ScreenDimensions";
import AnimatedLoading from "@/constants/AnimatedLoading";
import MButton from "@/UIComponents/MButton";
import { router } from "expo-router";
import { UserAvatar } from "@/constants/UserAvatar";
import MInput from "@/UIComponents/MInput";
import { AntDesign } from "@expo/vector-icons";

export default function MusterCardSend({
  eventNumber,
  cardNumber,
}: {
  eventNumber: string;
  cardNumber: string;
}) {
  const { showNotification } = useNotification();
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const [cards, setCards] = useState<CardData[]>([]);
  const [friends, setFriends] = useState<UserProfile[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const colorScheme = useColorScheme() ?? "light";

  const getFriendsAndCards = async () => {
    const url = `${api}/eventcards?mykey=${profile?.profilekey}&mskl=${profile?.mskl}&event=${eventNumber}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setCards(data.Cards || []);
      setFriends(data.MyFriendsList || []);
    } catch (error) {
      console.error(error);
      showNotification("Unable to fetch friends. Please try again later.");
    }
  };

  useEffect(() => {
    getFriendsAndCards();
  }, []);

  const handleSendCard = (user: UserProfile) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleConfirmSend = async () => {
    if (!selectedUser) return;

    if (!message.trim()) {
      showNotification("Please add a message");
      return;
    }

    const url = `${api}/eventcards/send?mykey=${profile?.profilekey}&mskl=${
      profile?.mskl
    }&event=${eventNumber}&friendid=${selectedUser.friendid}&userid=${
      profile?.uid
    }&card=${eventNumber}&giftcardid=${""}&message=${message}`;

    try {
      showNotification(`Sending card to ${selectedUser.firstname}`);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to send card");

      showNotification(`Card sent to ${selectedUser.firstname}`);
      setModalVisible(false);
      setMessage("");
    } catch (error) {
      console.error(error);
      showNotification("Unable to send card. Please try again later.");
    }
  };

  const selectedCard = cards.find((card) => card.filetype === cardNumber);

  const renderFriendItem = useCallback(
    ({ item }: { item: UserProfile }) => (
      <TouchableOpacity>
        <View
          style={[
            styles.friendCard,
            { backgroundColor: Colors[colorScheme].darkTint },
          ]}
        >
          <UserAvatar
            name={`${item.firstname} ${item.lastname}`}
            imageUrl={newAvatar(item.avatar)}
            size={100}
          />
          <Text>{`${item.firstname} ${item.lastname}`}</Text>
          <MButton onPress={() => handleSendCard(item)} title="Send card" />
        </View>
      </TouchableOpacity>
    ),
    [colorScheme]
  );

  if (!friends.length) {
    return (
      <View style={styles.container}>
        <AnimatedLoading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.profilekey}
        renderItem={renderFriendItem}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>
              You don’t have friends to send cards to yet
            </Text>
            <MButton
              title="Tap to connect with friends"
              onPress={router.back}
            />
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
      />

      {selectedUser && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <UserAvatar
                  name={`${selectedUser.firstname} ${selectedUser.lastname}`}
                  imageUrl={newAvatar(selectedUser.avatar)}
                  size={120}
                />
                <AntDesign name="right" size={30} color={accent} />
                <Image
                  style={styles.cardImage}
                  source={{ uri: newAvatar(selectedCard?.thumbnail) }}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.modalTitle}>
                Send a card to {selectedUser.firstname} {selectedUser.lastname}
              </Text>
              <MInput
                label="Message"
                placeholder="Type a message..."
                value={message}
                onChange={setMessage}
              />
              <MButton
                style={styles.modalButton}
                title={`Send to ${selectedUser.firstname}`}
                onPress={handleConfirmSend}
              />
              <MButton
                style={[styles.modalButton, styles.cancelButton]}
                title="Cancel"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    gap: 20,
  },
  columnWrapper: {
    gap: 10,
    justifyContent: "space-around",
  },
  friendCard: {
    borderRadius: 20,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    padding: 10,
  },
  emptyList: {
    alignItems: "center",
    justifyContent: "center",
    height: mheight,
    gap: 10,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginVertical: 10,
  },
  modalButton: {
    width: mwidth * 0.8,
  },
  cancelButton: {
    backgroundColor: "red",
  },
});
