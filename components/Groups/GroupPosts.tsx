import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Animated,
} from "react-native";
import { APIResponse, GroupPost } from "@/constants/types";
import { api } from "@/constants/shortened";
import { Text, View } from "../Themed";
import Colors, { accent } from "@/constants/Colors";
import AnimatedLoading from "@/constants/AnimatedLoading";
import { mwidth } from "@/constants/ScreenDimensions";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";

interface GroupPostsProps {
  mykey: string;
  mskl: string;
  uid: string;
  group: string | string[];
}

const GroupPosts: React.FC<GroupPostsProps> = ({ mykey, mskl, uid, group }) => {
  const [posts, setPosts] = useState<GroupPost[]>([]);
  const [drafts, setDrafts] = useState<number>(0); // 0: Approved Posts, 1: Drafts
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [updateGroupMembers] = MStore(
    useShallow((state) => [state.updateGroupMembers])
  );
  const colorScheme = useColorScheme() ?? "light";

  const buttonOpacity = useRef(new Animated.Value(1)).current; // Control button visibility
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url = `${api}/groups/posts?mykey=${mykey}&mskl=${mskl}&uid=${uid}&drafts=${drafts}&group=${group}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: APIResponse = await response.json();
      setPosts(data.Posts || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const fetchGroupMembers = async () => {
    setLoading(true);
    try {
      const url = `${api}/groups/view?mykey=${mykey}&mskl=${mskl}&group=${group}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      updateGroupMembers(data.Members || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupMembers();
  }, []);
  useEffect(() => {
    fetchPosts();
  }, [drafts]);

  const handleScroll = () => {
    // Only animate if the number of items is 7 or more
    if (posts.length < 7) return;

    // Show button when scrolling starts
    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Reset timer to hide button after 3 seconds
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 3000);
  };

  useEffect(() => {
    // Only animate if the number of items is 7 or more
    if (posts.length < 7) {
      // Show button when scrolling starts
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, padding: 16, width: mwidth }}>
      {/* Custom Dropdown */}
      <View>
        <TouchableOpacity
          style={[styles.dropdownButton, { backgroundColor: accent }]}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={[styles.dropdownText, { color: Colors.dark.text }]}>
            {drafts === 0 ? "Approved Posts" : "Draft Posts"}
          </Text>
          <AntDesign name="down" size={18} color={Colors.dark.text} />
        </TouchableOpacity>

        {dropdownVisible && (
          <View style={styles.dropdownOptions}>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setDrafts(0);
                setDropdownVisible(false);
              }}
            >
              <Text>Approved Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setDrafts(1);
                setDropdownVisible(false);
              }}
            >
              <Text>Draft Posts</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Posts List */}
      {loading ? (
        <View style={styles.container}>
          <AnimatedLoading />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => item.grouppostid}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 16,
                gap: 4,
                backgroundColor: Colors[colorScheme].darkTint,
                padding: 10,
                width: mwidth * 0.9,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {item.posttitle}
              </Text>
              <Text style={{ fontSize: 16, lineHeight: 25 }}>
                {item.postbody.replace(/<[^>]*>?/gm, "")}
              </Text>
              <Text style={{ color: "gray", fontSize: 16 }}>
                By {item.firstname || item.username} on {item.posttime}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => <Text>No posts yet</Text>}
          onScroll={handleScroll}
        />
      )}

      {/* Create Post Button with Animation */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          opacity: buttonOpacity,
          transform: [
            {
              scale: buttonOpacity.interpolate({
                inputRange: [0, 1.5],
                outputRange: [0.9, 1.5],
              }),
            },
          ],
        }}
      >
        <TouchableOpacity
          style={{ padding: 10, borderRadius: 10, backgroundColor: accent }}
          onPress={() => router.push(`/groups/${group}/createpost`)}
        >
          <Text style={{ color: Colors.dark.text }}>Create Post</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownOptions: {
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default GroupPosts;
