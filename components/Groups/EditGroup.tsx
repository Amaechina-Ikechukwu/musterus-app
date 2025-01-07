import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { Text } from "../Themed";
import Colors, { accent } from "@/constants/Colors";
import { mwidth } from "@/constants/ScreenDimensions";
import { api } from "@/constants/shortened";
import MInput from "@/UIComponents/MInput";
import MButton from "@/UIComponents/MButton";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import AnimatedLoading from "@/constants/AnimatedLoading";
import { useNotification } from "@/contexts/NotificationContext";

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
  const { showNotification } = useNotification();
  const [singleGroup] = MStore(useShallow((state) => [state.singleGroup]));
  if (!singleGroup) {
    return <AnimatedLoading />;
  }
  const [groupName, setGroupName] = useState(singleGroup?.groupname || "");
  const [groupCategory, setGroupCategory] = useState(
    singleGroup?.groupcategory || ""
  );
  const [moderated, setModerated] = useState(singleGroup?.moderated || 0); // 0 or 1
  const [publicGroup, setPublicGroup] = useState(singleGroup?.publicgroup || 0); // 0 or 1
  const [groupIntro, setGroupIntro] = useState(singleGroup?.groupintro || "");
  const [groupPolicy, setGroupPolicy] = useState(
    singleGroup?.grouppolicy || ""
  );
  const [website, setWebsite] = useState(singleGroup?.website || "");

  const handleSubmit = async () => {
    if (!groupName.trim() || !groupCategory.trim()) {
      showNotification("Group name and category are required.");
      return;
    }
    console.log(mykey, mskl);
    const url = `${api}/groups/edit`;
    const payload = {
      mykey,
      mskl,
      uid,
      list: 2, // Assuming the user owns the group for editing/creating
      grid: singleGroup.grid, // 0 for new group creation or existing group ID for editing
      groupname: groupName,
      groupcategory: groupCategory,
      moderated,
      publicGroup,
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
      console.log(JSON.stringify(data, null, 2));

      if (data.success) {
        showNotification(
          grid === 0
            ? "Group created successfully!"
            : "Group updated successfully!"
        );
      } else {
        throw new Error(data.message || "Failed to save group.");
      }
    } catch (error) {
      showNotification("Unable to save group. Please try again later.");
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
      <View style={styles.switchContainer}>
        <Text>Moderated</Text>
        <Switch
          value={moderated === 1}
          onValueChange={(value) => setModerated(value ? 1 : 0)}
          thumbColor={moderated === 1 ? accent : Colors[colorScheme].text}
        />
      </View>

      <View style={styles.switchContainer}>
        <View>
          <Text>Public/Private Group</Text>
          <Text style={{ color: accent, fontSize: 16 }}>
            {publicGroup === 0 ? "Public Group" : "Private Group"}
          </Text>
        </View>

        <Switch
          value={publicGroup === 1}
          onValueChange={(value) => setPublicGroup(value ? 1 : 0)}
          thumbColor={publicGroup === 1 ? accent : Colors[colorScheme].text}
        />
      </View>
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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Editgroup;
