import Colors from "@/constants/Colors";
import { mwidth } from "@/constants/ScreenDimensions";
import { useNotification } from "@/contexts/NotificationContext";
import MButton from "@/UIComponents/MButton";
import MInput from "@/UIComponents/MInput";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  useColorScheme,
} from "react-native";

interface CreateGroupPostProps {
  mykey: string;
  mskl: string;
  uid: string;
  group: string | string[];
  postid?: string; // Optional for editing an existing post
}

const CreateGroupPost: React.FC<CreateGroupPostProps> = ({
  mykey,
  mskl,
  uid,
  group,
  postid,
}) => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme() ?? "light";
  const { showNotification } = useNotification();
  const handleCreateOrEditPost = async () => {
    if (!postTitle || !postBody) {
      showNotification("Both title and body are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://www.musterus.com/ws/groups/createpost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${mskl}`,
          },
          body: JSON.stringify({
            mykey,
            mskl,
            uid,
            group,
            postid, // This will be undefined for new posts
            poststatus: "published", // Adjust as needed (e.g., draft)
            posttitle: postTitle,
            postbody: postBody,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.Post) {
        showNotification("Post has been saved successfully!");
        // Optionally, clear the inputs or navigate back
        setPostTitle("");
        setPostBody("");
      } else {
        showNotification("Failed to save the post.");
 
      }
    } catch (error) {
   
      showNotification("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 40,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 10,
      }}
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background, width: mwidth },
      ]}
    >
      <MInput
        label="Post title"
        value={postTitle}
        onChange={setPostTitle}
        placeholder="Enter the title of your post"
      />
      <MInput
        label="Body of post"
        value={postBody}
        onChange={setPostBody}
        placeholder="Enter the body of your post"
        multiline
        numberOfLines={5}
        style={styles.textArea}
      />
      <MButton
        title={postid ? "Update Post" : "Create Post"}
        onPress={handleCreateOrEditPost}
        disabled={loading}
        style={{ width: mwidth * 0.8 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
});

export default CreateGroupPost;
