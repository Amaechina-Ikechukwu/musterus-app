import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { APIResponse, GroupPost } from "@/constants/types";
import { api } from "@/constants/shortened";
import { Text, View } from "../Themed";
import Colors from "@/constants/Colors";

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
  const colorScheme = useColorScheme() ?? "light";
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
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [drafts]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Custom Dropdown */}
      <View>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownText}>
            {drafts === 0 ? "Approved Posts" : "Draft Posts"}
          </Text>
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
        <Text>Loading posts...</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.grouppostid}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 16,
                gap: 4,
                backgroundColor: Colors[colorScheme].darkTint,
                padding: 10,
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
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownOptions: {
    backgroundColor: "#ffffff",
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
