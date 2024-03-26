import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function generateApiHeader() {
  const authToken = await AsyncStorage.getItem("authToken");

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  return headers;
}
