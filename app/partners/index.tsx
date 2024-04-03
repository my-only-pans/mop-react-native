import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import PartnershipPage from "../../components/pages/partners/PartnersPage";

interface Props {}

function PartnersPage(props: Props) {
  const {} = props;

  return (
    <View>
      <Link href="/about"/>
      <PartnershipPage/>
    </View>
  );
}

export default PartnersPage;
