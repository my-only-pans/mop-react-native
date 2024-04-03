import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import TermsAndConditionsPage from "../../../components/pages/privacy/Terms_&_Coditions";
import PrivacyMenu from "../../../components/pages/privacy/menu/PrivacyMenu";

interface Props {}

function Terms_and_Condition(props: Props) {
  const {} = props;

  return (
    <View>
      <Link href="/privacy/terms"/>
      <PrivacyMenu/>
      <TermsAndConditionsPage/>
    </View>
  );
}

export default Terms_and_Condition;
