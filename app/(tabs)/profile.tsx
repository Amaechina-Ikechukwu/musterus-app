import { StyleSheet } from "react-native";


import { Text, View } from "@/components/Themed";

import ProfileIndex from "@/components/Profile/ProfileIndex";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ProfileIndex />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
