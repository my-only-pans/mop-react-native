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
}

function StyledButton(props: Props) {
  const { style, textStyle, children, onPress, buttonColor, textColor } = props;

  return (
    <Pressable
      style={[styles.container, style, { backgroundColor: buttonColor }]}
      onPress={onPress}
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
