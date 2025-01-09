import AnimatedLoading from "@/constants/AnimatedLoading";
import Colors, { accent } from "@/constants/Colors";
import GroupListCard from "@/constants/GroupListCard";
import { api, checkMediaType, newAvatar } from "@/constants/shortened";
import {
  CommonUserInfo,
  Group,
  Post,
  ProfileInfo,
  UserProfile,
} from "@/constants/types";
import { useNotification } from "@/contexts/NotificationContext";
import { MStore } from "@/mstore";
import axios from "axios";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ScrollView,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  useColorScheme,
  View as PlainView,
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
function ListOfFriends({
  friends,
  tabName,
}: {
  friends: CommonUserInfo[];
  tabName: string;
}) {
  const colorScheme = useColorScheme() ?? "light";
  const renderItem = useCallback(({ item }: { item: CommonUserInfo }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push(`/usersprofile/${item.profilekey}/${item.publicurl}`)
        }
      >
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
                alignItems: "center",
                backgroundColor: Colors[colorScheme].darkTint,
              },
            ]}
          >
            <View
              style={[
                styles.userDetails,
                {
                  alignItems: "center",
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
              </View>
            </View>
          </View>
        </PlainView>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.uid}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => <Text>You dont have {tabName} yet</Text>}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
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
}

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
  if (!posts) {
    return <AnimatedLoading />;
  }
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
  const [profileInfo] = MStore(useShallow((state) => [state.profileInfo]));
  if (!profileInfo?.MyFriends) {
    return <AnimatedLoading />;
  }
  return (
    <View style={styles.tabContent}>
      <ListOfFriends friends={profileInfo?.MyFriends} tabName="friends" />
    </View>
  );
};
const TabThree = () => {
  const [profileInfo] = MStore(useShallow((state) => [state.profileInfo]));
  if (!profileInfo?.MyFollowers) {
    return <AnimatedLoading />;
  }
  return (
    <View style={styles.tabContent}>
      <ListOfFriends friends={profileInfo?.MyFollowers} tabName="followers" />
    </View>
  );
};
const ProfileInfoHeaders = ({ profile }: { profile: UserProfile }) => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [tabContentHeight, setTabContentHeight] = useState<number[]>([]);

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

  const renderHeader = () => <ProfileHeadingInfo profile={profile} />;

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
  container: {
    flex: 1,

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

export default ProfileInfoHeaders;
