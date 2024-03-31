import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import PrivacyMenu from "../../../components/pages/privacy/menu/PrivacyMenu";
import CommunityGuidelines from "../../../components/pages/privacy/ComunityGuidelines";

interface Props {}

function Community_Guidelines(props: Props) {
  const {} = props;

  return (
    <View>
      <Link href="/privacy/community"/>
      <PrivacyMenu/>
      <CommunityGuidelines/>
    </View>
  );
}

export default Community_Guidelines;
