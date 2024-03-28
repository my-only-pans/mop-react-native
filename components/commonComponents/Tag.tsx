import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  children: string;
  color?: string;
  icon?: React.ReactNode;
  iconOnpress?: (e: GestureResponderEvent) => any;
}

function Tag(props: Props) {
  const { children, color, icon, iconOnpress } = props;

  return (
    <View style={[styles.container, { backgroundColor: color ?? "#ccc" }]}>
      <Text style={{}}>{children}</Text>
      {icon && <Pressable onPress={iconOnpress}>{icon}</Pressable>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 2,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default Tag;
