import { Text, View } from "@/components/Themed";
import AnimatedLoading from "@/constants/AnimatedLoading";
import { mwidth } from "@/constants/ScreenDimensions";
import MButton from "@/UIComponents/MButton";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, TouchableOpacity } from "react-native";

const StartUp: React.FC = () => {
  const appNameOpacity = useRef(new Animated.Value(0)).current;
  const descriptionOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in the app name first
    Animated.sequence([
      Animated.timing(appNameOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // After app name fades in, fade in the description
      Animated.timing(descriptionOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // After description fades in, show the login button
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [appNameOpacity, descriptionOpacity, buttonOpacity]);

  return (
    <View style={styles.container}>
      <AnimatedLoading />
      <Animated.Text
        style={[styles.description, { opacity: descriptionOpacity }]}
      >
        Bringing or gathering something together
      </Animated.Text>
      <Animated.View style={{ opacity: buttonOpacity }}>
        <MButton
          title="Login to use Musterus"
          onPress={() => router.push("/auth/login")}
          style={{ width: mwidth * 0.8 }}
          textStyle={{ letterSpacing: 3 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", backgroundColor:"transparent"
  },
  appName: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: "#388E3C",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StartUp;
