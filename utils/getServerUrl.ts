import { WEB_SERVER_URL, MOBILE_SERVER_URL } from "@env";

import { Platform } from "react-native";

export default function getServerUrl() {
  if (Platform.OS === "web") {
    return WEB_SERVER_URL;
  } else {
    return MOBILE_SERVER_URL;
  }
}
