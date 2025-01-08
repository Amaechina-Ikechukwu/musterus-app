import AnimatedLoading from "@/constants/AnimatedLoading";
import Colors, { accent } from "@/constants/Colors";
import GroupListCard from "@/constants/GroupListCard";
import { api, checkMediaType, newAvatar } from "@/constants/shortened";
import { Group, Post, ProfileInfo } from "@/constants/types";
import { useNotification } from "@/contexts/NotificationContext";
import { MStore } from "@/mstore";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { useShallow } from "zustand/react/shallow";
import { Text, View } from "../Themed";
import { mwidth } from "@/constants/ScreenDimensions";
import { router } from "expo-router";
import PostCard from "../Posts/PostCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Comments } from "../Posts/CommentSheet";
import { Image } from "react-native";
import VideoPlayer from "../Posts/VideoPlayer";
import { UserAvatar } from "@/constants/UserAvatar";
import ProfileHeadingInfo from "./ProfileInfo";

const { width } = Dimensions.get("window");

const UserPost = ({ post }: { post: Post }) => {
  const colorScheme = useColorScheme() ?? "light";
  const [loading, setLoading] = useState(true);
  const [updateSinglePost] = MStore(
    useShallow((state) => [state.updateSinglePost])
  );
  return (
    <View
      style={[{ backgroundColor: Colors[colorScheme].darkTint, zIndex: 999 }]}
    >
      <View style={styles.postHeader}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <UserAvatar
            imageUrl={
              api && post.avatar
                ? `${api.slice(0, -3)}${post.avatar.slice(1)}`
                : ""
            }
            name={`${post.firstname} ${post.lastname}` || ""}
          />
          <Text>{`${post.firstname} ${post.lastname}`}</Text>
        </View>
        <Text style={{ fontWeight: "300" }}>{post.writetime}</Text>
      </View>
      <View style={styles.postView}>
        <Text style={styles.title}>{post.comment}</Text>
        {post.attachedimage && typeof post.attachedimage === "string" && (
          <>
            {loading && checkMediaType(post.attachedimage) == "image" && (
              <View style={styles.loader}>
                <ActivityIndicator size="small" color={accent} />
              </View>
            )}
            {(() => {
              const mediaType = checkMediaType(post.attachedimage);

              if (mediaType === "image") {
                return (
                  <Image
                    style={[styles.image]}
                    source={{ uri: newAvatar(post.attachedimage) }}
                    onLoadEnd={() => setLoading(false)}
                    onError={(error) => {
                      setLoading(false);
                    }}
                  />
                );
              } else if (mediaType === "video") {
                return (
                  <VideoPlayer
                    url={newAvatar(post.attachedimage)}
                    comid={post.comid}
                  />
                );
              } else {
                console.warn("Unsupported media type:", post.attachedimage);
                return <Text>Unsupported media type</Text>;
              }
            })()}
          </>
        )}
      </View>
    </View>
  );
};
const TabLabels = ["Posts", "Followers", "Friends"];
const TabOne = () => {
  const [profileInfo, profile] = MStore(
    useShallow((state) => [state.profileInfo, state.profile])
  );
  const posts = profileInfo?.MyPosts;
  const MemoizedPostCard = React.memo(PostCard);
  const [singlePost, updateSinglePost, updatePostInView] = MStore(
    useShallow((state) => [
      state.singlePost,
      state.updateSinglePost,
      state.updatePostInView,
    ])
  );
  return (
    <View style={styles.tabContent}>
      <View style={styles.container}>
        <GestureHandlerRootView>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.comid}
            renderItem={({ item }) => <MemoizedPostCard post={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20 }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            scrollEventThrottle={16}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
            ListEmptyComponent={() => <Text>No Post Yet</Text>}
          />

          {/* Bottom Sheet */}
          <Comments
            singlePost={singlePost}
            updateSinglePost={updateSinglePost}
            profile={profile}
          />
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

const TabTwo = () => {
  return (
    <View style={styles.tabContent}>
      <Text>Added Soon</Text>
    </View>
  );
};
const TabThree = () => {
  return (
    <View style={styles.tabContent}>
      <Text>Added Soon</Text>
    </View>
  );
};
const ProfileInfoHeaders = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [tabContentHeight, setTabContentHeight] = useState<number[]>([]);
  const [profile, updateProfileInfo, profileInfo] = MStore(
    useShallow((state) => [
      state.profile,
      state.updateProfileInfo,
      state.profileInfo,
    ])
  );
  const { showNotification } = useNotification();

  const fetchProfileInfo = async () => {
    try {
      const response = await fetch(
        `${api}/mu/${profile?.publicurl}?mykey=${profile?.profilekey}&mskl=${profile?.mskl}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: ProfileInfo = await response.json();

      updateProfileInfo({
        MyPosts: data.MyPosts,
        MyFollowers: data.MyFollowers,
        MyFriends: data.MyFriends,
      });
    } catch (err) {
      console.error("Error fetching profile information:", err);
      showNotification(
        "Failed to fetch profile information. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);
  const onTabPress = (index: number) => setActiveTab(index);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <TabOne />;
      case 1:
        return <TabTwo />;
      case 2:
        return <TabThree />;
      default:
        return null;
    }
  };

  const handleContentSizeChange = (index: number, height: number) => {
    const updatedHeights = [...tabContentHeight];
    updatedHeights[index] = height;
    setTabContentHeight(updatedHeights);
  };

  const renderHeader = () => <ProfileHeadingInfo />;

  const renderTabs = () => (
    <View style={styles.header}>
      {TabLabels.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, activeTab === index ? styles.activeTab : null]}
          onPress={() => onTabPress(index)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === index ? styles.activeTabText : null,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlatList
          data={[{ key: "header" }, { key: "tabs" }, { key: "content" }]}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            if (item.key === "header") {
              return renderHeader();
            }
            if (item.key === "tabs") {
              return renderTabs();
            }
            if (item.key === "content") {
              return (
                <View style={styles.tabContent}>{renderTabContent()}</View>
              );
            }
          }}
          stickyHeaderIndices={[1]} // Make the tabs sticky
          showsVerticalScrollIndicator={false}
        />
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: accent,
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: accent,
    fontWeight: "bold",
  },
  tabContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  listContent: {
    paddingBottom: 15, // Add padding to avoid clipping at the end
  },
  postHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    opacity: 0.7,
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 30,
  },
  postView: {
    padding: 20,
    gap: 10,
  },
  loader: {
    position: "relative",
    zIndex: 1,
  },
  reaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

export default ProfileInfoHeaders;
