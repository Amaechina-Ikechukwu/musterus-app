import React, { useEffect, useState } from "react";
import Foundation from "@expo/vector-icons/Foundation";
import { Link, Redirect, router, Tabs } from "expo-router";
import { useShallow } from "zustand/react/shallow";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { api } from "@/constants/shortened";
import { MStore } from "@/mstore";
import { UserAvatar } from "@/constants/UserAvatar";
import AnimatedLoading from "@/constants/AnimatedLoading";
import { View } from "@/components/Themed";
import { TouchableOpacity } from "react-native";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Foundation>["name"];
  color: string;
}) {
  return <Foundation size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [value, setValue] = useState<string | null>(null); // Initialize to null
  const [loading, setLoading] = useState(true); // Track loading status
  const [profile, updateProfile, updatePosts, updateProfileInfo] = MStore(
    useShallow((state) => [
      state.profile,
      state.updateProfile,
      state.updatePosts,
      state.updateProfileInfo,
    ])
  );
  async function getUserProfileInfo(
    username: string,
    data: { mskl: string; mykey: string }
  ) {
    try {
      // Make the API request with the entered username and password
      const response = await axios.get(
        `${api}/mu/${username}?mskl=${data.mskl}&mykey=${data.mykey}`
      );

      // Check if login was successful
      if (response.data) {
        updateProfileInfo({
          MyPost: response.data.MyPost,
          MyFollowers: response.data.MyFollowers,
          MyFriends: response.data.MyFriends,
        });
      } else {
      }
    } catch (error) {}
  }
  async function getUserProfile(
    username: string,
    data: { mskl: string; mykey: string }
  ) {
    try {
      const response = await axios.get(`${api}/home`, {
        params: { mskl: data.mskl, mykey: data.mykey },
      });
      if (response.data) {
        updateProfile(response.data.MyProfile);
        updatePosts(response.data.Comments);
        getUserProfileInfo(username, data);
      } else {
        router.push("/auth/startup");
      }
    } catch (error) {
      router.push("/auth/startup");
    }
  }

  async function getValueFor() {
    try {
      const username = await SecureStore.getItemAsync("username");
      const password = await SecureStore.getItemAsync("password");
      if (username && password) {
        setValue(username);

        // Make the API request with fetch
        const response = await fetch(
          `${api}/authenticate?username=${username}&password=${password}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Parse the response
        const data = await response.json();
        if (data) {
          await getUserProfile(username, data);
          router.push("/(tabs)");
        } else {
          router.push("/auth/startup");
        }
      } else {
        router.push("/auth/startup");
      }
    } catch (error) {
      router.push("/auth/startup");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getValueFor();
  }, []);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <AnimatedLoading />
  //     </View>
  //   );
  // }

  // if (!value || !profile) {
  //   return <Redirect href="/auth/startup" />;
  // }

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].text,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          shadowOpacity: 0, // Removes shadow
          borderTopWidth: 0, // Removes border
          elevation: 0, // Removes elevation (used in Android for shadows)
          backgroundColor: Colors[colorScheme ?? "light"].background, // Set background to match theme
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitle: profile?.firstname,
          headerStyle: {
            shadowOpacity: 0, // Removes shadow
            borderTopWidth: 0, // Removes border
            elevation: 0, // Removes elevation (used in Android for shadows)
            backgroundColor: Colors[colorScheme ?? "light"].background, // Set background to match theme
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          tabBarHideOnKeyboard: true,
          headerLeftContainerStyle: { paddingLeft: 20 },
          headerLeft: () => (
            <Link href="/profile" asChild>
              <TouchableOpacity>
                <UserAvatar
                  imageUrl={
                    api && profile?.avatar
                      ? `${api.slice(0, -3)}${profile.avatar.slice(1)}`
                      : "" // Provide an empty string as a fallback if `api` or `profile.avatar` is missing
                  }
                  name={profile?.firstname || "User"} // Provide a fallback name if `profile.firstname` is missing
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="muster"
        options={{
          title: "Muster",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="social-medium" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="torsos-all" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="advert"
        options={{
          title: "Adverts",
          tabBarIcon: ({ color }) => <TabBarIcon name="burst" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="torso" color={color} />,
          headerTitle: profile?.firstname + " " + profile?.lastname,
          headerStyle: {
            shadowOpacity: 0, // Removes shadow
            borderTopWidth: 0, // Removes border
            elevation: 0, // Removes elevation (used in Android for shadows)
            backgroundColor: Colors[colorScheme ?? "light"].background, // Set background to match theme
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
        }}
      />
    </Tabs>
  );
}
