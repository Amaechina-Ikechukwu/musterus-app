import { Stack } from "expo-router";

export default function GroupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitle: "",
        presentation: "modal",
        contentStyle: {
          paddingHorizontal: 40,
        },
      }}
    />
  );
}
