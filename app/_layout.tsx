import { Slot } from "expo-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import MobileNavigationBar from "../components/commonComponents/MobileNavigationBar";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

export default function HomeLayout() {
  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.container}>
        {Platform.OS === "web" ? <Sidebar /> : null}
        <KeyboardAvoidingView style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Slot />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {Platform.OS !== "web" ? <MobileNavigationBar /> : null}
      <ExpoStatusBar hidden />
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
