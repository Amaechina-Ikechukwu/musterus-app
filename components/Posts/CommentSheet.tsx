import React, { useRef, useMemo, useEffect, useState } from "react";
import {
  View as PlainView,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  useColorScheme,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import axios from "axios";
import { api, newAvatar } from "@/constants/shortened";
import { Post, UserProfile } from "@/constants/types";
import { UserAvatar } from "@/constants/UserAvatar";
import { View } from "../Themed";
import { mwidth } from "@/constants/ScreenDimensions";
import MInput from "@/UIComponents/MInput";
import { FontAwesome } from "@expo/vector-icons";
import Colors, { accent } from "@/constants/Colors";
import { useNotification } from "@/contexts/NotificationContext";

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
  updateSinglePost: (post: any) => void;
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
  const colorScheme = useColorScheme() ?? "light";
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const [commentInput, setCommentInput] = useState<string>("");
  const { showNotification } = useNotification();

  const fetchComments = async () => {
    if (!singlePost) return;

    const { comid, uid } = singlePost; // Assuming these properties exist in `singlePost`

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${api}/api/comments`, {
        params: {
          mykey: profile?.profilekey,
          comid,
          uid,
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

  const handleSheetClose = () => {
    updateSinglePost(null); // Reset the post state when the sheet is closed
    setCommentInput("");
    Keyboard.dismiss();
  };

  const handleSendComment = async () => {
    if (!commentInput.trim()) return; // Don't send empty comment

    try {
      setError(null);
      if (singlePost == null) {
        showNotification("Could not add comment at the momemnt");
        return null;
      }
      const { comid, uid } = singlePost;
      showNotification("Sending...");
      const response = await axios.get(`${api}/api/comments`, {
        params: {
          mykey: profile?.profilekey,
          comid: singlePost.comid,
          uid: profile?.uid,
          comment: commentInput,
          ref: 0,
          mskl: profile?.mskl,
        },
      });

      if (response.data.replies.length > comments?.length) {
        showNotification("Commment sent.");
        const response = await axios.get(`${api}/api/comments`, {
          params: {
            mykey: profile?.profilekey,
            comid,
            uid,
          },
        });

        setComments(response.data.replies.reverse() || []);
        setCommentInput("");
      } else {
        showNotification("Could not add comment at the momemnt");
      }
    } catch (err) {
      showNotification("Could not add comment at the momemnt");
    } finally {
    }
  };
  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <PlainView style={styles.postHeader}>
        {singlePost ? (
          <PlainView
            style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
          >
            <UserAvatar
              imageUrl={item?.avatar == null ? null : newAvatar(item?.avatar)}
              name={item?.firstname + item?.lastname || ""}
              showFallback={item?.avatar == null}
            />
            <Text>{item?.firstname + " " + item?.lastname}</Text>
          </PlainView>
        ) : null}

        <Text style={{ fontWeight: "light" }}>{item && item?.writetime}</Text>
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
      enablePanDownToClose={true}
      onClose={handleSheetClose}
    >
      <BottomSheetView style={styles.sheetContent}>
        {loading ? (
          <ActivityIndicator size="large" color={accent} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : comments ? (
          <KeyboardAvoidingView>
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item) => item.comreplyid}
              style={{ flex: 1 }}
              contentContainerStyle={{
                flexGrow: 1, // Ensures the content takes up full available space
              }}
              ListEmptyComponent={() => {
                return (
                  <PlainView style={styles.sheetContent}>
                    <Text style={styles.title}>
                      No comments yet. Be the first
                    </Text>
                  </PlainView>
                );
              }}
            />
            <PlainView
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
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
          </KeyboardAvoidingView>
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
    zIndex: 9999,
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
  commentUsername: {
    fontSize: 16,
    fontWeight: "bold",
  },
  commentText: {
    fontSize: 14,

    marginVertical: 5,
  },
  commentTime: {
    fontSize: 12,
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
});