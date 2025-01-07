import AnimatedLoading from "@/constants/AnimatedLoading";
import { accent } from "@/constants/Colors";
import GroupListCard from "@/constants/GroupListCard";
import { api, newAvatar } from "@/constants/shortened";
import { Group, ProfileInfo } from "@/constants/types";
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
} from "react-native";
import { useShallow } from "zustand/react/shallow";
import { Text, View } from "../Themed";
import { mwidth } from "@/constants/ScreenDimensions";
import { router } from "expo-router";
import PostCard from "../Posts/PostCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Comments } from "../Posts/CommentSheet";

const { width } = Dimensions.get("window");

const GroupList = ({ groups }: { groups: Group[] | null }) => {
  const [updateSingleGroup] = MStore(
    useShallow((state) => [state.updateSingleGroup])
  );
  if (!groups) {
    return <AnimatedLoading />;
  }
  const handleRouting = (item: Group) => {
    updateSingleGroup(item);
    router.push(`/groups/${item.groupkey}`);
  };
  return (
    <View style={{}}>
      <FlatList
        data={groups}
        keyExtractor={(item, index) => `${item.groupname}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRouting(item)}>
            <GroupListCard
              avatarImage={item.groupheader && newAvatar(item.groupheader)}
              backgroundImage={item.groupbg && newAvatar(item.groupbg)}
              group={item}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const TabOne = () => {
  const [profileInfo, profile] = MStore(
    useShallow((state) => [state.profileInfo, state.profile])
  );
  const posts = profileInfo?.MyPost;
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Post List */}
          <Animated.FlatList
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
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const TabTwo = () => {
  const [myGroups] = MStore(useShallow((state) => [state.myGroups]));
  return (
    <View style={styles.tabContent}>
      <Text>Added Soon</Text>
    </View>
  );
};
const TabThree = () => {
  const [myGroups] = MStore(useShallow((state) => [state.myGroups]));
  return (
    <View style={styles.tabContent}>
      <Text>Added Soon</Text>
    </View>
  );
};

const ProfileInfoHeaders = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
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
      const { data }: { data: ProfileInfo } = await axios.get(
        `${api}/mu/${profile?.publicurl}?mykey=${profile?.profilekey}&mskl=${profile?.mskl}`
      );

      updateProfileInfo({
        MyPost: data.MyPost,
        MyFollowers: data.MyFollowers,
        MyFriends: data.MyFriends,
      });
    } catch (err) {
      showNotification(
        "Failed to fetch profile information. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);
  const onTabPress = (index: number) => {
    setActiveTab(index);
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setActiveTab(newIndex);
  };

  return (
    <View style={styles.container}>
      {/* Header Tabs */}
      <View style={styles.header}>
        {["Posts", "Followrs", "Friends"].map((tab, index) => (
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

      {/* Swipable Views */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        ref={scrollViewRef}
      >
        <View style={{ width }}>
          <TabOne />
        </View>
        <View style={{ width }}>
          <TabTwo />
        </View>
        <View style={{ width }}>
          <TabThree />
        </View>
      </ScrollView>
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
});

export default ProfileInfoHeaders;
