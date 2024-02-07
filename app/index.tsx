import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

function Home() {
  return (
    <View>
      <Text>This is the Home Screen of My Only Pans</Text>
      <Link href="/recipes">
        <Text>Recipes</Text>
      </Link>
    </View>
  );
}

export default Home;
