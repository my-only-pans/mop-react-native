import { Link } from "expo-router";
import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../theme/colors";
import { Icon } from "react-native-elements";

const routes = [
  { href: "/recipes", label: "Recipes" },
  { href: "/recipes/myrecipes", label: "My Recipes" },
  { href: "/user/profile/kitchen", label: "MyKitchen" },
  { href: "/recipes/new", label: "Create Recipe" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/partners", label: "Partners" },
  { href: "/privacy", label: "Privacy" },
];

const styles = StyleSheet.create({
  container: {
    borderRightWidth: 1,
    borderRightColor: Platform.OS === "web" ? colors.grey : "transparent",
    justifyContent: "flex-end",
  },
  links: {
    paddingVertical: 32,
    flex: 1,
    rowGap: 24,
  },
  linkContainer: {
    paddingHorizontal: 32,
    alignItems: "flex-start",
  },
  link: {},
  expandBtn: {
    width: "100%",
    backgroundColor: colors.info,
  },
});

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={[styles.container, { width: isExpanded ? 250 : 60 }]}>
      <View style={[styles.links, { display: isExpanded ? "flex" : "none" }]}>
        {routes.map(({ href, label }) => (
          <View key={href} style={styles.linkContainer}>
            <Link href={href} style={styles.link}>
              <Text>{label}</Text>
            </Link>
          </View>
        ))}
      </View>
      <Pressable
        style={styles.expandBtn}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Icon
          name={`chevron-${isExpanded ? "left" : "right"}`}
          color={colors.highlight}
          size={48}
        />
      </Pressable>
    </View>
  );
}

export default Sidebar;
