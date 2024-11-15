import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import MInput from "@/UIComponents/MInput";
import MButton from "@/UIComponents/MButton";
import Colors, { accent } from "@/constants/Colors";
import { mwidth } from "@/constants/ScreenDimensions";
import { useNotification } from "@/contexts/NotificationContext";
import { memo, useEffect } from "react";
import { router } from "expo-router";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import PostCard from "@/components/Posts/PostCard";
const MemoizedPostCard = memo(PostCard);
export default function TabOneScreen() {
  const { showNotification } = useNotification();
  const colorScheme = useColorScheme();
  const [posts] = MStore(useShallow((state) => [state.posts]));

  return (
    <View style={styles.container}>
      <View style={styles.floatButton}>
        <TouchableOpacity style={{ padding: 10, borderRadius: 100 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 40,
              color: Colors.dark.text,
            }}
          >
            M+
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.comid}
        renderItem={({ item }) => <MemoizedPostCard post={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, padding: 20 }}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        getItemLayout={(data, index) => ({
          length: 150,
          offset: 150 * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  floatButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 99,
    borderRadius: 100,
    backgroundColor: accent,
  },
});
