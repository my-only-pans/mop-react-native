import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { StyleSheet, Text, View, TextProps } from "react-native";
import React from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Extend TextProps interface to include defaultProps
interface CustomTextProps extends TextProps {
  defaultProps?: any;
}

// Set default font family for all Text components
(Text as CustomTextProps).defaultProps = {
  style: { fontFamily: "Poppins-Regular" },
};
