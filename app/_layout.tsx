import { Slot } from "expo-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import MobileNavigationBar from "../components/commonComponents/MobileNavigationBar";

export default function HomeLayout() {
  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.container}>
        {Platform.OS === "web" ? <Sidebar /> : null}
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Slot />
          </ScrollView>
        </View>
      </View>
      {Platform.OS !== "web" ? <MobileNavigationBar /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F2F7F5",
  },
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "stretch",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
    // justifyContent: "center",
    // alignItems: "stretch",
  },
});
