import AnimatedLoading from "@/constants/AnimatedLoading";
import { accent } from "@/constants/Colors";
import GroupListCard from "@/constants/GroupListCard";
import { api, newAvatar } from "@/constants/shortened";
import { Group } from "@/constants/types";
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
import MusterFriends from "./MusterFriends";
import MusterCards from "./MusterCards";

const { width } = Dimensions.get("window");



const TabOne = () => {
  return (
    <View style={styles.tabContent}>
      <MusterFriends />
    </View>
  );
};

const TabTwo = () => {
  const [myGroups] = MStore(useShallow((state) => [state.myGroups]));
  return (
    <View style={styles.tabContent}>
      <MusterCards />
    </View>
  );
};

const SwipableHeaderTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [profile, updateAllGroups, updateMyGroups, updateOtherGroups] = MStore(
    useShallow((state) => [
      state.profile,
      state.updateAllGroups,
      state.updateMyGroups,
      state.updateOtherGroups,
    ])
  );
  const { showNotification } = useNotification();
  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        `${api}/groups?mykey=${profile?.profilekey}&mskl=${profile?.mskl}&uid=${
          profile?.uid
        }&list=${activeTab + 1}`
      );

      // Determine which function to call based on activeTab
      switch (activeTab) {
        case 0:
          updateAllGroups(response.data.Groups);

          break;
        case 1:
          updateMyGroups(response.data.Groups);
          break;
        case 2:
          updateOtherGroups(response.data.Groups);
          break;
        default:
          throw new Error("Invalid tab value");
      }
    } catch (err) {
      showNotification("Failed to fetch comments. Please try again.");
    }
  };
  useEffect(() => {
    fetchGroups();
  }, [activeTab]);
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
        {["MusterPoint", "Events"].map((tab, index) => (
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

export default SwipableHeaderTabs;
