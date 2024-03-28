import React from "react";
import { Text, View } from "react-native";
import { RecipeType } from "../../../../types/RecipeTypes";

interface Props {
  draft: RecipeType;
}

function RecipeDraftPreview(props: Props) {
  const { draft } = props;

  return (
    <View>
      <Text>Preview</Text>
      <Text>{draft.title}</Text>
    </View>
  );
}

export default RecipeDraftPreview;
