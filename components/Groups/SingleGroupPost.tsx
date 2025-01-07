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
import Colors, { accent } from "@/constants/Colors";
import AnimatedLoading from "@/constants/AnimatedLoading";
import { mwidth } from "@/constants/ScreenDimensions";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

interface SingleGroupPostProps {
  mykey: string;
  mskl: string;
  uid: string;
  group: string | string[];
  postid: string;
}

const SingleGroupPost: React.FC<SingleGroupPostProps> = ({
  mykey,
  mskl,
  uid,
  group,
  postid,
}) => {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [drafts]);

  return (
    <View style={{ flex: 1, padding: 16, width: mwidth }}>
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
            <TouchableOpacity
              onPress={() => router.push(`groups/${group}/${item.grouppostid}`)}
            >
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
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => <Text>No posts yet</Text>}
        />
      )}
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

export default SingleGroupPost;
