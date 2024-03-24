import { Link } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import colors from "../theme/colors";

interface Props {}

const routes = [
  { href: "/recipes", label: "Recipes" },
  { href: "/user/profile/kitchen", label: "MyKitchen" },
  { href: "/user/profile", label: "MyProfile" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/partners", label: "Partners" },
  { href: "/user/login", label: "Login" },
  { href: "/user/register", label: "Register" },
  { href: "/recipes/create", label: "Create Recipe" },
  { href: "/recipes/update", label: "Update Recipe" },
  { href: "/test", label: "Test" },
  { href: "/recipes/myrecipes", label: "My Recipes" },
  { href: "/recipes/view", label: "View Sample Recipe" },
];

const styles = StyleSheet.create({
  container: {
    borderRightWidth: 1,
    borderRightColor: Platform.OS === "web" ? colors.primary : "transparent",
    paddingVertical: 32,
    paddingHorizontal: 16,
    width: 200,
  },
  link: {
    marginBottom: 12,
  },
});

function Sidebar(props: Props) {
  const {} = props;

  return (
    <View style={styles.container}>
      {routes.map(({ href, label }) => (
        <Link key={href} href={href} style={styles.link}>
          <Text>{label}</Text>
        </Link>
      ))}
    </View>
  );
}

export default Sidebar;
