import React from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onlyWeb?: boolean;
  gap?: number;
  columnGap?: number;
  rowGap?: number;
}

function Row({ children, style, onlyWeb, gap, columnGap, rowGap }: Props) {
  let direction: "column" | "row" = "column";

  if (!onlyWeb || (onlyWeb && Platform.OS === "web")) {
    direction = "row";
  }

  return (
    <View
      style={[
        {
          flexDirection: direction,
          gap: gap,
          columnGap: columnGap,
          rowGap: rowGap,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default Row;
