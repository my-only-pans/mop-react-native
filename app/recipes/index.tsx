import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import TermsAndConditionsScreen from "../../components/pages/privacy/Terms_&_Coditions";

interface Props {}

function Recipes(props: Props) {
  const {} = props;

  return (
    <View>
      <Text>This is the Recipes Screen</Text>
      <Link href="/">
        <Text>Home</Text>
      </Link>
      <TermsAndConditionsScreen/>
    </View>
  );
}

export default Recipes;
