import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  RecipeInstructions,
  RecipeType,
  TextBlockType,
} from "../../../../types/RecipeTypes";
import Editor from "../../../commonComponents/editor/Editor";

interface Props {
  draft: RecipeType;
  setDraft: React.Dispatch<React.SetStateAction<RecipeType | undefined>>;
}

const sample: RecipeInstructions = [
  {
    type: TextBlockType.h1,
    text: "Hello World",
  },
  {
    type: TextBlockType.p,
    text: "This is a paragraph. Yes it is",
  },
];

function RecipeInstructionsForm(props: Props) {
  const { draft, setDraft } = props;

  const handleUpdateInstructions = (instructions: RecipeInstructions) => {
    setDraft({
      ...draft,
      instructions,
    });
  };

  return (
    <View style={styles.container}>
      <Editor value={draft.instructions} onChange={handleUpdateInstructions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 12,
  },
});

export default RecipeInstructionsForm;
