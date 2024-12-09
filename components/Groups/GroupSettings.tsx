import { Touchable, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "../Themed";
import { mwidth } from "@/constants/ScreenDimensions";
import { router } from "expo-router";

export default function GroupSettings({ group }: { group: string }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, padding: 20 }}>Settings</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(`/groups/${group}/settings/edit`)}
      >
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(`/groups/${group}/settings/manage`)}
      >
        <Text>Manage</Text>
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
