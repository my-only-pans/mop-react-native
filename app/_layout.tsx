import { Slot } from "expo-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MobileNavigationBar from "../components/commonComponents/MobileNavigationBar";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../stores/authStore";
import getErrorMessage from "../utils/getErrorMessage";
import axios from "axios";
import getServerUrl from "../utils/getServerUrl";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Button, Modal, Snackbar } from "react-native-paper";

function HomeLayout() {
  const { login, logout, myProfile } = useAuthStore();
  const [loginMessage, setLoginMessage] = useState("");

  const getProfile = async () => {
    setLoginMessage("");
    const firebaseToken = await AsyncStorage.getItem("firebaseToken");

    if (!firebaseToken) {
      return logout();
    }

    axios
      .post(`${getServerUrl()}/user/login`, {
        firebaseToken,
      })
      .then(async (res) => {
        const { authToken } = res.data;

        if (!authToken) {
          throw new Error("Login failed. Please try again.");
        }
        axios
          .get(`${getServerUrl()}/user/myProfile`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((res) => {
            const { data: myProfile } = res;

            const myProfileString = JSON.stringify(myProfile);

            login(authToken, firebaseToken, myProfile);

            if (Platform.OS === "web") {
              localStorage.setItem("myProfile", myProfileString);
              localStorage.setItem("authToken", authToken);
            } else {
              AsyncStorage.setItem("myProfile", myProfileString);
              AsyncStorage.setItem("authToken", authToken);
            }
          });
      })
      .catch((error) => {
        console.log(error);
        setLoginMessage(
          "You have been logged out due to inactivity. Please login"
        );
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
