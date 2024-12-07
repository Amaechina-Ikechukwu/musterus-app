import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { accent } from "./Colors";
import { Group } from "./types";

interface GroupListCardProps {
  backgroundImage: string | null; // URL or local path for the background image
  avatarImage: string | null; // URL or local path for the avatar image
  group: Group; // Group name to display
}

const GroupListCard: React.FC<GroupListCardProps> = ({
  backgroundImage,
  avatarImage,
  group,
}) => {
  return backgroundImage ? (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <Content avatarImage={avatarImage} group={group} />
    </ImageBackground>
  ) : (
    <LinearGradient
      colors={[accent, "white"]} // Gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }} // Left-to-right gradient
      style={styles.background}
    >
      <Content avatarImage={avatarImage} group={group} />
    </LinearGradient>
  );
};

const Content: React.FC<{ avatarImage: string | null; group: Group }> = ({
  avatarImage,
  group,
}) => (
  <View style={styles.overlay}>
    {avatarImage ? (
      <Image source={{ uri: avatarImage }} style={styles.avatar} />
    ) : (
      <View style={styles.fallbackAvatar}>
        <Text style={styles.fallbackAvatarText}>
          {group.groupname.charAt(0).toUpperCase()}
        </Text>
      </View>
    )}
    <Text style={styles.groupName}>{group.groupname}</Text>
    <Text style={styles.groupIntro}>{group.groupintro}</Text>
  </View>
);

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  backgroundImage: {
    borderRadius: 10,
    resizeMode: "cover",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay for better text visibility
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 10,
  },
  fallbackAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  fallbackAvatarText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  groupName: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  groupIntro: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "light",
  },
});

export default GroupListCard;
