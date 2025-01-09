import { View as PlainView, Text } from "react-native";
import React, { useEffect } from "react";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import { useNotification } from "@/contexts/NotificationContext";
import { api } from "@/constants/shortened";
import { ProfileInfo } from "@/constants/types";
import ProfileInfoHeaders from "./ProfileInfoHeaders";
import { View } from "../Themed";
import AnimatedLoading from "@/constants/AnimatedLoading";

export default function ProfileIndex() {
  const [profile, updateProfileInfo, profileInfo] = MStore(
    useShallow((state) => [
      state.profile,
      state.updateProfileInfo,
      state.profileInfo,
    ])
  );
  const { showNotification } = useNotification();

  const fetchProfileInfo = async () => {
    try {
      const response = await fetch(
        `${api}/mu/${profile?.publicurl}?mykey=${profile?.profilekey}&mskl=${profile?.mskl}`,
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

      const data: ProfileInfo = await response.json();

      updateProfileInfo({
        MyPosts: data.MyPosts,
        MyFollowers: data.MyFollowers,
        MyFriends: data.MyFriends,
      });
    } catch (err) {
      console.error("Error fetching profile information:", err);
      showNotification(
        "Failed to fetch profile information. Please try again."
      );
    }
  };
  useEffect(() => {
    fetchProfileInfo();
  }, []);
  if (!profile) {
    return (
      <View>
        <AnimatedLoading />
      </View>
    );
  }
  return <ProfileInfoHeaders profile={profile} />;
}
