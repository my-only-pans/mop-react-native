import { Platform } from "react-native";

export default function getServerUrl() {
  if (Platform.OS === "web") {
    return process.env.EXPO_PUBLIC_WEB_SERVER_URL;
  } else {
    return process.env.EXPO_PUBLIC_MOBILE_SERVER_URL;
  }
}
