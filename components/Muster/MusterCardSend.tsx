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
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null); // Track selected user
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility
  const [message, setMessage] = useState(""); // Text input state
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
      setFriends(data.MyFriendsList);
    } catch (error) {
      console.log(error);
      showNotification("Unable fetch friends. Please try again later.");
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  const renderItem = useCallback(({ item }: { item: UserProfile }) => {
    return (
      <TouchableOpacity>
        <View
          style={[
            {
              backgroundColor: Colors[colorScheme].darkTint,
              borderRadius: 20,
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              padding: 10,
            },
          ]}
        >
          <UserAvatar
            name={item.firstname + " " + item.lastname}
            imageUrl={newAvatar(item.avatar)}
            size={100}
          />
          <Text>{item.firstname + " " + item.lastname}</Text>
          <MButton onPress={() => handleSendCard(item)} title="Send card" />
        </View>
      </TouchableOpacity>
    );
  }, []);

  const handleSendCard = (user: UserProfile) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleConfirmSend = async () => {
    try {
      if (message.length == 0) {
        showNotification("Please add a message");
        return;
      }
      showNotification(`Sending card to ${selectedUser?.firstname}`);

      const url = `${api}/eventcards/send?mykey=${profile?.profilekey}&mskl=${
        profile?.mskl
      }&event=${eventNumber}&friendid=${selectedUser?.friendid}&userid=${
        profile?.uid
      }&card=${eventNumber}&giftcardid=${""}&message=${message}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      showNotification(`Card sent to ${selectedUser?.firstname}`);
      //  setModalVisible(false);
      //  setMessage("");
    } catch (error) {
      console.log(error);
      showNotification("Unable fetch friends. Please try again later.");
    }
  };
  const selectedCard = cards.find((card) => card.filetype === cardNumber);
  if (!friends) {
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
              You don’t have friends to send cards to yet
            </Text>
            <MButton
              title="Tap connect with friends"
              onPress={() => router.back()}
            />
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

      {/* Modal */}
      {selectedUser && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <UserAvatar
                  name={selectedUser.firstname + " " + selectedUser.lastname}
                  imageUrl={newAvatar(selectedUser.avatar)}
                  size={120}
                />
                <AntDesign name="right" size={30} color={accent} />
                <Image
                  style={{ width: 120, height: 120, borderRadius: 20 }}
                  src={newAvatar(selectedCard?.thumbnail)} // Ensure this returns { uri: string }
                  resizeMode="cover"
                />
              </View>

              <Text style={{ fontSize: 20, marginVertical: 10 }}>
                Send a card to {selectedUser.firstname} {selectedUser.lastname}
              </Text>
              <MInput
                label="Message"
                placeholder="Type a message..."
                value={message}
                onChange={setMessage}
              />
              <MButton
                style={{ width: mwidth * 0.8 }}
                title={`Send to ${selectedUser.firstname}`}
                onPress={handleConfirmSend}
              />
              <MButton
                style={{ backgroundColor: "red", width: mwidth * 0.8 }}
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
    width: mwidth,
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
  },
});
