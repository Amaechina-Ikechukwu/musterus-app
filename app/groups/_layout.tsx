import { Stack } from "expo-router";

export default function GroupLayout() {
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
