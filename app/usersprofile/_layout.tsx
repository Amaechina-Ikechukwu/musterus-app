import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function Layout() {
  const colorScheme = useColorScheme() ?? "light";
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        presentation: "modal",
        contentStyle: {
          paddingHorizontal: 20,
          backgroundColor: Colors[colorScheme].background,
        },
      }}
    />
  );
}
