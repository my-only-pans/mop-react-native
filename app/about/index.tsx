import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import About_Us_Page from "../../components/pages/about_us/About_Us_Page";

interface Props {}

function About_Us(props: Props) {
  const {} = props;

  return (
    <View>
      <Link href="/about"/>
      <About_Us_Page/>
    </View>
  );
}

export default About_Us;
