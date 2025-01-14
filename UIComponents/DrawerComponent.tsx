import {
  View as PlainView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text, View } from "@/components/Themed";
import MButton from "@/UIComponents/MButton";
import { mwidth } from "@/constants/ScreenDimensions";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import { UserAvatar } from "@/constants/UserAvatar";
import { api } from "@/constants/shortened";
import Colors from "@/constants/Colors";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useEffect } from "react";
export const DrawerComponent = (props: DrawerContentComponentProps) => {
  const [profile] = MStore(useShallow((state) => [state.profile]));
  const colorScheme = useColorScheme() ?? "light";
  const path = useGlobalSearchParams();
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <View style={{ flex: 1, padding: 20, gap: 20 }}>
      {/* Header */}
      <PlainView style={{ justifyContent: "center", alignItems: "center" }}>
        <UserAvatar
          size={100}
          imageUrl={
            api && profile?.avatar
              ? `${api.slice(0, -3)}${profile.avatar.slice(1)}`
              : "" // Provide an empty string as a fallback if `api` or `profile.avatar` is missing
          }
          name={profile?.firstname || "User"} // Provide a fallback name if `profile.firstname` is missing
        />
        <PlainView>
          <Text style={{ fontWeight: 700, fontSize: 20, textAlign: "center" }}>
            {profile?.firstname} {profile?.lastname}
          </Text>
        </PlainView>
      </PlainView>
      {/* Buttons */}
      <PlainView>
        <TouchableOpacity
          style={[
            styles.button,
            { borderBottomColor: Colors[colorScheme].tabIconDefault },
          ]}
          onPress={() => router.push(`/`)}
        >
          <Text>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { borderBottomColor: Colors[colorScheme].tabIconDefault },
          ]}
          onPress={() => router.push(`/`)}
        >
          <Text>Adverts</Text>
        </TouchableOpacity>
      </PlainView>
      {/* Footer */}
      <PlainView
        style={{
          position: "absolute",
          bottom: 10,
          right: 0,
          left: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MButton
          onPress={() => {}}
          title="Logout"
          style={{ backgroundColor: "red", width: mwidth * 0.7 }}
        />
      </PlainView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: mwidth,
  },
  button: {
    borderBottomWidth: 1,
    padding: 20,
  },
});
