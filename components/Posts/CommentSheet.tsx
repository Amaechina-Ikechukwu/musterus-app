import React, { useRef, useMemo, useEffect, useState } from "react";
import {
  View as PlainView,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  useColorScheme,
} from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import { api, newAvatar } from "@/constants/shortened";
import { Post, UserProfile } from "@/constants/types";
import { UserAvatar } from "@/constants/UserAvatar";
import { View } from "../Themed";
import { mheight, mwidth } from "@/constants/ScreenDimensions";
import MInput from "@/UIComponents/MInput";
import { FontAwesome } from "@expo/vector-icons";
import Colors, { accent } from "@/constants/Colors";
import { useNotification } from "@/contexts/NotificationContext";
import { useNavigation } from "expo-router";

export interface Comment {
  comreplyid: string;
  comid: string;
  uid: string;
  userkey: string;
  comment: string;
  writetime: string;
  status: string;
  attachedimage: string | null;
  username: string;
  firstname: string;
  lastname: string;
}

export interface CommentSheetProps {
  singlePost: Post | null;
  updateSinglePost: (post: Post | null) => void;
  profile: UserProfile | null;
}

export const Comments = ({
  singlePost,
  updateSinglePost,
  profile,
}: CommentSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>("");
  const colorScheme = useColorScheme() ?? "light";
  const snapPoints = useMemo(() => ["75%"], []);
  const { showNotification } = useNotification();
  const navigation = useNavigation();

  const fetchComments = async () => {
    if (!singlePost || !profile) return;

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${api}/api/comments`, {
        params: {
          mykey: profile.profilekey,
          comid: singlePost.comid,
          uid: singlePost.uid,
        },
      });
      setComments(response.data.replies.reverse() || []);
    } catch (err) {
      setError("Failed to fetch comments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singlePost) {
      fetchComments();
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [singlePost]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      handleSheetClose();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSheetClose = () => {
    updateSinglePost(null);
    setCommentInput("");
    () => Keyboard.dismiss();
  };

  const handleSendComment = async () => {
    if (!commentInput.trim() || !singlePost || !profile) return;

    try {
      showNotification("Sending...");
      const { comid } = singlePost;
      await axios.post(`${api}/api/comments`, {
        mykey: profile.profilekey,
        comid,
        uid: profile.uid,
        comment: commentInput,
        ref: 0,
        mskl: profile.mskl,
      });

      showNotification("Comment sent.");
      fetchComments();
      setCommentInput("");
    } catch (err) {
      showNotification("Could not add comment at the moment.");
    }
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <PlainView style={styles.postHeader}>
        <PlainView
          style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
        >
          <UserAvatar
            imageUrl={item.attachedimage ? newAvatar(item.attachedimage) : null}
            name={item.firstname + " " + item.lastname || ""}
          />
          <Text>{item.firstname + " " + item.lastname}</Text>
        </PlainView>
        <Text style={styles.commentTime}>{item.writetime}</Text>
      </PlainView>
      <PlainView style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text style={styles.commentText}>{item.comment}</Text>
      </PlainView>
    </View>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={handleSheetClose}
    >
      <BottomSheetView style={[styles.sheetContent, { flex: 1 }]}>
        {loading ? (
          <ActivityIndicator size="large" color={accent} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : comments ? (
          <>
            <BottomSheetFlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item) => item.comreplyid}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
              ListEmptyComponent={() => (
                <PlainView style={styles.sheetContent}>
                  <Text style={styles.title}>
                    No comments yet. Be the first!
                  </Text>
                </PlainView>
              )}
              keyboardShouldPersistTaps="handled"
            />
            <PlainView style={styles.inputContainer}>
              <MInput
                placeholder="Enter comment"
                value={commentInput}
                onChange={(text) => setCommentInput(text)}
              />
              <TouchableOpacity onPress={handleSendComment}>
                <FontAwesome
                  name="send"
                  size={24}
                  color={Colors[colorScheme].text}
                />
              </TouchableOpacity>
            </PlainView>
          </>
        ) : (
          <Text style={styles.title}>No Post Selected</Text>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 16,
  },
  commentContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    width: mwidth * 0.9,
  },
  commentText: {
    fontSize: 14,
    marginVertical: 5,
  },
  commentTime: {
    fontSize: 12,
    color: "gray",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  postHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    backgroundColor: Colors.light.background,
  },
});
