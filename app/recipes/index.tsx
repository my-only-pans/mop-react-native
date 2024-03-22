import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import TermsAndConditionsPage from "../../components/pages/privacy/Terms_&_Coditions";
import Container from "../../components/commonComponents/Container";

interface Props {}

function Recipes(props: Props) {
  const {} = props;

  return (
    <Container>
      <Text>This is the Recipes Screen</Text>
      <Link href="/">
        <Text>Home</Text>
      </Link>
    </Container>
  );
}

export default Recipes;
