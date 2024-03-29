import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import PrivacyMenu from "../../../components/pages/privacy/menu/PrivacyMenu";
import Terms_AND_Privacy from "../../../components/pages/privacy/Terms_&_Privacy";

interface Props {}

function TermsPrivacy(props: Props) {
  const {} = props;

  return (
    <View>
      <Link href="/privacy/termsprivacy"/>
      <PrivacyMenu/>
      <Terms_AND_Privacy/>
    </View>
  );
}

export default TermsPrivacy;
