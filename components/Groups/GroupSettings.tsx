import {
  Touchable,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React from "react";
import { Text, View } from "../Themed";
import { mwidth } from "@/constants/ScreenDimensions";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

export default function GroupSettings({ group }: { group: string }) {
  const colorScheme = useColorScheme() ?? "light";
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, padding: 20 }}>Settings</Text>
      <TouchableOpacity
        style={[
          styles.button,
          { borderBottomColor: Colors[colorScheme].tabIconDefault },
        ]}
        onPress={() => router.push(`/groups/${group}/settings/edit`)}
      >
        <Text>Edit Group</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          { borderBottomColor: Colors[colorScheme].tabIconDefault },
        ]}
        onPress={() => router.push(`/groups/${group}/settings/manage`)}
      >
        <Text>Manage Members</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: mwidth,
  },
  button: {
    borderBottomWidth: 1,
    padding: 20,
  },
});
