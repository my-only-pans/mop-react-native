import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../theme/colors";

interface Props {}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 36,
  },
  logo: { color: colors.highlight, fontWeight: "900", fontSize: 24 },
});

function Header(props: Props) {
  const {} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyOnlyPans.</Text>
    </View>
  );
}

export default Header;
