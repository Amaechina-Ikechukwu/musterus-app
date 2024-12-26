import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerTitle: "Settings",
        presentation: "modal",
        contentStyle: {
          paddingHorizontal: 40,
        },
      }}
    />
  );
}
