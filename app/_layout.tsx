import { Slot, SplashScreen, usePathname, useRouter } from "expo-router";
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
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";
import getServerUrl from "../utils/getServerUrl";
import { observer } from "mobx-react-lite";
import { Snackbar } from "react-native-paper";
import GlobalDialog from "../components/commonComponents/GlobalDialog";
import { useFonts } from "expo-font";

const protectedPaths = [
  "/user",
  "/recipes/my-recipes",
  "/recipes/new",
  "/recipes/draft",
];

function HomeLayout() {
  
  const { login, logout } = useAuthStore();
  const [loginMessage, setLoginMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const path = usePathname();

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Bold' : require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular' : require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Black' : require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-SemiBold' : require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Light' : require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium' : require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-BoldItalic' : require('../assets/fonts/Poppins-BoldItalic.ttf'),
    'Poppins-Italic' : require('../assets/fonts/Poppins-Italic.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);


  const getProfile = async () => {
    setLoginMessage("");
    const authToken = await AsyncStorage.getItem("authToken");

    if (!authToken) {
      if (
        protectedPaths.find((r) => {
          return path.startsWith(r);
        })
      ) {
        setLoading(false);
        router.push("/login");
      }
      setLoading(false);
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

        setLoading(false);
      })
      .catch((error) => {
        if (protectedPaths.find((r) => path.startsWith(r))) {
          setLoading(false);
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
    if (Platform.OS === 'web') {
      // Update the page title
      document.title = "MyOnlyPans";
    }
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

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
            {!loading && <Slot />}
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
