import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
  TextStyle,
  Dimensions,
  useColorScheme,
} from "react-native";
import Colors, { accent } from "@/constants/Colors";

const { width } = Dimensions.get("window");

interface InputProps extends Omit<TextInputProps, "onChange" | "style"> {
  value?: string;
  placeholder: string;
  onChange: (text: string) => void;
  label?: string; // Required label prop
  style?: TextStyle;
  viewStyle?: ViewStyle;
}

const MInput: React.FC<InputProps> = ({
  value,
  placeholder,
  onChange,
  label,
  style,
  viewStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme() ?? "light";

  return (
    <View style={[styles.container, viewStyle]}>
      {/* Label */}
      <Text
        style={[
          styles.label,
          { color: isFocused ? accent : Colors[colorScheme].text },
        ]}
      >
        {label}
      </Text>

      {/* Input */}
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors[colorScheme].text + "99"} // Lighter color for placeholder
        onChangeText={onChange}
        style={[
          styles.input,
          {
            color: Colors[colorScheme].text,
            backgroundColor: Colors[colorScheme].darkTint,
          },
          style,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: width * 0.8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    borderColor: accent,
  },
});

export default MInput;
