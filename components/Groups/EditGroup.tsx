import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Alert,
} from "react-native";
import { Text } from "../Themed";
import Colors, { accent } from "@/constants/Colors";
import { mwidth } from "@/constants/ScreenDimensions";
import { api } from "@/constants/shortened";
import MInput from "@/UIComponents/MInput";
import MButton from "@/UIComponents/MButton";

interface EditgroupProps {
  mykey: string;
  mskl: string;
  uid: string;
  grid?: string | number; // 0 for new group, otherwise group ID
}

const Editgroup: React.FC<EditgroupProps> = ({
  mykey,
  mskl,
  uid,
  grid = 0,
}) => {
  const colorScheme = useColorScheme() ?? "light";

  const [groupName, setGroupName] = useState("");
  const [groupCategory, setGroupCategory] = useState("");
  const [moderated, setModerated] = useState(0); // 0 = No, 1 = Yes
  const [publicGroup, setPublicGroup] = useState(0); // 0 = Public, 1 = Private
  const [groupIntro, setGroupIntro] = useState("");
  const [groupPolicy, setGroupPolicy] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = async () => {
    if (!groupName.trim() || !groupCategory.trim()) {
      Alert.alert("Validation Error", "Group name and category are required.");
      return;
    }

    const url = `${api}/groups/edit`;
    const payload = {
      mykey,
      mskl,
      uid,
      list: 2, // Assuming the user owns the group for editing/creating
      grid, // 0 for new group creation or existing group ID for editing
      groupname: groupName,
      groupcategory: groupCategory,
      moderated,
      publicgroup: publicGroup,
      groupintro: [groupIntro],
      grouppolicy: [groupPolicy],
      website,
      sj: "edit", // API-required key for editing/creating groups
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert(
          "Success",
          grid === 0
            ? "Group created successfully!"
            : "Group updated successfully!"
        );
      } else {
        throw new Error(data.message || "Failed to save group.");
      }
    } catch (error) {
      console.error("Error saving group:", error);
      Alert.alert("Error", "Unable to save group. Please try again later.");
    }
  };

  return (
    <ScrollView
      style={{
        width: mwidth,
        padding: 40,
        backgroundColor: Colors[colorScheme].background,
      }}
    >
      <MInput
        label="Group Name"
        placeholder="Enter group name"
        value={groupName}
        onChange={setGroupName}
      />

      <MInput
        label="Group Category"
        placeholder="Enter group category"
        value={groupCategory}
        onChange={setGroupCategory}
      />

      <MInput
        label="Moderated"
        placeholder="Enter 0 for No, 1 for Yes"
        value={String(moderated)}
        onChange={(value) => setModerated(Number(value))}
        keyboardType="numeric"
      />

      <MInput
        label="Public Group"
        placeholder="Enter 0 for Public, 1 for Private"
        value={String(publicGroup)}
        onChange={(value) => setPublicGroup(Number(value))}
        keyboardType="numeric"
      />

      <MInput
        label="Group Introduction"
        placeholder="Enter group introduction"
        value={groupIntro}
        onChange={setGroupIntro}
        multiline
      />

      <MInput
        label="Group Policy"
        placeholder="Enter group policy"
        value={groupPolicy}
        onChange={setGroupPolicy}
        multiline
      />

      <MInput
        label="Website"
        placeholder="Enter website URL"
        value={website}
        onChange={setWebsite}
      />

      <MButton
        title={grid === 0 ? "Create Group" : "Update Group"}
        onPress={handleSubmit}
        style={styles.submitButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: accent,
    marginTop: 16,
  },
});

export default Editgroup;
