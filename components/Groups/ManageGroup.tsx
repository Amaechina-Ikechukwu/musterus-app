import React, { useState, useCallback, useMemo } from "react";
import {
  FlatList,
  TouchableOpacity,
  View as PlainView,
  StyleSheet,
} from "react-native";
import { useColorScheme } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Colors, { accent } from "@/constants/Colors";
import { UserAvatar } from "@/constants/UserAvatar";
import { newAvatar } from "@/constants/shortened";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import AnimatedLoading from "@/constants/AnimatedLoading";
import { GroupMember } from "@/constants/types";
import { mwidth } from "@/constants/ScreenDimensions";
import { Text, View } from "../Themed";
import { useNotification } from "@/contexts/NotificationContext";

interface ManageGroupProps {
  mykey: string;
  mskl: string;
  uid: string;
  grid: string | number; // 0 for new group, otherwise group ID
}

interface GroupMemberItemProps {
  item: GroupMember;
  isExpanded: boolean;
  onToggle: () => void;
  mykey: string;
  mskl: string;
  grid: string | number;
}

const GroupMemberItem: React.FC<GroupMemberItemProps> = ({
  item,
  isExpanded,
  onToggle,
  mykey,
  mskl,
  grid,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const height = useSharedValue(isExpanded ? 50 : 0);
  const { showNotification } = useNotification();

  // handleInvite function to manage group member actions
  const handleInvite = async (memberId: string, action: string) => {
    try {
      const url = `https://www.musterus.com/ws/groups/manage?mykey=${mykey}&mskl=${mskl}&group=${grid}&action=${action}&member=${memberId}`;
      const response = await fetch(url, { method: "POST" });

      if (!response.ok) {
        throw new Error(`Failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.err === 0) {
        showNotification(`${action} sent successfully!`);
      } else {
        throw new Error(data.message || `Failed to send ${action}. `);
      }
    } catch (error) {
      showNotification(`Failed to ${action} member. Please try again later.`);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(height.value, { duration: 300 }),
    opacity: withTiming(isExpanded ? 1 : 0, { duration: 300 }),
  }));

  const handleToggle = () => {
    onToggle();
    height.value = isExpanded ? 0 : 50; // Animate the height change
  };

  return (
    <PlainView
      style={[
        styles.profileContainer,
        { backgroundColor: Colors[colorScheme].darkTint },
      ]}
    >
      <View
        style={[
          styles.profileHeader,
          {
            alignItems: isExpanded ? "flex-start" : "center",
            backgroundColor: Colors[colorScheme].darkTint,
          },
        ]}
      >
        <View
          style={[
            styles.userDetails,
            {
              alignItems: isExpanded ? "flex-start" : "center",
              backgroundColor: Colors[colorScheme].darkTint,
            },
          ]}
        >
          <UserAvatar
            imageUrl={newAvatar(item.avatar)}
            size={50}
            name={`${item.firstname} ${item.lastname}`}
          />
          <View
            style={{
              width: "80%",
              gap: 5,
              backgroundColor: Colors[colorScheme].darkTint,
            }}
          >
            <Text style={styles.userName}>
              {item.firstname} {item.lastname}
            </Text>

            <Animated.View style={[styles.buttonsContainer, animatedStyle]}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    borderWidth: 1,
                    borderColor: Colors[colorScheme].tabIconSelected,
                  },
                ]}
                onPress={() => handleInvite(item.memberid, "invite")}
              >
                <Text style={styles.buttonText}>Invite</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { borderWidth: 1, borderColor: "yellow" },
                ]}
                onPress={() => handleInvite(item.memberid, "approve")}
              >
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { borderWidth: 1, borderColor: accent },
                ]}
                onPress={() => handleInvite(item.memberid, "moderator")}
              >
                <Text style={styles.buttonText}>Make Moderator</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
        <TouchableOpacity onPress={handleToggle}>
          <AntDesign
            name={isExpanded ? "down" : "right"}
            size={20}
            color={Colors[colorScheme].text}
          />
        </TouchableOpacity>
      </View>
    </PlainView>
  );
};

const ManageGroup: React.FC<ManageGroupProps> = ({
  mykey,
  mskl,
  uid,
  grid,
}) => {
  const [expandedIndices, setExpandedIndices] = useState<boolean[]>([]);

  // Extract `groupMembers` from the store
  const [groupMembers] = MStore(useShallow((state) => [state.groupMembers]));

  const toggleExpansion = useCallback((index: number) => {
    setExpandedIndices((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: GroupMember; index: number }) => {
      const isExpanded = !!expandedIndices[index];
      return (
        <GroupMemberItem
          item={item}
          isExpanded={isExpanded}
          onToggle={() => toggleExpansion(index)}
          mykey={mykey}
          mskl={mskl}
          grid={grid}
        />
      );
    },
    [expandedIndices, toggleExpansion, mykey, mskl, grid]
  );

  const memoizedGroupMembers = useMemo(() => groupMembers, [groupMembers]);

  return (
    <View style={styles.container}>
      <FlatList
        data={memoizedGroupMembers}
        keyExtractor={(item) => item.memberid}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={AnimatedLoading}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: mwidth,
  },
  listContainer: {
    paddingBottom: 20,
  },
  profileContainer: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  userName: {
    fontWeight: "700",
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  actionButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#333",
  },
});

export default ManageGroup;
