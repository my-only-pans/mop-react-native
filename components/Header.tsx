import React from "react";
import { Platform, Pressable, StyleSheet, View, Image } from "react-native";
import colors from "../theme/colors";
import { Avatar } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Header() {
  const router = useRouter();

  const handleClickAvataer = async () => {
    const myProfile = await AsyncStorage.getItem("myProfile");
    const authToken = await AsyncStorage.getItem("authToken");

    if (myProfile && authToken) {
      router.push("/user/profile");
    } else {
      router.push("/login");
    }
  };

  return (
    <View style={styles.container}>
      <Link href="/">
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/full-yellow.png")}
            style={styles.logo}
          />
        </View>
      </Link>
      <Pressable onPress={handleClickAvataer}>
        <Avatar.Image
          source={require("../assets/team/placeholder-avatar.png")}
          size={30}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Platform.OS === "web" ? colors.primary : "transparent",
    paddingVertical: 16,
    paddingHorizontal: 36,
  },
  logoContainer: {
    justifyContent: "center",
  },
  logo: {
    width: Platform.OS === "web" ? 220 : 130,
    height: 50,
    resizeMode: "contain",
  },
});

export default Header;
