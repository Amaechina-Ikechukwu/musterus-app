import React, { useEffect, useState } from "react";
import {
  View as PlainView,
  StyleSheet,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { api } from "@/constants/shortened";
import MInput from "@/UIComponents/MInput";
import MButton from "@/UIComponents/MButton";
import { useNotification } from "@/contexts/NotificationContext";
import { View } from "../Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { mwidth } from "@/constants/ScreenDimensions";
import { useNavigation } from "expo-router";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { showNotification } = useNotification();
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      showNotification("You did not select any image.");
    }
  };

  const handleSubmit = async () => {
    if (selectedImage !== null && !caption) {
      showNotification("Please add a caption when an image is selected.");
      return;
    }

    const formData = new FormData();
    formData.append("mykey", profile?.profilekey); // Replace with actual key
    formData.append("upsection", "3");

    if (selectedImage) {
      const fileName = selectedImage.split("/").pop();
      const fileType = fileName?.split(".").pop();

      formData.append("userfile", {
        uri: selectedImage,
        name: fileName,
        type: `image/${fileType}`,
      } as any);
    }

    if (caption) {
      formData.append("caption", caption);
    }

    try {
      const response = await fetch(`${api}/postcomment`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        showNotification("Your post has been shared successfully!");
        setCaption("");
        setSelectedImage(null);
      } else {
        throw new Error(result.message || "Failed to upload");
      }
    } catch (error) {
      showNotification("An error occurred. Please try again.");
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Post",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      )}
      <PlainView
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <MInput
          label="Caption"
          placeholder="Add a caption for your image..."
          value={caption}
          onChange={(text) => setCaption(text)}
        />
        <TouchableOpacity onPress={handleImagePick}>
          <MaterialCommunityIcons
            name="file-image-plus-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </PlainView>

      <MButton
        title="Upload"
        onPress={() => handleSubmit()}
        disabled={!caption} // Condition updated
        style={[styles.button, !caption && { opacity: 0.5 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    gap: 20,
  },

  button: {
    width: mwidth * 0.9,
  },
  imagePreview: {
    width: mwidth * 0.9,
    height: mwidth * 0.8,
    borderRadius: 10,
  },
});

export default CreatePost;
