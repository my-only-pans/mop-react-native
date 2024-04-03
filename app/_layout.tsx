import { Slot, usePathname, useRouter } from "expo-router";
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
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";
import getServerUrl from "../utils/getServerUrl";
import { observer } from "mobx-react-lite";
import { Snackbar } from "react-native-paper";
import GlobalDialog from "../components/commonComponents/GlobalDialog";

const protectedPaths = [
  "/user",
  "/recipes/my-recipes",
  "/recipes/new",
  "/recipes/draft",
];

function HomeLayout() {
  const { login, logout } = useAuthStore();
  const [loginMessage, setLoginMessage] = useState("");

  const router = useRouter();
  const path = usePathname();

  const getProfile = async () => {
    setLoginMessage("");
    const authToken = await AsyncStorage.getItem("authToken");

    if (!authToken) {
      if (protectedPaths.find((r) => path.startsWith(r))) {
        router.push("/login");
      }
      return logout();
    }

    axios
      .get(`${getServerUrl()}/user/myProfile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(async (res) => {
        const { data: myProfile } = res;

        const myProfileString = JSON.stringify(myProfile);

        login(authToken, myProfile);

        if (Platform.OS === "web") {
          localStorage.setItem("myProfile", myProfileString);
          localStorage.setItem("authToken", authToken);
        } else {
          AsyncStorage.setItem("myProfile", myProfileString);
          AsyncStorage.setItem("authToken", authToken);
        }
      })
      .catch((error) => {
        if (protectedPaths.find((r) => path.startsWith(r))) {
          router.push("/login");
        }

        console.log(error);
        setLoginMessage(
          "You have been logged out due to inactivity. Please login"
        );
        AsyncStorage.removeItem("authToken");
        AsyncStorage.removeItem("myProfile");
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.container}>
        {Platform.OS === "web" ? <Sidebar /> : null}
        <KeyboardAvoidingView style={styles.content}>
          <Snackbar
            visible={!!loginMessage}
            onDismiss={() => setLoginMessage("")}
            wrapperStyle={styles.feedback}
            action={{
              label: "Close",
              onPress: () => {
                setLoginMessage("");
              },
            }}
          >
            {loginMessage}
          </Snackbar>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Slot />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {Platform.OS !== "web" ? <MobileNavigationBar /> : null}
      <ExpoStatusBar hidden />
      <GlobalDialog />
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
  feedback: {
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
});

export default observer(HomeLayout);
