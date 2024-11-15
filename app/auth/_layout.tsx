import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="startup"
      screenOptions={{
        presentation: "modal",
        headerShown: false,
        contentStyle: {
          padding: 40,
        },
      }}
    />
  );
}
