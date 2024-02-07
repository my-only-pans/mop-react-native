import React from "react";
import { Text, View } from "react-native";

interface Props {}

function Header(props: Props) {
  const {} = props;

  return (
    <View style={{ backgroundColor: "black" }}>
      <Text style={{ color: "white" }}>This is the header</Text>
    </View>
  );
}

export default Header;
