import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import ProfileInfoHeaders from "./ProfileInfoHeaders";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import AnimatedLoading from "@/constants/AnimatedLoading";
import { Text, View } from "../Themed";
import { mwidth } from "@/constants/ScreenDimensions";
import MButton from "@/UIComponents/MButton";
import { DrawerToggleButton } from "@react-navigation/drawer";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = mwidth;
const ANIMATION_DURATION = 500;

export default function ProfileIndex() {
  const navigation = useNavigation();
  const colorScheme = "light";

  const [profile, updateProfileInfo] = MStore(
    useShallow((state) => [state.profile, state.updateProfileInfo])
  );

  const [drawerVisible, setDrawerVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    if (drawerVisible) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setDrawerVisible(false));
    } else {
      setDrawerVisible(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  const drawerTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [DRAWER_WIDTH, 0],
  });

  const overlayOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <DrawerToggleButton />,
    });
  }, [navigation, colorScheme, toggleDrawer]);

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <AnimatedLoading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ProfileInfoHeaders profile={profile} />
      </View>

      {drawerVisible && (
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayOpacity,
            },
          ]}
        >
          <TouchableOpacity style={{ flex: 1 }} onPress={toggleDrawer} />
        </Animated.View>
      )}

      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerTranslateX }],
          },
        ]}
      >
        <View style={styles.drawerContent}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: Colors[colorScheme].background },
            ]}
          >
            <Text>Edit Profile</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.drawerText}>Option 1</Text>
            <MButton
              onPress={() => {}}
              title="Log out"
              style={{ backgroundColor: "red", width: mwidth * 0.5 }}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH * 0.5, // Half-width drawer
    backgroundColor: "white",
    padding: 16,
    // Removed 'left: 0'
  },
  drawerContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  drawerText: {
    fontSize: 18,
    marginVertical: 8,
  },
  button: {
    borderBottomWidth: 1,
    padding: 20,
    width: mwidth * 0.5,
  },
});
