import {
  View as PlainView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Text, View } from "../Themed";
import axios from "axios";
import { api } from "@/constants/shortened"; // Update this with the actual API endpoint as needed

type ReactionComponentProps = {
  commentId: string;

  divid: string;
  uid: string;
  mykey: string;
  mskl: string;
};

export default function ReactionComponent({
  commentId,
  divid,
  uid,
  mykey,
  mskl,
}: ReactionComponentProps) {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const reactions = ["👍", "❤️", "😔", "👎"];

  const handleReactionPress = async (reaction: string) => {
    setSelectedReaction(reaction);

    try {
      const response = await axios.post(`${api}/likebuttons`, {
        commentId,
        reaction,
        selec: reactions.indexOf(reaction) + 1,
        uid,
        divid,
        mykey,
        mskl,
      });

      if (response.status === 200) {
        // Alert.alert("Reaction sent!", `You reacted with ${reaction}`);
      } else {
        // Alert.alert("Failed to send reaction", "Please try again.");
      }
    } catch (error) {
      // console.error("Error posting reaction:", error);
      // Alert.alert(
      //   "Error",
      //   "Failed to send reaction. Please check your connection."
      // );
    }
  };

  return (
    <View style={styles.container}>
      <PlainView style={styles.reactionContainer}>
        {reactions.map((reaction, index) => (
          <TouchableOpacity
            key={reaction}
            onPress={() => handleReactionPress(reaction)}
            style={[
              styles.reactionButton,
              selectedReaction === reaction && styles.selectedReaction,
            ]}
          >
            <Text style={styles.title}>{reaction}</Text>
          </TouchableOpacity>
        ))}
      </PlainView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "auto",
    padding: 5,
    borderRadius: 10,
    opacity: 0.9,
  },
  title: {
    fontSize: 20,
  },
  reactionContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  reactionButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedReaction: {
    backgroundColor: "#d3d3d3",
  },
});
