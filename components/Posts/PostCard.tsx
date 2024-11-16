import React, { useState } from "react";
import { Text, View } from "../Themed";
import {
  ActivityIndicator,
  View as PlainView,
  TouchableOpacity,
} from "react-native";
import { Post } from "@/constants/types";
import { UserAvatar } from "@/constants/UserAvatar";
import { Image, StyleSheet, useColorScheme } from "react-native";
import { api } from "@/constants/shortened";
import Colors, { accent } from "@/constants/Colors";
import { mheight } from "@/constants/ScreenDimensions";
import ReactionComponent from "./ReactionComponents";
import { Foundation } from "@expo/vector-icons";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";

export default function PostCard({ post }: { post: Post }) {
  const colorScheme = useColorScheme() ?? "light";
  const [loading, setLoading] = useState(true);
  const [updateSinglePost] = MStore(
    useShallow((state) => [state.updateSinglePost])
  );
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].darkTint },
      ]}
    >
      <PlainView style={styles.postHeader}>
        <PlainView
          style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
        >
          <UserAvatar
            imageUrl={
              api && post.avatar
                ? `${api.slice(0, -3)}${post.avatar.slice(
                    1,
                    post.avatar.length
                  )}`
                : ""
            }
            name={post.firstname + post.lastname || ""}
            showFallback={post.avatar == null}
          />
          <Text>{post.firstname + " " + post.lastname}</Text>
        </PlainView>

        <Text style={{ fontWeight: "light" }}>{post.writetime}</Text>
      </PlainView>
      <PlainView style={styles.postView}>
        <Text style={styles.title}>{post.comment}</Text>
        {post.attachedimage && (
          <>
            {loading && (
              <PlainView style={styles.loader}>
                <ActivityIndicator size="small" color={accent} />
              </PlainView>
            )}
            <Image
              style={[styles.image, { width: loading ? 20 : "auto" }]}
              source={{
                uri: `${api && api.slice(0, -3)}${post.attachedimage}`,
              }}
              onLoadEnd={() => setLoading(false)}
              onError={() => setLoading(false)} // Hide loader if there's an error
            />
          </>
        )}
      </PlainView>
      <PlainView style={styles.reaction}>
        <ReactionComponent commentId={post.comid} />
        <TouchableOpacity
          onPress={() => updateSinglePost(post)}
          style={{ padding: 20, opacity: 0.7 }}
        >
          <Foundation
            name="comment"
            size={30}
            color={Colors[colorScheme].text}
          />
        </TouchableOpacity>
      </PlainView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    minHeight: mheight * 0.15,
  },
  postHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    opacity: 0.7,
  },
  image: {
    width: "auto",
    height: "auto",
    aspectRatio: 3 / 4,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "regular",
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
