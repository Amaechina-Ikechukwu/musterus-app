import React, { useState } from "react";
import { View, StyleSheet, Alert, Image, useColorScheme } from "react-native";
import Colors, { accent } from "@/constants/Colors";
import MButton from "@/UIComponents/MButton";
import MInput from "@/UIComponents/MInput";
import * as ImagePicker from "expo-image-picker";
import { api } from "@/constants/shortened";

interface ImageUploadProps {
  mykey: string;
  mskl: string;
  uid: string;
  group: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  mykey,
  mskl,
  uid,
  group,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageCaption, setImageCaption] = useState("");
  const [uploadSection, setUploadSection] = useState("TYPE_GROUP_LOGO"); // Default section

  const handleChooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Please grant media library access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImageUri(result.assets[0].uri || null);
    }
  };

  const handleUpload = async () => {
    if (!imageUri) {
      Alert.alert("Validation Error", "Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("mykey", mykey);
    formData.append("mskl", mskl);
    formData.append("uid", uid);
    formData.append("group", group);
    formData.append("locatn", "groups");
    formData.append("imagecaption", imageCaption);
    formData.append("upsection", uploadSection);
    formData.append("userfile", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    } as any); // 'as any' needed to satisfy FormData type

    try {
      const response = await fetch(`${api}/groups/imageupload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert("Success", "Image uploaded successfully!");
      } else {
        throw new Error(data.message || "Upload failed.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to upload the image. Please try again later."
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <MInput
        label="Image Caption"
        placeholder="Enter image caption"
        value={imageCaption}
        onChange={setImageCaption}
      />

      <MInput
        label="Upload Section"
        placeholder="Enter upload section"
        value={uploadSection}
        onChange={setUploadSection}
      />

      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

      <MButton
        title="Choose Image"
        onPress={handleChooseImage}
        style={styles.button}
      />
      <MButton
        title="Upload Image"
        onPress={handleUpload}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 10,
    backgroundColor: accent,
  },
  preview: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default ImageUpload;
