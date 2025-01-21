import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Alert,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
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
import { router } from "expo-router";

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
  const [singleGroup, profile] = MStore(
    useShallow((state) => [state.singleGroup, state.profile])
  );
  if (!singleGroup) {
    return <AnimatedLoading />;
  }
  const [groupName, setGroupName] = useState(singleGroup?.groupname || "");
  const [groupCategory, setGroupCategory] = useState(
    singleGroup?.groupcategory || ""
  );
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    singleGroup?.groupcategory || null
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

    const params = new URLSearchParams({
      mykey: profile?.profilekey || "",
      mskl: profile?.mskl || "",
      uid: profile?.uid || "",
      group: singleGroup.groupkey,
      groupname: groupName,
      groupcategory: groupCategory,
      moderated: moderated.toString(),
      publicGroup: publicGroup.toString(),
      groupintro: groupIntro,
      grouppolicy: groupPolicy,
      website: website || "",
    });

    const url = `${api}/groups/update?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: "GET", // Changed to GET since we're submitting through query params
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.err == 0) {
        showNotification("Group updated successfully!");
        router.back();
      } else {
        throw new Error(data.message || "Failed to save group.");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("Unable to save group. Please try again later.");
    }
  };

  const handlePress = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null); // Deactivate if clicked again
    } else {
      setActiveCategory(category);
      setGroupCategory(category);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://www.musterus.com/ws/groups/edit?mykey=${mykey}&mskl=${mskl}&sj=edit&grid=${grid}&list=1&uid=5`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();

        if (data?.GroupCategoryList) {
          setCategories(data.GroupCategoryList);
        } else {
          showNotification("Invalid response format.");
        }
      } catch (err: any) {
        showNotification(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
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
        onChange={(text) => setGroupName(text)}
      />

      <MInput
        label="Group Introduction"
        placeholder="Enter group introduction"
        value={groupIntro}
        onChange={(text) => setGroupIntro(text)}
        multiline
      />

      {categories ? (
        <>
          <Text style={{ fontWeight: "bold" }}>Group Category</Text>
          <ScrollView horizontal contentContainerStyle={{ gap: 10 }}>
            {categories.map((item: any) => (
              <TouchableOpacity
                key={item.gcatrow}
                style={[
                  styles.button,
                  activeCategory === item.gcatrow
                    ? styles.activeButton
                    : styles.inactiveButton,
                ]}
                onPress={() => handlePress(item.gcatrow)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    activeCategory === item.gcatrow
                      ? styles.activeText
                      : styles.inactiveText,
                  ]}
                >
                  {item.catname}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator />
      )}

      <MInput
        label="Group Policy"
        placeholder="Enter group policy"
        value={groupPolicy}
        onChange={(text) => setGroupPolicy(text)}
        multiline
      />

      <MInput
        label="Website"
        placeholder="Enter website URL"
        value={website}
        onChange={(text) => setWebsite(text)}
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
  button: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: accent,
  },
  inactiveButton: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
  },
  inactiveText: {
    color: "#000",
  },
});

export default Editgroup;
