import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../../theme/colors";
import { Link } from "expo-router";

const links = [
  {
    href: "/",
    icon: "space-dashboard",
  },
  {
    href: "/recipes",
    icon: "local-dining",
  },
  {
    href: "/recipes/create",
    icon: "library-add",
  },
  {
    href: "/recipes/saved",
    icon: "bookmarks",
  },
];

function MobileNavigationBar() {
  return (
    <View style={styles.container}>
      {links.map(({ href, icon }) => (
        <Link key={href} href={href}>
          <Icon name={icon} size={30} color={colors.highlight} />
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: colors.primary,
  },
});

export default MobileNavigationBar;
