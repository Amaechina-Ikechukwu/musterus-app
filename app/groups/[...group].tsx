import CreateGroupPost from "@/components/Groups/CreateGroupPost";
import Editgroup from "@/components/Groups/EditGroup";
import GroupPosts from "@/components/Groups/GroupPosts";
import GroupSettings from "@/components/Groups/GroupSettings";
import SubscribeGroup from "@/components/Groups/SubscribeToGroup";
import AnimatedLoading from "@/constants/AnimatedLoading";
import Colors from "@/constants/Colors";
import { MStore } from "@/mstore";
import { EvilIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function GroupsScreen() {
  const { group } = useLocalSearchParams();
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? "light";
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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: singleGroup.groupname,
      headerRight: () =>
        group.length == 1 && (
          <TouchableOpacity
            onPress={() => router.push(`/groups/${group}/settings`)}
          >
            <EvilIcons name="gear" size={24} color={Colors[colorScheme].text} />
          </TouchableOpacity>
        ),
    });
  }, [navigation]);
  if (singleGroup.groupstatus == "0") {
    return <SubscribeGroup />;
  }
  if (group.length > 1) {
    if (group[group.length - 1] == "createpost") {
      return (
        <View style={[styles.container]}>
          <CreateGroupPost
            group={group[0]}
            mskl={profile?.mskl}
            mykey={profile?.profilekey}
            uid={profile?.uid}
            postid="0"
          />
        </View>
      );
    }
    if (group[group.length - 1] == "settings") {
      return (
        <View style={[styles.container]}>
          <GroupSettings group={group[0]} />
        </View>
      );
    }
    if (group[group.length - 1] == "edit") {
      return (
        <View style={[styles.container]}>
          <Editgroup
            mskl={profile?.mskl}
            mykey={profile?.profilekey}
            uid={profile?.uid}
            grid={group[0]}
          />
        </View>
      );
    }
    return (
      <View>
        <Text>{group[1].toUpperCase()}</Text>
      </View>
    );
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
