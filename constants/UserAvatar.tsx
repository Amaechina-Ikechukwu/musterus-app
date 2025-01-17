import { Text, View } from "@/components/Themed";
import React from "react";
import {
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  useColorScheme,
} from "react-native";
import Colors, { accent } from "./Colors";

interface AvatarProps {
  imageUrl?: string | null; // Allow undefined or null
  name: string;
  size?: number;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
}

export const UserAvatar: React.FC<AvatarProps> = ({
  imageUrl,
  name,
  size = 40,
  containerStyle,
  imageStyle,
}) => {
  const [hasError, setHasError] = React.useState(false);
  const colorScheme = useColorScheme() ?? "light";
  // Get initials from name
  const getInitials = (name: string): string => {
    if (!name) {
      return "M";
    }
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const FallbackAvatar = () => (
    <View
      style={[
        styles.fallbackContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: Colors[colorScheme].darkTint,
          borderWidth: 2,
          borderColor: accent,
        },
        containerStyle,
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
        {getInitials(name)}
      </Text>
    </View>
  );

  // Determine if fallback avatar should be displayed
  if (!imageUrl || hasError) {
    return <FallbackAvatar />;
  }

  return (
    <View>
      <View
        style={[
          styles.container,
          { width: size, height: size },
          containerStyle,
        ]}
      >
        <Image
          source={{ uri: imageUrl }}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
            imageStyle,
          ]}
          onError={() => setHasError(true)} // Set error state if image fails to load
          onLoad={() => setHasError(false)} // Reset error state on successful load
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  image: {
    backgroundColor: "transparent",
  },
  fallbackContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1E1E1",
  },
  initials: {
    fontWeight: "600",
  },
});
