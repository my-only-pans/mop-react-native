import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface Props {}

function RecipeView(props: Props) {
  const { recipeId } = useLocalSearchParams();

  const {} = props;

  return (
    <View>
      <Text>RECIPE VIEW PAGE</Text>
    </View>
  );
}

export default RecipeView;
