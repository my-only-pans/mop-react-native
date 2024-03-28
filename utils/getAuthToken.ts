import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getAuthToken() {
  const authToken = await AsyncStorage.getItem("authToken");

  return `Bearer ${authToken}`;
}
