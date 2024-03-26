import React from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onlyWeb?: boolean;
}

function Row({ children, style, onlyWeb }: Props) {
  let direction: "column" | "row" = "column";

  if (!onlyWeb || (onlyWeb && Platform.OS === "web")) {
    direction = "row";
  }

  return (
    <View
      style={[
        {
          flexDirection: direction,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default Row;
