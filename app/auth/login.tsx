import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { api } from "@/constants/shortened";
import { useNotification } from "@/contexts/NotificationContext";
import MButton from "@/UIComponents/MButton";
import MInput from "@/UIComponents/MInput";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Redirect, router } from "expo-router";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
function MusterDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const musterInfo = [
    "Musterus is a social networking website designed for those tired of Big Tech companies and censorship.",
    "It was created to connect people in a network and allow them to freely share content.",
    "Musterus is independent and not affiliated with Facebook or other existing social media platforms.",
    "The word 'muster' means to gather or bring something together, like friends helping a friend in need.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === musterInfo.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // 2-second delay

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 40 }}>{musterInfo[currentIndex]}</Text>
    </View>
  );
}
async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}
export default function Login() {
  const colorScheme = useColorScheme() ?? "light";
  const { showNotification } = useNotification();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const [updateProfile] = MStore(useShallow((state) => [state.updateProfile]));
  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  async function getUserProfile(
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
        updateProfile(response.data.MemberProfile);
      } else {
        router.push("/auth/startup");
      }
    } catch (error) {
      router.push("/auth/startup");
    }
  }
  const handleLogin = async () => {
    // Check if the username format is valid
    if (inputValue.username.length < 5) {
      showNotification("Please enter a valid username address");
      return;
    }

    try {
      showNotification("Logging in, please wait");
      // Make the API request with the entered username and password
      const response = await axios.get(`${api}/authenticate`, {
        params: {
          username: inputValue.username, // Assuming username is the username
          password: inputValue.password,
        },
      });

      // Check if login was successful
      if (response.data) {
        save("username", inputValue.username);
        save("password", inputValue.password);
        await getUserProfile(inputValue.username, response.data);
        showNotification("Successful!, Now enjoy...");

        router.push("/(tabs)");
      } else {
        // Show a notification if login failed (depending on the API's response format)
        showNotification(
          response.data.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      // Handle any errors from the request
      console.error("Error logging in:", error);
      showNotification(
        "An error occurred. Please check your connection and try again."
      );
    }
  };

  return (
    <View
      style={{
        gap: 15,
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
      }}
    >
      <View style={{ marginBottom: 30 }}>
        <MusterDisplay />
      </View>
      <MInput
        placeholder="Enter username"
        keyboardType="default"
        autoCapitalize={"none"}
        onChange={(text) => handleInputChange("username", text)}
        style={{ alignSelf: "center", width: "100%" }}
      />
      <MInput
        placeholder="Password"
        textContentType="password"
        onChange={(text) => handleInputChange("password", text)}
        style={{ alignSelf: "center", width: "100%" }}
      />
      <MButton
        title="Login"
        onPress={handleLogin}
        style={{
          width: "100%",
          alignSelf: "center",
          backgroundColor: Colors[colorScheme].text,
        }}
        textStyle={{ color: Colors[colorScheme].background }}
      />
    </View>
  );
}
