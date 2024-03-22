import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import colors from "../theme/colors";
import { Avatar } from "react-native-paper";
import { Link } from "expo-router";

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
});

function Header(props: Props) {
  const {} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyOnlyPans.</Text>
      <Link href="/user/profile">
        <Avatar.Image
          source={require("../assets/team/default-transformed.png")}
          size={30}
        />
      </Link>
    </View>
  );
}

export default Header;
