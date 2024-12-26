import React, { useState } from "react";
import MButton from "@/UIComponents/MButton";
import { Text, View } from "@/components/Themed";
import {
  View as PlainView,
  StyleSheet,
  useColorScheme,
  Modal,
  TouchableOpacity,
} from "react-native";
import { mheight, mwidth } from "@/constants/ScreenDimensions";
import Colors from "@/constants/Colors";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export default function index() {
  const [modalVisible, setModalVisible] = useState(false);

  const logout = () => {
    SecureStore.deleteItemAsync("username");
    SecureStore.deleteItemAsync("password");
    router.push("/auth/login");
  };

  const colorScheme = useColorScheme() ?? "light";

  return (
    <View style={{ alignItems: "center" }}>
      <PlainView>
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderBottomColor: Colors[colorScheme].tabIconDefault,
              backgroundColor: Colors[colorScheme].background,
            },
          ]}
        >
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      </PlainView>

      <PlainView
        style={{
          position: "absolute",
          bottom: -mheight * 0.85,
          width: mwidth * 0.9,
        }}
      >
        <MButton
          onPress={() => setModalVisible(true)}
          title="Logout"
          style={{ backgroundColor: "red" }}
        />
      </PlainView>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: Colors[colorScheme].darkTint },
            ]}
          >
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  logout();
                }}
                style={[styles.modalButton, styles.okButton]}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: mwidth,
  },
  button: {
    borderBottomWidth: 1,
    padding: 20,
    width: mwidth,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: mwidth * 0.8,
    padding: 20,

    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  okButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
