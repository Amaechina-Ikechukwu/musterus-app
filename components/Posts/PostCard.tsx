import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Post } from "@/constants/types";
import { UserAvatar } from "@/constants/UserAvatar";
import { api, checkMediaType, newAvatar } from "@/constants/shortened";
import Colors, { accent } from "@/constants/Colors";
import { mheight } from "@/constants/ScreenDimensions";
import ReactionComponent from "./ReactionComponents";
import { Foundation } from "@expo/vector-icons";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import VideoPlayer from "./VideoPlayer";

export default function PostCard({ post }: { post: Post }) {
  const colorScheme = useColorScheme() ?? "light";
  const [loading, setLoading] = useState(true);
  const [updateSinglePost] = MStore(
    useShallow((state) => [state.updateSinglePost])
  );
  // useEffect(() => {
  //   if (post.comid.toString() == "215") {
  //     console.log(JSON.stringify(post, null, 2));
  //   }
  // }, []);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].darkTint },
      ]}
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
            showFallback={!post.avatar}
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
      <View style={styles.reaction}>
        <ReactionComponent
          commentId={post.comid}
          divid={"0"}
          mskl={post.mskl}
          mykey={post.profilekey}
          uid={post.uid}
        />
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
      </View>
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
