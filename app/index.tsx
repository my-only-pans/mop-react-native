import { Link } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <View style={{ padding: 32 }}>
      <Text>
        This is a sample page that will be used to route to views that are being
        developed for mobile
      </Text>
      {Platform.OS !== "web" ? <Sidebar /> : null}
    </View>
  );
}

export default Home;
