import GroupPosts from "@/components/Groups/GroupPosts";
import SubscribeGroup from "@/components/Groups/SubscribeToGroup";
import AnimatedLoading from "@/constants/AnimatedLoading";
import { MStore } from "@/mstore";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function GroupsScreen() {
  const { group } = useLocalSearchParams();
  const [singleGroup, profile] = MStore(
    useShallow((state) => [state.singleGroup, state.profile])
  );
  if (!singleGroup || !profile) {
    return (
      <View style={styles.container}>
        <AnimatedLoading />
      </View>
    );
  }
  if (singleGroup.groupstatus == "0") {
    return <SubscribeGroup />;
  }
  return (
    <View style={styles.container}>
      <GroupPosts
        group={group}
        mskl={profile?.mskl}
        mykey={profile?.profilekey}
        uid={profile?.uid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
