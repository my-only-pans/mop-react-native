import React from "react";
import { Text, View } from "react-native";

interface Props {}

function Footer(props: Props) {
  const {} = props;

  return (
    <View style={{ backgroundColor: "black" }}>
      <Text style={{ color: "white" }}>This is the footer</Text>
    </View>
  );
}

export default Footer;
