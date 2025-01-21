import {
  FlatList,
  StyleSheet,
  View as PlainView,
  useColorScheme,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
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
import { Link, router } from "expo-router";
import AnimatedLoading from "@/constants/AnimatedLoading";

export default function MessageList() {
  const { showNotification } = useNotification();
  const [profile, updateFriend] = MStore(
    useShallow((state) => [state.profile, state.updateFriend])
  );
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers[] | null>([]);
  const colorScheme = useColorScheme() ?? "light";
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${api}/chatroom?mykey=${profile?.profilekey}&mskl=${profile?.mskl}`,
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

      setOnlineUsers(data.OnlineUsers);
    } catch (err) {
      console.error("Error fetching profile information:", err);
      showNotification(
        "Failed to fetch profile information. Please try again."
      );
    }
  };
  const goToDm = (friend: OnlineUsers) => {
    updateFriend(friend);
    router.push("/dms");
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  if (onlineUsers == null) {
    return (
      <View style={styles.container}>
        <AnimatedLoading />
      </View>
    );
  }
  const renderItem = useCallback(({ item }: { item: OnlineUsers }) => {
    return (
      //   <Link href={"/dms"} asChild>
      <TouchableOpacity onPress={() => goToDm(item)}>
        <PlainView
          style={[
            styles.profileContainer,
            { backgroundColor: Colors[colorScheme].darkTint },
          ]}
        >
          <View
            style={[
              styles.profileHeader,
              {
                alignItems: "center",
                backgroundColor: Colors[colorScheme].darkTint,
              },
            ]}
          >
            <View
              style={[
                styles.userDetails,
                {
                  alignItems: "center",
                  backgroundColor: Colors[colorScheme].darkTint,
                },
              ]}
            >
              <UserAvatar
                imageUrl={newAvatar(item.avatar)}
                size={50}
                name={`${item.firstname} ${item.lastname}`}
              />
              <View
                style={{
                  width: "80%",
                  gap: 5,
                  backgroundColor: Colors[colorScheme].darkTint,
                }}
              >
                <Text style={styles.userName}>
                  {item.firstname} {item.lastname}
                </Text>
              </View>
            </View>
          </View>
        </PlainView>
      </TouchableOpacity>
      //   </Link>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={onlineUsers}
        keyExtractor={(item) => item.uid}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <PlainView
            style={[
              styles.container,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>
              No messages yet
            </Text>
          </PlainView>
        )}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        windowSize={5}
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
  listContainer: {
    paddingBottom: 20,
  },
  profileContainer: {
    marginBottom: 15,

    borderRadius: 10,
    padding: 10,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userDetails: {
    flexDirection: "row",

    justifyContent: "space-around",
  },
  userName: {
    fontWeight: "700",
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  actionButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#333",
  },
});
