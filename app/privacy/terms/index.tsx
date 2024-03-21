import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

interface Props {}

function Terms_and_Condition(props: Props) {
  const {} = props;

  return (
    <View>
      <Link href="/privacy/terms"/>
      <Terms_and_Condition/>
    </View>
  );
}

export default Terms_and_Condition;
