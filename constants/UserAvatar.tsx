import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  ImageStyle,
} from "react-native";

interface AvatarProps {
  imageUrl: string;
  name: string;
  size?: number;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  showFallback?: boolean;
}

export const UserAvatar: React.FC<AvatarProps> = ({
  imageUrl,
  name,
  size = 40,
  containerStyle,
  imageStyle,
  showFallback,
}) => {
  const [hasError, setHasError] = React.useState(false);

  // Get initials from name
  const getInitials = (name: string): string => {
    if (name == null) {
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
          backgroundColor: "#E1E1E1",
        },
        containerStyle,
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
        {getInitials(name)}
      </Text>
    </View>
  );

  if (hasError) {
    return showFallback ? <FallbackAvatar /> : null;
  }
  if (showFallback || imageUrl == null) {
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
          onError={() => setHasError(true)}
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
  },
  image: {
    backgroundColor: "#E1E1E1",
  },
  fallbackContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1E1E1",
  },
  initials: {
    color: "#666666",
    fontWeight: "600",
  },
});
