import React from "react";
import { Platform, Pressable, StyleSheet, Text, View, Image } from "react-native";
import colors from "../theme/colors";
import { Avatar } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Platform.OS === "web" ? colors.primary : "transparent",
    paddingVertical: 16,
    paddingHorizontal: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { color: colors.highlight, fontWeight: "900", fontSize: 24 },
  logoImage: { 
    height: Platform.OS === "web" ? 50 : 35, 
    width: Platform.OS === "web" ? 220 : 130,
    resizeMode: 'contain', 
},
});

function Header(props: Props) {
  const {} = props;
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
        {/* <Text style={styles.logo}>MyOnlyPans</Text> */}
        <Image
        style={styles.logoImage}
        source={require('../assets/full-yellow.png')}
      />
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

export default Header;
