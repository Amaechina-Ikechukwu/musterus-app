import Colors, { accent } from "@/constants/Colors";
import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  Animated,
  TextInputProps,
  ViewStyle,
  TextStyle,
  Dimensions,
  useColorScheme,
} from "react-native";
const { width } = Dimensions.get("window");
interface InputProps extends Omit<TextInputProps, "onChange" | "style"> {
  value?: string;
  placeholder: string;
  onChange: (text: string) => void;
  style?: TextStyle;
  viewStyle?: ViewStyle;
}

const MInput: React.FC<InputProps> = ({
  value,
  placeholder,
  onChange,
  style,
  viewStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme() ?? "light";
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={onChange}
      style={[
        styles.input,
        {
          color: Colors[colorScheme].text,
          backgroundColor: Colors[colorScheme].darkTint,
        },
        style,
      ]} // apply external styles to input as well
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: width * 0.8,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    borderColor: accent,
  },
});

export default MInput;
