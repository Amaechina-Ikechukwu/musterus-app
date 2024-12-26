import { accent } from "@/constants/Colors";
import React, { useRef } from "react";
import { Pressable } from "react-native";
import {
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";

const { width } = Dimensions.get("screen");

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle; // Style for the button container
  textStyle?: TextStyle; // Style for the button text
  disabled?: boolean;
}

const MButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  style = {}, // Ensure default empty object if style is undefined
  textStyle = {}, // Ensure default empty object if textStyle is undefined
  disabled = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true, // Enable native driver for scale
      }),
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(colorAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => onPress());
  };

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [accent, "#388E3C"],
  });

  return (
    <Pressable
      //   style={[styles.button, { ...style }]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.button,
          { transform: [{ scale: scaleAnim }], backgroundColor },
          style, // Apply custom style last to ensure it overrides internal styles
        ]}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MButton;
