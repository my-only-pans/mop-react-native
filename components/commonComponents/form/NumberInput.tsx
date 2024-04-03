import React, { useState } from "react";
import { StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  value?: number;
  onChangeText?: ((text: number) => void) & Function;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  label?: string;
}

const NumberInput = ({
  value,
  onChangeText,
  style,
  placeholder,
  label,
}: Props) => {
  const [localValue, setLocalValue] = useState(0);

  const handleInputChange = (newValue: string) => {
    // Check if the input ends with a dot
    if (newValue.endsWith(".")) {
      newValue += "0"; // Append a zero to the end
    }

    console.log(newValue);

    const parsedNum = parseFloat(newValue);
    console.log(parsedNum);

    if (!newValue) {
      setLocalValue(0);
      onChangeText && onChangeText(0);
    }

    if (!isNaN(parsedNum) && isFinite(parsedNum)) {
      setLocalValue(parsedNum);
      onChangeText && onChangeText(parsedNum);
    }
  };

  return (
    <TextInput
      style={[style]}
      label={label}
      keyboardType="numeric"
      value={value?.toString() || localValue.toString()}
      placeholder={placeholder}
      onChangeText={handleInputChange}
    />
  );
};

export default NumberInput;
