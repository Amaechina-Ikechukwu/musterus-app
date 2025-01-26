import { Text, View } from "@/components/Themed";
import Colors, { accent } from "@/constants/Colors";
import { mheight } from "@/constants/ScreenDimensions";
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
  useColorScheme,
} from "react-native";

const { width } = Dimensions.get("window");

interface DropdownProps {
  label: string;
  data: { label: string; value: string | number }[];
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  data,
  selectedValue,
  onValueChange,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelect = (value: string | number) => {
    onValueChange(value);
    setIsModalVisible(false);
  };
  const colorScheme = useColorScheme() ?? "light";
  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Dropdown Button */}
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          { backgroundColor: Colors[colorScheme].darkTint },
        ]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectedValue}>
          {data.find((item) => item.value === selectedValue)?.label ||
            `Select ${label}`}
        </Text>
      </TouchableOpacity>

      {/* Modal for Dropdown */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor:
                  colorScheme == "light"
                    ? Colors.light.darkTint
                    : Colors.dark.darkTint,
              },
            ]}
          >
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

            {/* Dropdown Options */}
            <FlatList
              showsVerticalScrollIndicator
              data={data}
              style={{ height: mheight * 0.7 }}
              keyExtractor={(item, index) => `${item.value}_${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: width * 0.8,
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: accent,
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    height: 50,
  },
  selectedValue: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContainer: {
    width: width * 0.9,
    // backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
  },
});

export default Dropdown;
