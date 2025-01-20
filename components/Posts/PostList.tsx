import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Text, View } from "@/components/Themed";
import Colors, { accent } from "@/constants/Colors";
import PostCard from "@/components/Posts/PostCard";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Comments } from "@/components/Posts/CommentSheet";
import AnimatedLoading from "@/constants/AnimatedLoading";
import { Post } from "@/constants/types";
import { router } from "expo-router";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const MemoizedPostCard = React.memo(PostCard);
export default function PostList() {
  const [posts, profile] = MStore(
    useShallow((state) => [state.posts, state.profile])
  );
  const [singlePost, updateSinglePost, updatePostInView] = MStore(
    useShallow((state) => [
      state.singlePost,
      state.updateSinglePost,
      state.updatePostInView,
    ])
  );

  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0); // Track the last scroll position
  const buttonVisible = useRef(true); // Track button visibility state
  const footerOpacity = useRef(new Animated.Value(1)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const diff = currentScrollY - lastScrollY.current;

        if (Math.abs(diff) < 20) return; // Ignore small scroll movements

        if (diff > 0 && buttonVisible.current) {
          buttonVisible.current = false;
          Animated.timing(footerOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else if (diff < 0 && !buttonVisible.current) {
          buttonVisible.current = true;
          Animated.timing(footerOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }

        lastScrollY.current = currentScrollY;
      },
    }
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: any }) => {
      // Loop through the array of viewable items
      viewableItems.forEach(({ item }: { item: any }) => {
        updatePostInView(item.comid); // Access comid for each viewable post
      });

      // Optionally update visible posts
      // updatePostInView(viewableItems);
    },
    []
  );

  if (!posts || !profile) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <AnimatedLoading />
      </View>
    );
  }

  return (
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
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewableItemsChanged} // Now handled correctly outside render
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        />

        {!singlePost && (
          <AnimatedTouchable
            style={[styles.floatButton, { opacity: footerOpacity }]}
            onPress={() => router.push("/posts")}
          >
            <Text style={styles.footerText}>M+</Text>
          </AnimatedTouchable>
        )}

        {/* Bottom Sheet */}
        <Comments
          singlePost={singlePost}
          updateSinglePost={updateSinglePost}
          profile={profile}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  floatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: accent,
    borderRadius: 50,
    padding: 12,
    zIndex: 99,
  },
  footerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark.text,
  },
  sheetContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    color: Colors.dark.text,
    textAlign: "center",
  },
});
