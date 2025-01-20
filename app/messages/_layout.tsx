import { Stack } from "expo-router";

export default function MessagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        presentation: "modal",
        contentStyle: {
          paddingHorizontal: 40,
        },
      }}
    />
  );
}
