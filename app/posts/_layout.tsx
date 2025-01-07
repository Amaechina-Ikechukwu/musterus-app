import { Stack } from "expo-router";

export default function PostLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          padding: 40,
        },
      }}
    />
  );
}
