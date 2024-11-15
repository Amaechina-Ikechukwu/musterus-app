import { accent } from "@/constants/Colors";
import React, { createContext, useState, useContext, useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

// Define the context and its provider
interface NotificationContextProps {
  showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

// Notification provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notificationText, setNotificationText] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const fadeAnim = new Animated.Value(0);

  // Function to show notification
  const showNotification = (message: string) => {
    setNotificationText(message);
    setVisible(true);
  };

  // Effect to handle the fade in/out animation and auto-dismissal
  useEffect(() => {
    if (visible) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Start a 6-second timer
      const timer = setTimeout(() => {
        // Fade out after 6 seconds
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
          setNotificationText(null);
        });
      }, 3000);

      // Reset the timer if the notification text changes
      return () => clearTimeout(timer);
    }
  }, [notificationText, fadeAnim, visible]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {visible && notificationText && (
        <Animated.View
          style={[styles.notificationContainer, { opacity: fadeAnim }]}
        >
          <Text style={styles.notificationText}>{notificationText}</Text>
        </Animated.View>
      )}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

// Styles
const styles = StyleSheet.create({
  notificationContainer: {
    position: "absolute",
    top: 10,
    width: "100%",
    padding: 16,
    backgroundColor: accent,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
