import {
  EXPO_PUBLIC_WEB_SERVER_URL,
  EXPO_PUBLIC_MOBILE_SERVER_URL,
} from "@env";

import { Platform } from "react-native";

export default function getServerUrl() {
  if (Platform.OS === "web") {
    return EXPO_PUBLIC_WEB_SERVER_URL;
  } else {
    return EXPO_PUBLIC_MOBILE_SERVER_URL;
  }
}
