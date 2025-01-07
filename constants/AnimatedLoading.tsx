import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedLoading: React.FC = () => {
  const shimmerAnim = useRef(new Animated.Value(-1)).current;
  const colorScheme = useColorScheme(); // Detect dark or light mode

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const shimmerTranslateX = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 200], // Adjust the range based on text width
  });

  const textColor = colorScheme === "dark" ? "#FFF" : "#333"; // Adjust text color for dark mode
  const shimmerColor =
    colorScheme === "dark"
      ? "rgba(255, 255, 255, 0.3)"
      : "rgba(255, 255, 255, 0.6)"; // Adjust shimmer opacity for dark mode

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: textColor }]}>Musterus</Text>
      <Animated.View
        style={[
          styles.shimmerOverlay,
          {
            transform: [{ translateX: shimmerTranslateX }],
          },
        ]}
      >
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0)",
            shimmerColor,
            "rgba(255, 255, 255, 0)",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 60,
    fontWeight: "bold",
  },
  shimmerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    width: 200, // Adjust this width to control shimmer effect spread
    height: "100%",
  },
});

export default AnimatedLoading;
