import { View as PlainView, useColorScheme } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { api, newAvatar } from "@/constants/shortened";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import { CommonUserInfo, UserProfile } from "@/constants/types";
import { Text, View } from "../Themed";
import { FlatList } from "react-native";
import AnimatedLoading from "@/constants/AnimatedLoading";
import { StyleSheet } from "react-native";
import { mwidth } from "@/constants/ScreenDimensions";
import { TouchableOpacity } from "react-native";
import Colors, { accent } from "@/constants/Colors";
import { UserAvatar } from "@/constants/UserAvatar";

export default function MusterFriends() {
  const { showNotification } = useNotification();
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const [friends, setFriends] = useState<CommonUserInfo[]>([]);
  const colorScheme = useColorScheme() ?? "light";
  const getFriends = async () => {
    const url = `${api}/musterpoint?mykey=${profile?.profilekey}&mskl=${profile?.mskl}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setFriends(data.Members);
    } catch (error) {
      console.log(error);
      showNotification("Unable fetch friends. Please try again later.");
    }
  };
  useEffect(() => {
    getFriends();
  }, []);
  const renderItem = useCallback(({ item }: { item: CommonUserInfo }) => {
    return (
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
              alignItems: "flex-start",
              backgroundColor: Colors[colorScheme].darkTint,
            },
          ]}
        >
          <View
            style={[
              styles.userDetails,
              {
                alignItems: "flex-start",
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

              <PlainView style={[styles.buttonsContainer]}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: Colors[colorScheme].text,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { color: Colors[colorScheme].background },
                    ]}
                  >
                    Follow
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: accent }]}
                >
                  <Text
                    style={[styles.buttonText, { color: Colors.dark.text }]}
                  >
                    Make Friend
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      borderWidth: 1,
                      borderColor: Colors[colorScheme].tabIconSelected,
                    },
                  ]}
                >
                  <Text style={[styles.buttonText]}>View Profile</Text>
                </TouchableOpacity>
              </PlainView>
            </View>
          </View>
        </View>
      </PlainView>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.uid}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={AnimatedLoading}
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
