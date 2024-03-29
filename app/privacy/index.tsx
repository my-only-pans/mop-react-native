import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import PrivacyMenu from "../../components/pages/privacy/menu/PrivacyMenu";
import PrivacyPolicy from "../../components/pages/privacy/PrivacyPolicy";

interface Props {}

function Privacy(props: Props) {
  const {} = props;

  return (
    <View>
      <Link href="/privacy"/>
      <PrivacyMenu/>
      <PrivacyPolicy/>
    </View>
  );
}

export default Privacy;
