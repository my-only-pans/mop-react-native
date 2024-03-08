import { Slot } from "expo-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Platform, StyleSheet, View } from "react-native";

export default function HomeLayout() {
  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.container}>
        {Platform.OS === "web" ? <Sidebar /> : null}
        <Slot />
      </View>
      {/* <Footer /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    flex: 1,
  },
});
