import { api } from "@/constants/shortened";
import { MStore } from "@/mstore";
import MButton from "@/UIComponents/MButton";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

const SubscribeGroup = () => {
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const params = useLocalSearchParams();

  const [response, setResponse] = useState<{
    status: number;
    message: string;
  } | null>(null);
  if (profile === null) {
    return null;
  }
  const { mskl, uid, profilekey } = profile;
  const handleSubscribe = async () => {
    try {
      const res = await fetch(`${api}/groups/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mskl}`, // Assuming token is used this way.
        },
        body: JSON.stringify({
          profilekey,
          uid,
          //   group,
        }),
      });

      const data = await res.json();

      if (data.status === 0) {
        setResponse({
          status: 0,
          message: "Already a member. Profile updated.",
        });
      } else if (data.status === 1) {
        setResponse({ status: 1, message: "Joined the group." });
      }
    } catch (error) {
      setResponse({ status: -1, message: "Error subscribing to group." });
    }
  };

  return (
    <div>
      <MButton title="Click to subscribe" onPress={handleSubscribe} />
    </div>
  );
};

export default SubscribeGroup;
