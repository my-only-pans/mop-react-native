import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  centerVertically?: boolean;
}

function Container(props: Props) {
  const { children, style, centerVertically } = props;

  return (
    <View
      style={[
        styles.container,
        style,
        { justifyContent: centerVertically ? "center" : "flex-start" },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
});

export default Container;
