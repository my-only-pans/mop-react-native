import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import colors from "../../theme/colors";

interface Props {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  buttonColor?: string;
  textColor?: string;
  children: string;
  onPress?: (e: GestureResponderEvent) => any;
  disabled?: boolean;
}

function StyledButton(props: Props) {
  const {
    style,
    textStyle,
    children,
    onPress,
    buttonColor,
    textColor,
    disabled,
  } = props;

  return (
    <Pressable
      style={[
        styles.container,
        style,
        { backgroundColor: disabled ? "#ccc" : buttonColor },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle, { color: textColor }]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 48,
    paddingVertical: 12,
    backgroundColor: colors.highlight,
    borderRadius: 50,
  },
  text: {
    color: "#000",
  },
});

export default StyledButton;
