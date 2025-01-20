import { StyleSheet } from "react-native";


import { Text, View } from "@/components/Themed";

import ProfileIndex from "@/components/Profile/ProfileIndex";

import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import { Comments } from "@/components/Profile/CommentSheet";

export default function TabTwoScreen() {
  const [singlePost, updateSinglePost, updatePostInView, profile] = MStore(
    useShallow((state) => [
      state.singlePost,
      state.updateSinglePost,
      state.updatePostInView,
      state.profile,
    ])
  );
  return (
    <View style={styles.container}>
      <ProfileIndex />
      {/* Bottom Sheet */}
      <Comments
        singlePost={singlePost}
        updateSinglePost={updateSinglePost}
        profile={profile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
